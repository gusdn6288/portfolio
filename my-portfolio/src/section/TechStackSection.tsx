type Icon = { src: string; alt: string };

function IconRow({ title, icons }: { title: string; icons: Icon[] }) {
  return (
    <div className="text-center">
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      <div className="flex items-center justify-center gap-4 md:gap-6 opacity-90">
        {icons.map((it) => (
          <img
            key={it.alt}
            src={it.src}
            alt={it.alt}
            className="h-10 w-10 md:h-12 md:w-12"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default function TechStackSplit() {
  const frontEnd: Icon[] = [
    { src: "/icons/html.svg", alt: "HTML5" },
    { src: "/icons/css.svg", alt: "CSS3" },
    { src: "/icons/js.svg", alt: "JavaScript" },
    { src: "/icons/react.svg", alt: "React" },
    { src: "/icons/tailwind.svg", alt: "Tailwind CSS" }, // 필요 시 경로 교체
  ];

  const tools: Icon[] = [
    { src: "/icons/figma.svg", alt: "Figma" },
    { src: "/icons/github.svg", alt: "GitHub" },
    { src: "/icons/notion.svg", alt: "Notion" },
    { src: "/icons/discord.svg", alt: "Discord" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      {/* 섹션 타이틀 */}
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-white mb-10">
        기술 스택 및 도구
      </h2>

      {/* 본문: 좌/우 블록 + 세로 구분선 */}
      <div className="flex flex-col md:flex-row items-center">
        {/* 왼쪽 영역 - flex: 1로 동일한 공간 할당 */}
        <div className="flex-1 flex justify-center">
          <IconRow title="Front-End" icons={frontEnd} />
        </div>

        {/* 오른쪽 영역 - flex: 1로 동일한 공간 할당 */}
        <div className="flex-1 flex justify-center">
          <IconRow title="Tools" icons={tools} />
        </div>
      </div>
    </section>
  );
}
