import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiClient } from "../lib/api";
import type { Feedback } from "../lib/api";

export default function FeedbackPage({
  slug = "/feedback",
}: {
  slug?: string;
}) {
  const [items, setItems] = useState<Feedback[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot

  const title = useMemo(() => "your feedback", []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const feedbacks = await ApiClient.getFeedbacks(slug);
      setItems(feedbacks);
    } catch (e) {
      console.error("Failed to load feedbacks:", e);
      setError(e instanceof Error ? e.message : "목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    setError(null);

    try {
      await ApiClient.createFeedback({
        slug,
        name: name.trim() || "익명",
        message: message.trim(),
        email: email.trim() || undefined,
        hp, // honeypot field
      });

      // 성공시 폼 초기화 및 목록 새로고침
      setMessage("");
      setName("");
      setEmail("");
      await load();
    } catch (e) {
      console.error("Failed to create feedback:", e);
      setError(e instanceof Error ? e.message : "등록 실패");
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
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <span className="ml-3 text-white/60">불러오는 중...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={load}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                >
                  다시 시도
                </button>
              </div>
            ) : items.length === 0 ? (
              <p className="text-white/60 text-center py-8">
                첫 피드백을 남겨주세요!
              </p>
            ) : (
              items.map((it) => {
                const d = new Date(it.createdAt);
                const date = `${d.getFullYear()}.${String(
                  d.getMonth() + 1
                ).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
                const time = `${String(d.getHours()).padStart(2, "0")}:${String(
                  d.getMinutes()
                ).padStart(2, "0")}`;

                return (
                  <div key={it._id} className="group">
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span className="font-semibold">{it.name}</span>
                      <span className="text-white/60">
                        {date} {time}
                      </span>
                    </div>
                    <div className="rounded-xl bg-white text-black px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                      <p className="whitespace-pre-wrap">{it.message}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 피드백 개수 표시 */}
          {!loading && !error && (
            <div className="mt-6 text-center">
              <span className="text-white/60 text-sm">
                총 {items.length}개의 피드백
              </span>
            </div>
          )}

          {/* 아래 방향 아이콘 */}
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
              {/* honeypot - 봇 차단용 숨김 필드 */}
              <input
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                name="homepage"
                aria-hidden="true"
              />

              <label className="block">
                <span className="text-sm text-neutral-700">name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  placeholder="이름 (선택사항)"
                  maxLength={40}
                  disabled={sending}
                />
              </label>

              <label className="block">
                <span className="text-sm text-neutral-700">email (선택)</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  placeholder="이메일 (선택사항)"
                  disabled={sending}
                />
              </label>

              <label className="block">
                <span className="text-sm text-neutral-700 flex items-center justify-between">
                  message
                  <span className="text-xs text-neutral-500">
                    {message.length}/1000
                  </span>
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                  placeholder="피드백을 남겨주세요..."
                  rows={5}
                  maxLength={1000}
                  required
                  disabled={sending}
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="rounded-md bg-black text-white px-6 py-2 font-semibold hover:bg-black/85 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {sending ? "등록 중..." : "등록"}
                </button>

                {error && (
                  <span className="text-red-500 text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
