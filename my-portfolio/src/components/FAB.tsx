import React from "react";
import { Mail, MessageSquareText, ChevronUp } from "lucide-react";

type FabBtnProps = {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
};

function FabBtn({ icon, label, onClick }: FabBtnProps) {
  return (
    <button
      onClick={onClick}
      className="group flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-fab ring-1 ring-black/5 transition
                 hover:scale-[1.03] active:scale-95"
      aria-label={label}
    >
      <span className="opacity-80 transition group-hover:opacity-100">
        {icon}
      </span>
    </button>
  );
}

export default function FAB() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-5">
      <FabBtn
        icon={<Mail />}
        label="메일"
        onClick={() => (window.location.href = "mailto:you@example.com")}
      />
      <FabBtn
        icon={<MessageSquareText />}
        label="메시지"
        onClick={() => alert("메시지 섹션으로 이동 예정")}
      />
      <FabBtn icon={<ChevronUp />} label="맨 위로" onClick={scrollTop} />
    </div>
  );
}
