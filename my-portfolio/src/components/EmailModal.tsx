import React, { useState } from "react";
import { Mail, X, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

export type EmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** EmailJS 설정 */
  serviceId: string;
  templateId: string;
  /** emailjs.init 은 부모(FAB)에서 실행됨 */
  toEmail?: string; // 받을 메일 (기본값 제공 가능)
  onSuccess?: () => void; // 전송 성공 시 추가 동작이 필요하면 사용
};

export default function EmailModal({
  isOpen,
  onClose,
  serviceId,
  templateId,
  toEmail = "gusdn-2137@naver.com",
  onSuccess,
}: EmailModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    setIsSending(true);
    try {
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: toEmail,
      };

      const response = await emailjs.send(serviceId, templateId, emailParams);

      console.log("메일 전송 성공:", response);
      alert("메일이 성공적으로 전송되었습니다!");

      setFormData({ name: "", email: "", subject: "", message: "" });
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("메일 전송 실패:", error);
      alert("메일 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          aria-label="모달 닫기"
        >
          <X size={20} />
        </button>

        {/* 헤더 */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Mail className="text-blue-600" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">메일 보내기</h2>
          </div>
          <p className="text-sm text-gray-500">
            궁금한 점이나 문의사항을 보내주세요.
          </p>
        </div>

        {/* 폼 */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="이름을 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="메일 제목을 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="메시지를 입력하세요..."
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSending}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  전송 중...
                </>
              ) : (
                <>
                  <Send size={16} />
                  메일 보내기
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
