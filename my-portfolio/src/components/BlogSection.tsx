// src/components/BlogSection.tsx
import SectionTitle from "./SectionTitle";
import SectionReveal from "./SectionReveal";

function BlogCard({
  title,
  cta = "자세히 보기 >",
  imgSrc = "",
  link = "#",
}: {
  title: string;
  cta?: string;
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
      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/5">
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
      <h4 className="text-white font-semibold text-sm">{title}</h4>
      <p className="mt-1 text-xs text-white/60">{cta}</p>
    </a>
  );
}

export default function BlogSection() {
  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle>블로그</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <BlogCard title="0819 Tailwind 정리하기" imgSrc="" link="#" />
        <BlogCard title="0819 HTML에 대한 고찰" imgSrc="" link="#" />
        <BlogCard title="[React] 간단한 문법" imgSrc="" link="#" />
        <BlogCard title="그 외 글 모음" imgSrc="" link="#" />
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href="#"
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          target="_blank"
          rel="noreferrer"
        >
          블로그로 이동
        </a>
      </div>
    </SectionReveal>
  );
}
