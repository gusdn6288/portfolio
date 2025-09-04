import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { getDb } from "./db";
import type { FeedbackDoc } from "./types";

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

// 개발 편의 로그
console.log("[server] PORT =", PORT);
console.log("[server] MONGODB_URI set?", !!process.env.MONGODB_URI);
console.log("[server] MONGODB_DB =", process.env.MONGODB_DB);

// 헬스체크
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// 스키마
const CommentSchema = z.object({
  slug: z.string().min(1).max(200),
  name: z.string().trim().min(1).max(40).default("익명").optional(),
  message: z.string().trim().min(1).max(1000),
  email: z.string().email().optional().or(z.literal("")),
});

// 목록
app.get("/api/feedback", async (req, res) => {
  try {
    const slug = String(req.query.slug || "");
    if (!slug) return res.status(400).json({ error: "Missing slug" });

    const db = await getDb();
    const col = db.collection("feedback");
    await col.createIndex({ slug: 1, createdAt: -1 });

    const items = await col
      .find<FeedbackDoc>({ slug })
      .sort({ createdAt: -1 })
      .limit(150)
      .toArray();

    return res.json(
      items.map((d) => ({
        _id: d._id,
        slug: d.slug,
        name: d.name,
        message: d.message,
        createdAt: d.createdAt,
      }))
    );
  } catch (e) {
    console.error("[GET /api/feedback] error:", e);
    return res
      .status(500)
      .json({ error: (e as Error).message || "Internal Server Error" });
  }
});

// 작성
app.post("/api/feedback", async (req, res) => {
  try {
    if (req.body?.hp) return res.json({ ok: true }); // honeypot

    const parsed = CommentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const { slug, name = "익명", message, email } = parsed.data;

    const db = await getDb();
    const col = db.collection("feedback");

    await col.insertOne({
      slug,
      name,
      message,
      email: email || undefined,
      createdAt: new Date(),
    });

    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error("[POST /api/feedback] error:", e);
    return res
      .status(500)
      .json({ error: (e as Error).message || "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Express listening on http://localhost:${PORT}`);
});
