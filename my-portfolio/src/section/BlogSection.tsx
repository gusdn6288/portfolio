// cSpell:words Velog VelogPost
import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import SectionReveal from "../components/SectionReveal";
import { fetchVelogPosts } from "../utils/fetchVelog";
import type { VelogPost } from "../utils/fetchVelog";
// BlogSection.tsx 중

const formatDate = (d?: string) => {
  if (!d) return "";
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
};

function BlogCard({ post }: { post: VelogPost }) {
  const hasThumb = !!post.thumbnail && post.thumbnail.trim().length > 0;

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition"
    >
      {/* 배경 이미지 */}
      <div
        className="relative aspect-[4/3] bg-cover bg-center"
        style={
          hasThumb ? { backgroundImage: `url(${post.thumbnail})` } : undefined
        }
      >
        {!hasThumb && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5" />
        )}
        {/* 40% 블랙 오버레이 → 이미지가 약 60% 보임 */}
        <div className="absolute inset-0 bg-black/60 transition group-hover:bg-black/30" />

        {/* 내용 */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div>
            <h4 className="text-white font-semibold text-sm leading-snug line-clamp-2">
              {post.title}
            </h4>
            {post.pubDate && (
              <p className="mt-1 text-[11px] text-white/70">
                {formatDate(post.pubDate)}
              </p>
            )}
          </div>

          <div className="flex items-end">
            <span className="inline-flex items-center rounded-md  px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-[2px] transition group-hover:bg-white/20">
              자세히 보기 ›
            </span>
          </div>
        </div>
      </div>

      {/* 하단 메타는 제거해도 되고, 남기고 싶으면 유지 */}
      {/* <div className="px-4 py-3">
        <p className="text-xs text-white/60">{formatDate(post.pubDate)}</p>
      </div> */}
    </a>
  );
}

export default function BlogSection() {
  const [posts, setPosts] = useState<VelogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVelogPosts(4)
      .then(setPosts)
      .catch((e) => {
        console.error(e);
        setError("블로그 글을 불러오지 못했습니다.");
      });
  }, []);

  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle>블로그</SectionTitle>

      {error ? (
        <p className="text-center text-white/60">{error}</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {posts.map((post, i) => (
            <BlogCard key={i} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/60">불러오는 중...</p>
      )}

      <div className="mt-6 flex justify-center">
        <a
          href="https://velog.io/@hyeon0223/posts"
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
