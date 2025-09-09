// src/components/ProjectsSection.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import SectionReveal from "../components/SectionReveal";

type Project = {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  link?: string;
};

function ProjectCard({
  title,
  subtitle,
  imgSrc = "",
  onClick,
}: Project & { onClick?: (p: Project) => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.({ title, subtitle, imgSrc })}
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
            className="rounded-md px-2 py-1 text-white/70 hover:text-white hover:bg-white/10"
          >
            닫기
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

          <p className="text-sm text-white/80">
            {project.subtitle ||
              "임시 설명입니다. 프로젝트 상세 설명을 넣어주세요."}
          </p>

          {/* 임시 버튼들 */}
          <div className="flex gap-2 pt-2">
            <button className="px-3 py-2 rounded-md bg-white text-black text-sm font-semibold hover:bg-white/90">
              데모 열기 (임시)
            </button>
            <button className="px-3 py-2 rounded-md border border-white/20 text-white text-sm hover:bg-white/10">
              깃허브 보기 (임시)
            </button>
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

  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle>프로젝트</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <ProjectCard
          title="GitPulse"
          subtitle="깃허브 활동 분석"
          onClick={handleOpen}
        />
        <ProjectCard
          title="UNOA"
          subtitle="쇼핑/예약 플랫폼"
          onClick={handleOpen}
        />
        <ProjectCard
          title="포트폴리오"
          subtitle="React + TS + Tailwind"
          onClick={handleOpen}
        />
        <ProjectCard
          title="UTONG"
          subtitle="데이터 거래 플랫폼"
          onClick={handleOpen}
        />
      </div>

      {/* 임시 모달 */}
      <ProjectModal open={open} onClose={handleClose} project={selected} />
    </SectionReveal>
  );
}
