// src/section/HomeSection.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HomeSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 배경색: 0%일 때 #EAEAEA, 20% 시점에 #232323 → 이후 그대로 유지
  const bg = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    ["#EAEAEA", "#232323", "#232323"]
  );

  // 텍스트 확대
  const scale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1.9, 2.0]);

  // 텍스트 투명도: 0~0.5까지 유지 → 그 이후 서서히 사라짐
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.6, 1],
    [1, 1, 0, 0]
  );

  // 텍스트 색상: 검정 → 흰색
  const color = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["#000000", "#ffffff", "#ffffff"]
  );

  return (
    <section id="home" ref={ref} className="relative h-[150vh] w-full">
      <motion.div
        style={{ backgroundColor: bg }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <motion.div
          style={{ scale, opacity, color }}
          className="text-center will-change-transform"
        >
          <h1 className="text-hero">Front-End</h1>
          <p className="mt-2 text-subhero">
            어제보다 성장하는 개발자{" "}
            <span className="font-extrabold">김현우</span>
            입니다.
          </p>
          <DotLottieReact
            src="https://lottie.host/bc1f66f7-8d6d-4f56-94bb-c4d7756c83e5/oVS7kGB5b9.lottie"
            loop
            autoplay
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
