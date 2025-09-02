// cSpell:words Velog VelogPost
export type VelogPost = {
  title: string;
  link: string;
  thumbnail?: string;
  pubDate: string;
};

const RSS_URL = encodeURIComponent("https://v2.velog.io/rss/@hyeon0223");
// 간단: rss2json 사용
const RSS2JSON = `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}`;

type Rss2JsonItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  thumbnail?: string;
  enclosure?: { link?: string };
  content?: string;
  description?: string;
};

type Rss2JsonResponse = {
  status: string;
  items: Rss2JsonItem[];
};

function extractFirstImage(html?: string): string | undefined {
  if (!html) return;
  const m = html.match(/<img[^>]*src="([^"]+)"/i);
  return m?.[1];
}

function pickThumb(it: Rss2JsonItem): string | undefined {
  return (
    it.thumbnail ||
    it.enclosure?.link ||
    extractFirstImage(it.content) ||
    extractFirstImage(it.description) ||
    undefined
  );
}

export async function fetchVelogPosts(limit = 4): Promise<VelogPost[]> {
  // 1시간 캐시
  const cacheKey = "velog_posts_cache_v1";
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { ts, posts } = JSON.parse(cached) as {
        ts: number;
        posts: VelogPost[];
      };
      if (Date.now() - ts < 60 * 60 * 1000) {
        return posts.slice(0, limit);
      }
    } catch {
      // JSON parse 실패 → 캐시 무시
    }
  }

  const res = await fetch(RSS2JSON);
  if (!res.ok) throw new Error("rss2json fetch failed");
  const data = (await res.json()) as Rss2JsonResponse;

  const posts: VelogPost[] = (data.items || []).slice(0, limit).map((it) => ({
    title: it.title ?? "제목 없음",
    link: it.link ?? "#",
    pubDate: it.pubDate ?? "",
    thumbnail: pickThumb(it) || undefined, // 절대 빈 문자열("")이 되지 않도록
  }));

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), posts }));
  } catch {
    // 저장 실패 → 무시
  }

  return posts;
}
