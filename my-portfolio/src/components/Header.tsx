import { useEffect, useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 200px 이후부터 어두운 섹션이라고 가정
      setIsDark(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20 px-6 py-6">
      <div className="mx-auto flex max-w-6xl items-start justify-between">
        {/* 좌상단 로고 */}
        <div
          className={`pointer-events-auto select-none text-2xl font-extrabold tracking-tight ${
            isDark ? "text-white" : "text-black/70"
          }`}
        >
          KHW
        </div>

        {/* 우상단 작은 텍스트 */}
        <div
          className={`pointer-events-auto select-none text-right leading-tight ${
            isDark ? "text-white" : "text-black/70"
          }`}
        >
          <div className="text-sm">portfolio</div>
          <div className="text-xs">Kim hyeon woo</div>
        </div>
      </div>
    </header>
  );
}
