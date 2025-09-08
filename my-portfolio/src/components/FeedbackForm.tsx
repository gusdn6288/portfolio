import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ApiClient } from "../lib/api";

interface FeedbackFormProps {
  slug: string;
  onSuccess: () => void;
}

export default function FeedbackForm({ slug, onSuccess }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot
  const [showSuccess, setShowSuccess] = useState(false);

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

      // 성공시 애니메이션 표시
      setShowSuccess(true);

      // 폼 초기화
      setMessage("");
      setName("");
      setEmail("");

      // 3초 후 애니메이션 숨기고 콜백 호출
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess();
      }, 1500);
    } catch (e) {
      console.error("Failed to create feedback:", e);
      setError(e instanceof Error ? e.message : "등록 실패");
    } finally {
      setSending(false);
    }
  };

  // 성공 애니메이션 오버레이
  if (showSuccess) {
    return (
      <div className="w-full rounded-2xl bg-white text-black p-6 shadow-lg">
        <div className="flex flex-col items-center justify-center py-8">
          <DotLottieReact
            src="https://lottie.host/18a3d584-2541-480e-aa78-7bdd2e6b0083/maBoqO8FV2.lottie"
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        </div>
      </div>
    );
  }

  return (
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
  );
}
