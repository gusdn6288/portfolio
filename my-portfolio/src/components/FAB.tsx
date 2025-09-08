import React, { useEffect, useState } from "react";
import { Mail, MessageSquareText, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import EmailModal from "./EmailModal";

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string,
};

type FabBtnProps = {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
};

function FabBtn({ icon, label, onClick }: FabBtnProps) {
  return (
    <button
      onClick={onClick}
      className="group flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-fab ring-1 ring-black/5 transition hover:scale-[1.03] active:scale-95"
      aria-label={label}
    >
      <span className="opacity-80 transition group-hover:opacity-100">
        {icon}
      </span>
    </button>
  );
}

export default function FAB() {
  const navigate = useNavigate();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    // 부모에서 한 번만 init
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log("EmailJS 초기화 완료");
  }, []);

  return (
    <>
      <div className="fixed right-6 top-[85%] z-20 flex -translate-y-1/2 flex-col items-center gap-5">
        <FabBtn
          icon={<Mail />}
          label="메일"
          onClick={() => setIsEmailModalOpen(true)}
        />
        <FabBtn
          icon={<MessageSquareText />}
          label="피드백"
          onClick={() => navigate("/feedback")}
        />
        <FabBtn icon={<ChevronUp />} label="맨 위로" onClick={scrollTop} />
      </div>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        serviceId={EMAILJS_CONFIG.serviceId}
        templateId={EMAILJS_CONFIG.templateId}
        toEmail="gusdn-2137@naver.com"
      />
    </>
  );
}
