import { getDb } from "./_lib/mongo.js";
import { z } from "zod";
import type { ObjectId } from "mongodb";

// --- 타입 선언 ---
type QueryValue = string | string[] | undefined;
type Query = Record<string, QueryValue>;

type VercelReq = {
  method?: string;
  query?: Query;
  body?: unknown;
};

type VercelRes = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(chunk?: string | Uint8Array): void;
};

type FeedbackDoc = {
  _id?: ObjectId;
  slug: string;
  name: string;
  message: string;
  email?: string;
  createdAt: Date;
};

type FeedbackDTO = {
  _id: string;
  slug: string;
  name: string;
  message: string;
  createdAt: string;
};

// --- 유틸 ---
function getFirst(q: QueryValue): string {
  if (Array.isArray(q)) return q[0] ?? "";
  return q ?? "";
}

function json(res: VercelRes, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

const Schema = z.object({
  slug: z.string().min(1).max(200),
  name: z.string().trim().min(1).max(40).default("익명").optional(),
  message: z.string().trim().min(1).max(1000),
  email: z.string().email().optional().or(z.literal("")),
  hp: z.string().optional(), // honeypot(봇 차단)
});

export default async function handler(req: VercelReq, res: VercelRes) {
  try {
    const method = req.method ?? "GET";

    if (method === "GET") {
      const slug = getFirst(req.query?.slug);
      if (!slug) return json(res, 400, { error: "Missing slug" });

      const db = await getDb();
      const col = db.collection<FeedbackDoc>("feedback");
      await col.createIndex({ slug: 1, createdAt: -1 });

      const items = await col
        .find({ slug })
        .sort({ createdAt: -1 })
        .limit(150)
        .toArray();

      const out: FeedbackDTO[] = items.map((d) => ({
        _id: String(d._id),
        slug: d.slug,
        name: d.name,
        message: d.message,
        createdAt: d.createdAt.toISOString(),
      }));

      return json(res, 200, out);
    }

    if (method === "POST") {
      const parsed = Schema.safeParse(req.body);
      if (!parsed.success) return json(res, 400, { error: "Invalid input" });

      const { slug, name = "익명", message, email, hp } = parsed.data;
      if (hp && hp.trim()) return json(res, 200, { ok: true }); // 봇은 조용히 무시

      const db = await getDb();
      const col = db.collection<FeedbackDoc>("feedback");
      await col.insertOne({
        slug,
        name,
        message,
        email: email || undefined,
        createdAt: new Date(),
      });

      return json(res, 201, { ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { error: "Method Not Allowed" });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal Server Error";
    console.error("[/api/feedback] error:", e);
    return json(res, 500, { error: msg });
  }
}
