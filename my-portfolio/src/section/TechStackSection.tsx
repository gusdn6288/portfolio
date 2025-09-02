// src/components/TechStackSection.tsx
import SectionTitle from "../components/SectionTitle";
import SectionReveal from "../components/SectionReveal";

export default function TechStackSection() {
  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle>기술 스택 및 도구</SectionTitle>

      <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-bold text-white">Front-End</h3>
          <ul className="space-y-2 text-white/80">
            <li>React, TypeScript, Vite</li>
            <li>Tailwind CSS, Framer Motion</li>
            <li>Zustand, React Query (필요 시)</li>
          </ul>
          {/* 아이콘 줄 자리 */}
          <div className="mt-4 flex items-center gap-3 opacity-80">
            {/* <img src="/icons/html.svg" /> ... */}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-lg font-bold text-white">Tools</h3>
          <ul className="space-y-2 text-white/80">
            <li>GitHub, Notion</li>
            <li>Figma</li>
            <li>VS Code, Chrome DevTools</li>
          </ul>
          <div className="mt-4 flex items-center gap-3 opacity-80">
            {/* 툴 아이콘 자리 */}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
