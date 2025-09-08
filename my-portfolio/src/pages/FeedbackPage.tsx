import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ApiClient } from "../lib/api";
import type { Feedback } from "../lib/api";
import FeedbackList from "../components/FeedbackList";
import FeedbackForm from "../components/FeedbackForm";

const ITEMS_PER_CHUNK = 5; // 한 번에 보여줄 아이템 수

// 피드백 페이지 로딩 화면
const FeedbackLoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#232323]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 mb-6">
          <DotLottieReact
            src="https://lottie.host/e72ae4ac-e6de-4a35-8fa9-cb3e4ab4c85e/VcsWtr3dul.lottie"
            loop
            autoplay
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white/90 text-xl font-medium mb-2"
        >
          피드백 로딩 중...
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/60 text-sm"
        >
          잠시만 기다려주세요
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function FeedbackPage({
  slug = "/feedback",
}: {
  slug?: string;
}) {
  const [allItems, setAllItems] = useState<Feedback[]>([]);
  const [displayedItems, setDisplayedItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPageLoading, setShowPageLoading] = useState(true); // 페이지 로딩 상태

  const title = useMemo(() => "your feedback", []);

  // 페이지 진입 시 로딩 애니메이션 제어
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPageLoading(false);
    }, 3000); // 3초간 로딩 애니메이션

    return () => clearTimeout(timer);
  }, []);

  // 초기 데이터 로드
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCurrentIndex(0);

    try {
      const feedbacks = await ApiClient.getFeedbacks(slug);
      setAllItems(feedbacks);

      // 처음 ITEMS_PER_CHUNK개만 표시
      const initialItems = feedbacks.slice(0, ITEMS_PER_CHUNK);
      setDisplayedItems(initialItems);
      setCurrentIndex(ITEMS_PER_CHUNK);
    } catch (e) {
      console.error("Failed to load feedbacks:", e);
      setError(e instanceof Error ? e.message : "목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // 더 많은 아이템 표시 (클라이언트 사이드 청킹)
  const loadMore = useCallback(async () => {
    if (loadingMore || currentIndex >= allItems.length) return;

    setLoadingMore(true);

    // 실제 API 호출 시뮬레이션을 위한 지연
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const nextItems = allItems.slice(
        currentIndex,
        currentIndex + ITEMS_PER_CHUNK
      );
      setDisplayedItems((prev) => [...prev, ...nextItems]);
      setCurrentIndex((prev) => prev + ITEMS_PER_CHUNK);
    } catch (e) {
      console.error("Failed to load more feedbacks:", e);
      setError(
        e instanceof Error ? e.message : "추가 데이터를 불러오지 못했습니다."
      );
    } finally {
      setLoadingMore(false);
    }
  }, [allItems, currentIndex, loadingMore]);

  const hasMore = useMemo(
    () => currentIndex < allItems.length,
    [currentIndex, allItems.length]
  );

  useEffect(() => {
    // 페이지 로딩이 끝난 후에 데이터 로드
    if (!showPageLoading) {
      load();
    }
  }, [load, showPageLoading]);

  const handleFormSuccess = async () => {
    await load(); // 새 피드백 등록 후 목록 새로고침
  };

  return (
    <>
      {/* 페이지 로딩 애니메이션 */}
      <AnimatePresence mode="wait">
        {showPageLoading && <FeedbackLoadingScreen key="feedback-loading" />}
      </AnimatePresence>

      {/* 메인 피드백 페이지 콘텐츠 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: showPageLoading ? 0 : 1,
          y: showPageLoading ? 0 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-screen w-full bg-[#232323] text-white"
        style={{ display: showPageLoading ? "none" : "block" }}
      >
        <div className="h-full mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-10">
          {/* 좌측: 목록 컬럼 */}
          <div className="flex flex-col h-full overflow-hidden">
            {/* 상단: 제목 + 상태(로딩/에러) — 스크롤 바깥 */}
            <div className="flex-shrink-0">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl font-extrabold tracking-tight text-center mb-4"
              >
                {title}
              </motion.h2>

              {/* 상단 상태 표시 */}
              {loading && (
                <div className="text-center text-white/70 mb-4">
                  불러오는 중...
                </div>
              )}
              {error && (
                <div className="text-center text-red-400 mb-4">
                  {error}{" "}
                  <button
                    onClick={load}
                    className="ml-2 underline underline-offset-4 hover:text-red-300 transition-colors"
                  >
                    다시 시도
                  </button>
                </div>
              )}
            </div>

            {/* 가운데: 스크롤되는 리스트 영역만 overflow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex-1 min-h-0 overflow-y-auto pr-2"
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
                    .flex-1::-webkit-scrollbar {
                      display: none; /* Chrome, Safari, Opera */
                    }
                  `,
                }}
              />
              <FeedbackList
                items={displayedItems}
                loading={loading}
                error={error}
                onRetry={load}
                hasMore={hasMore}
                onLoadMore={loadMore}
                loadingMore={loadingMore}
              />
            </motion.div>

            {/* 하단: 개수 — 스크롤 바깥 */}
            <div className="flex-shrink-0">
              {!loading && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-4 text-center"
                >
                  <span className="text-white/60 text-sm">
                    {displayedItems.length} / {allItems.length}개의 피드백
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* 우측: 폼 (고정) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-start h-full"
          >
            <div className="sticky top-0 w-full">
              <FeedbackForm slug={slug} onSuccess={handleFormSuccess} />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
