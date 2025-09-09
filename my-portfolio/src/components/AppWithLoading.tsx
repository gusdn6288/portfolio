import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingScreen = ({ duration = 3000 }: { duration?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#232323]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.05, opacity: 0 }}
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

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="text-white/80 text-lg font-medium"
        >
          Loading...
        </motion.div>

        <div className="mt-6 w-40 h-1 bg-white/25 rounded-full overflow-hidden">
          <motion.div
            // 왼쪽에서 오른쪽으로 채워지게
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: duration / 1000, ease: "easeInOut" }}
            className="h-full rounded-full bg-white/90"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

interface AppWithLoadingProps {
  children: React.ReactNode;
  loadingDuration?: number; // ms
}

export const AppWithLoading: React.FC<AppWithLoadingProps> = ({
  children,
  loadingDuration = 3000,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), loadingDuration);

    // 페이지가 이미 로드되어 있어도 최소 표시 시간 보장
    if (document.readyState === "complete") {
      const minShow = setTimeout(
        () => setIsLoading(false),
        Math.min(1000, loadingDuration)
      );
      return () => {
        clearTimeout(t);
        clearTimeout(minShow);
      };
    }
    return () => clearTimeout(t);
  }, [loadingDuration]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" duration={loadingDuration} />
        )}
      </AnimatePresence>
      <div style={{ display: isLoading ? "none" : "block" }}>{children}</div>
    </>
  );
};
