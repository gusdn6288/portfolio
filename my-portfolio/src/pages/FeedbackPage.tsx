import { useEffect, useMemo, useState } from "react";

type Doc = {
  _id: string;
  name: string;
  message: string;
  createdAt: string; // ISO string 기대
};

type ApiError = { error: string };

function isApiError(v: unknown): v is ApiError {
  return typeof v === "object" && v !== null && "error" in v;
}

function isDoc(v: unknown): v is Doc {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o._id === "string" &&
    typeof o.name === "string" &&
    typeof o.message === "string" &&
    typeof o.createdAt === "string"
  );
}

function isDocArray(v: unknown): v is Doc[] {
  return Array.isArray(v) && v.every(isDoc);
}

export default function FeedbackPage({
  slug = "/feedback",
}: {
  slug?: string;
}) {
  const [items, setItems] = useState<Doc[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState("");

  const title = useMemo(() => "your feedback", []);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/feedback?slug=${encodeURIComponent(slug)}`);
      const isJson =
        res.headers.get("content-type")?.includes("application/json") ?? false;
      const body: unknown = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        const msg = isApiError(body)
          ? body.error
          : typeof body === "string"
          ? body
          : `HTTP ${res.status}`;
        throw new Error(msg);
      }

      setItems(isDocArray(body) ? body : []);
    } catch (e) {
      console.error(e);
      setError("목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: name.trim() || "익명",
          message,
          hp,
        }),
      });

      const isJson =
        res.headers.get("content-type")?.includes("application/json") ?? false;
      const body: unknown = isJson ? await res.json() : await res.text();

      if (!res.ok || isApiError(body)) {
        const msg =
          (isApiError(body) && body.error) ||
          (typeof body === "string" ? body : `HTTP ${res.status}`);
        throw new Error(msg);
      }

      // body가 { ok: true } 형태일 수 있지만 굳이 검사 필요 없음
      setMessage("");
      setName("");
      await load();
    } catch (e) {
      console.error(e);
      setError("등록 실패");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#232323] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 좌측: 리스트 */}
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-center mb-8">
            {title}
          </h2>

          <div className="space-y-5">
            {loading ? (
              <p className="text-white/60">불러오는 중...</p>
            ) : items.length === 0 ? (
              <p className="text-white/60">첫 피드백을 남겨주세요!</p>
            ) : (
              items.map((it) => {
                const d = new Date(it.createdAt);
                const date = `${d.getFullYear()}.${String(
                  d.getMonth() + 1
                ).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
                return (
                  <div key={it._id}>
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span className="font-semibold">{it.name}</span>
                      <span className="text-white/60">{date}</span>
                    </div>
                    <div className="rounded-xl bg-white text-black px-4 py-3 shadow-sm">
                      {it.message}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 아래 방향 아이콘 느낌 */}
          <div className="mt-8 flex justify-center">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 border-b-4 border-r-4 border-white/80 rotate-45 rounded-sm translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* 우측: 폼 */}
        <div className="flex items-start">
          <div className="w-full rounded-2xl bg-white text-black p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Feedback</h3>
              <div className="h-3 w-40 bg-neutral-200 rounded-full overflow-hidden">
                {sending && (
                  <div className="h-full w-1/2 animate-pulse bg-neutral-400" />
                )}
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {/* honeypot */}
              <input
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                name="homepage"
              />

              <label className="block">
                <span className="text-sm text-neutral-700">name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="이름(선택)"
                  maxLength={40}
                />
              </label>

              <label className="block">
                <span className="text-sm text-neutral-700">message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="내용을 입력하세요"
                  rows={5}
                  maxLength={1000}
                  required
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  disabled={sending}
                  className="rounded-md bg-black text-white px-4 py-2 font-semibold hover:bg-black/85 disabled:opacity-50"
                >
                  {sending ? "등록 중..." : "등록"}
                </button>
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
