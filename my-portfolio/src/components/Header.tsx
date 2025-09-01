export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20 px-6 py-6">
      <div className="mx-auto flex max-w-6xl items-start justify-between">
        {/* 좌상단 로고 */}
        <div className="pointer-events-auto select-none text-2xl font-extrabold tracking-tight">
          KHW
        </div>

        {/* 우상단 작은 텍스트 */}
        <div className="pointer-events-auto select-none text-right leading-tight text-black/70">
          <div className="text-sm">portfolio</div>
          <div className="text-xs">Kim hyeon woo</div>
        </div>
      </div>
    </header>
  );
}
