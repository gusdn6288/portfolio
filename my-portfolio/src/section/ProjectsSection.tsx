// src/components/ProjectsSection.tsx
import SectionTitle from "../components/SectionTitle";
import SectionReveal from "../components/SectionReveal";

function ProjectCard({
  title,
  subtitle,
  imgSrc = "",
  link = "#",
}: {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  link?: string;
}) {
  return (
    <a
      href={link}
      className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition block"
      target="_blank"
      rel="noreferrer"
    >
      <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-white/5">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
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
    </a>
  );
}

export default function ProjectsSection() {
  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle>프로젝트</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <ProjectCard
          title="GitPulse"
          subtitle="깃허브 활동 분석"
          imgSrc=""
          link="#"
        />
        <ProjectCard
          title="UNOA"
          subtitle="쇼핑/예약 플랫폼"
          imgSrc=""
          link="#"
        />
        <ProjectCard
          title="포트폴리오"
          subtitle="React + TS + Tailwind"
          imgSrc=""
          link="#"
        />
        <ProjectCard
          title="UTONG"
          subtitle="데이터 거래 플랫폼"
          imgSrc=""
          link="#"
        />
      </div>
    </SectionReveal>
  );
}
