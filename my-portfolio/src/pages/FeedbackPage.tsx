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

// 모바일 폼 토글 버튼
const FormToggleButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group lg:hidden"
      aria-label="피드백 작성"
    >
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <svg
          className="w-6 h-6 text-[#232323] group-hover:text-gray-700 transition-colors duration-200"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
        </svg>
      </motion.div>
    </motion.button>
  );
};

// FAB 홈 버튼 컴포넌트
const HomeFAB = () => {
  const handleHomeClick = () => {
    // 홈으로 이동하는 로직 (예: React Router의 navigate 사용)
    window.location.href = "/";
    // 또는 React Router를 사용하는 경우:
    // navigate('/');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleHomeClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center group"
      aria-label="홈으로 이동"
    >
      <motion.svg
        className="w-6 h-6 text-[#232323] group-hover:text-gray-700 transition-colors duration-200"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.1 }}
      >
        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
      </motion.svg>
    </motion.button>
  );
};

// 모바일 폼 모달
const MobileFormModal = ({
  isOpen,
  onClose,
  slug,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  onSuccess: () => void;
}) => {
  const handleSuccess = async () => {
    await onSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* 모달 컨텐츠 */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-[#232323] rounded-t-3xl shadow-2xl lg:hidden"
          >
            {/* 드래그 핸들 */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-white/30 rounded-full" />
            </div>

            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">피드백 작성</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="닫기"
              >
                <svg
                  className="w-5 h-5 text-white/70"
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

            {/* 폼 컨텐츠 */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <FeedbackForm slug={slug} onSuccess={handleSuccess} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
  const [showMobileForm, setShowMobileForm] = useState(false); // 모바일 폼 토글

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

  const toggleMobileForm = () => {
    setShowMobileForm(!showMobileForm);
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
        <div className="h-full mx-auto max-w-6xl lg:grid lg:grid-cols-2 gap-10 px-6 py-10">
          {/* 좌측 또는 모바일 전체: 목록 컬럼 */}
          <div className="flex flex-col h-full overflow-hidden">
            {/* 상단: 제목 + 상태(로딩/에러) — 스크롤 바깥 */}
            <div className="flex-shrink-0">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl lg:text-4xl font-extrabold tracking-tight text-center mb-4"
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

          {/* 우측: 폼 (데스크톱에서만 표시) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="hidden lg:flex flex-col items-center h-full"
          >
            <div className="w-full h-[100%] flex items-start">
              <div className="sticky top-10 w-full">
                <FeedbackForm slug={slug} onSuccess={handleFormSuccess} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 모바일 폼 모달 */}
      <MobileFormModal
        isOpen={showMobileForm}
        onClose={() => setShowMobileForm(false)}
        slug={slug}
        onSuccess={handleFormSuccess}
      />

      {/* 모바일 폼 토글 버튼 */}
      {!showPageLoading && (
        <FormToggleButton isOpen={showMobileForm} onClick={toggleMobileForm} />
      )}

      {/* FAB 홈 버튼 */}
      {!showPageLoading && <HomeFAB />}
    </>
  );
}
