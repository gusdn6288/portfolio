import SectionTitle from "../components/SectionTitle";
import SectionReveal from "../components/SectionReveal";

function Card({
  title,
  subtitle,
  imgSrc,
  imgAlt,
}: {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  imgAlt?: string;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition">
      {/* 이미지 영역 */}
      <div className="aspect-video w-full bg-white/5">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={imgAlt || title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-white/30 text-xs">
            thumbnail
          </div>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="p-4">
        <h4 className="text-white font-semibold text-base">{title}</h4>
        {subtitle && (
          <p className="mt-1 text-sm text-white/60 leading-snug">{subtitle}</p>
        )}
      </div>
    </article>
  );
}

export default function CoreSkillsSection() {
  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle>핵심 역량</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <Card
          title="프론트엔드 개발"
          subtitle="상태관리 · 성능 · 애니메이션"
          imgSrc="/images/frontend.png" // <- 직접 넣을 이미지 경로
        />
        <Card
          title="Framer Motion"
          subtitle="부드러운 인터랙션"
          imgSrc="/images/framer.png"
        />
        <Card
          title="커뮤니케이션 및 협업"
          subtitle="Git · Notion · PR 리뷰"
          imgSrc="/images/collab.png"
        />
      </div>
    </SectionReveal>
  );
}
