import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// 로딩 화면 컴포넌트
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#232323]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-48 h-48 mb-4">
          <DotLottieReact
            src="https://lottie.host/e72ae4ac-e6de-4a35-8fa9-cb3e4ab4c85e/VcsWtr3dul.lottie"
            loop
            autoplay
          />
        </div>

        {/* 로딩 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white/80 text-lg font-medium"
        >
          Loading...
        </motion.div>

        {/* 프로그레스 바 */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="mt-6 h-0.5 bg-white/30 w-32 overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-white/80"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// 메인 앱 래퍼 컴포넌트
interface AppWithLoadingProps {
  children: React.ReactNode;
  loadingDuration?: number; // 로딩 시간 (밀리초)
}

export const AppWithLoading: React.FC<AppWithLoadingProps> = ({
  children,
  loadingDuration = 3000,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 최소 로딩 시간과 실제 페이지 로드 완료 중 더 긴 시간 적용
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    // 페이지가 이미 로드되었다면 타이머 단축 (선택사항)
    if (document.readyState === "complete") {
      // 이미 로드된 경우에도 최소 1초는 보여줌
      const minTimer = setTimeout(() => {
        setIsLoading(false);
      }, Math.min(loadingDuration, 1000));

      return () => {
        clearTimeout(timer);
        clearTimeout(minTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [loadingDuration]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <div style={{ display: isLoading ? "none" : "block" }}>{children}</div>
    </>
  );
};
