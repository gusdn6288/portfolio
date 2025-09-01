// src/components/CoreSkillsSection.tsx
import SectionTitle from "./SectionTitle";
import SectionReveal from "./SectionReveal";

function Card({
  title,
  subtitle,
  imgSrc = "",
  imgAlt = "",
}: {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  imgAlt?: string;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
      <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-white/5">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={imgAlt}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-white/30 text-xs">
            thumbnail
          </div>
        )}
      </div>
      <h4 className="text-white font-semibold">{title}</h4>
      {subtitle && <p className="mt-1 text-xs text-white/60">{subtitle}</p>}
    </article>
  );
}

export default function CoreSkillsSection() {
  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle>핵심 역량</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <Card
          title="프론트엔드 개발"
          subtitle="상태관리 · 성능 · 애니메이션"
          imgSrc=""
        />
        <Card title="Framer Motion" subtitle="부드러운 인터랙션" imgSrc="" />
        <Card
          title="커뮤니케이션/협업"
          subtitle="Git · PR 리뷰 · 이슈 관리"
          imgSrc=""
        />
      </div>
    </SectionReveal>
  );
}
