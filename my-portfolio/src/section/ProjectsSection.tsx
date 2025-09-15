// src/components/ProjectsSection.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import SectionReveal from "../components/SectionReveal";

type Project = {
  title: string;
  subtitle?: string;
  description?: string; // 상세 설명 추가
  imgSrc?: string;
  demoUrl?: string; // 데모/라이브 사이트 URL
  githubUrl?: string; // 깃허브 URL
  projectUrl?: string; // 기타 프로젝트 URL (포트폴리오, 블로그 등)
};

function ProjectCard({
  title,
  subtitle,
  imgSrc = "",
  description,
  githubUrl,
  projectUrl,
  onClick,
}: Project & { onClick?: (p: Project) => void }) {
  const project: Project = {
    title,
    subtitle,
    imgSrc,
    description,
    githubUrl,
    projectUrl,
  };

  return (
    <button
      type="button"
      onClick={() => onClick?.(project)}
      className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition block text-left focus:outline-none focus:ring-2 focus:ring-white/40"
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
    </button>
  );
}

function ProjectModal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeOnEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", closeOnEsc);
    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [open, closeOnEsc]);

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!open || !project) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        // 바깥 클릭 닫기
        if (e.target === backdropRef.current) onClose();
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="project-modal-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-[#121212] border border-white/10 shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 id="project-modal-title" className="text-white font-semibold">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-white/5">
            {project.imgSrc ? (
              <img
                src={project.imgSrc}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-white/30 text-xs">
                thumbnail
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-white/60 mb-2">{project.subtitle}</p>
            <p className="text-sm text-white/80">
              {project.description ||
                "프로젝트에 대한 상세 설명이 여기에 표시됩니다."}
            </p>
          </div>

          {/* 링크 버튼들 */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.demoUrl && (
              <button
                onClick={() => handleLinkClick(project.demoUrl!)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                라이브 데모
              </button>
            )}

            {project.githubUrl && (
              <button
                onClick={() => handleLinkClick(project.githubUrl!)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white text-sm hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            )}

            {project.projectUrl && (
              <button
                onClick={() => handleLinkClick(project.projectUrl!)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white text-sm hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                프로젝트 상세소개
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const handleOpen = (p: Project) => {
    setSelected(p);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  // 프로젝트 데이터 - 실제 URL들을 여기에 추가하세요
  const projects: Project[] = [
    {
      title: "GitPulse",
      imgSrc: "/images/gitpulse.png",
      subtitle: "깃허브 활동 분석",
      description:
        "GitPulse는 팀 개발자의 GitHub 활동 데이터를 수집하고 시각화하여 개발 습관과 협업 패턴을 한눈에 파악할 수 있도록 돕는 웹 애플리케이션입니다.",
      projectUrl:
        "https://typhoon-nation-839.notion.site/GitPulse-26d720a2d0b0808a8465cfc6770df0db?pvs=74", // 프로젝트 소개 URL로 변경
      githubUrl: "https://github.com/GitPulse-04/GitPulse", // 실제 URL로 변경
    },
    {
      title: "UNOA",
      subtitle: "요금제 챗봇서비스",
      imgSrc: "/images/UNOA.jpg",
      description:
        "추천부터 비교, 혜택 정리까지 한 곳에서 나에게 딱 맞는 요금제 관리 도우미입니다.",
      projectUrl:
        "https://typhoon-nation-839.notion.site/UNOW-26e720a2d0b0802ca98bf4a3307a88e5?pvs=74", // 프로젝트 소개 URL로 변경
      githubUrl: "https://github.com/UNOA-Project",
    },
    {
      title: "포트폴리오",
      subtitle: "React + TS + Tailwind",
      imgSrc: "/images/portfolio.PNG",
      description:
        "현재 보고 계신 포트폴리오 웹사이트입니다. React, TypeScript, Tailwind CSS를 사용하여 제작했습니다.",

      githubUrl: "https://github.com/gusdn6288/portfolio",
    },
    {
      title: "UTONG",
      subtitle: "데이터 거래 플랫폼",
      imgSrc: "/images/UTONG.png",
      description:
        "안전하고 투명한 데이터 거래를 위한 블록체인 기반 플랫폼입니다. 데이터 소유자와 구매자를 연결합니다.",
      projectUrl:
        "https://typhoon-nation-839.notion.site/UTONG-26e720a2d0b080309227f01c8efa2ba5", // 프로젝트 소개 URL로 변경
      githubUrl: "https://github.com/Ureka-final-project-team-3/utong_front", // 실제 URL로 변경
    },
  ];

  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle>프로젝트</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} onClick={handleOpen} />
        ))}
      </div>

      {/* 프로젝트 상세 모달 */}
      <ProjectModal open={open} onClose={handleClose} project={selected} />
    </SectionReveal>
  );
}
