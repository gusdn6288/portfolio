import { useEffect, useRef, useCallback } from "react";
import type { Feedback } from "../lib/api";

interface FeedbackListProps {
  items: Feedback[];
  loading: boolean;
  error: string | null;
  onRetry: () => void | Promise<void>;
  hasMore: boolean;
  onLoadMore: () => void;
  loadingMore: boolean;
}

export default function FeedbackList({
  items,
  loading,
  error,
  onRetry,
  hasMore,
  onLoadMore,
  loadingMore,
}: FeedbackListProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer 설정 - 성능 최적화
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, onLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // 재시도 핸들러
  const handleRetry = useCallback(async () => {
    try {
      await onRetry();
    } catch (error) {
      console.error("Retry failed:", error);
    }
  }, [onRetry]);

  // 날짜 포맷팅 헬퍼 함수 - 메모이제이션 고려
  const formatDateTime = useCallback((dateString: string | Date) => {
    const d = new Date(dateString);
    const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(d.getDate()).padStart(2, "0")}`;
    const time = `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
    return { date, time };
  }, []);

  // 초기 로딩
  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <span className="ml-3 text-white/60">불러오는 중...</span>
      </div>
    );
  }

  // 에러 상태 (아이템이 없을 때)
  if (error && items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md 
                     transition-colors duration-200 focus:outline-none 
                     focus:ring-2 focus:ring-white/30"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 빈 상태
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🎉</div>
        <p className="text-white/60">첫 피드백을 남겨주세요!</p>
      </div>
    );
  }

  return (
    <div
      className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-2"
      style={
        {
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        } as React.CSSProperties
      }
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `,
        }}
      />

      {items.map((item, index) => {
        const { date, time } = formatDateTime(item.createdAt);
        const isLastElement = index === items.length - 1;

        return (
          <article
            key={item._id}
            className="group animate-fadeIn scrollbar-hide"
            ref={isLastElement && hasMore ? lastElementRef : null}
          >
            <header className="flex justify-between items-center text-sm mb-3">
              <h3 className="font-medium text-white/90 truncate mr-4">
                {item.name}
              </h3>
              <time
                className="text-white/50 whitespace-nowrap text-xs"
                dateTime={item.createdAt.toString()}
              >
                {date} {time}
              </time>
            </header>

            <div
              className="rounded-lg bg-white/95 backdrop-blur text-gray-900 px-4 py-3 
                         shadow-sm hover:shadow-md hover:bg-white 
                         transform transition-all duration-200 hover:scale-[1.01]
                         border border-white/20 hover:border-white/40"
            >
              <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                {item.message}
              </p>
            </div>
          </article>
        );
      })}

      {/* 추가 로딩 인디케이터 */}
      {loadingMore && (
        <div className="flex items-center justify-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white/60"></div>
          <span className="ml-2 text-white/60 text-sm">더 불러오는 중...</span>
        </div>
      )}

      {/* 더 이상 불러올 데이터가 없을 때 */}
      {!hasMore && items.length > 0 && !loadingMore && (
        <div className="text-center py-8  mt-8">
          <div className="inline-flex items-center text-white/40 text-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            모든 피드백을 확인했습니다
          </div>
        </div>
      )}

      {/* 에러가 있지만 기존 데이터가 있을 때 */}
      {error && items.length > 0 && (
        <div className="text-center py-4 bg-red-500/10 rounded-lg border border-red-500/20">
          <p className="text-red-400 text-sm mb-3">{error}</p>
          <button
            onClick={handleRetry}
            className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 
                       text-red-300 rounded text-sm transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-red-400/50"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
