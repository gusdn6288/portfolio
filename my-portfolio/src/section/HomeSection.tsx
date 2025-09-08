import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HomeSection() {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 컴포넌트 마운트 시 처리
  useEffect(() => {
    setMounted(true);

    // 페이지 로드 시 홈 섹션이 보이는 영역에 있다면 맨 위로 스크롤
    const timer = setTimeout(() => {
      const homeSection = ref.current;
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        const isHomeVisible =
          rect.top <= window.innerHeight && rect.bottom >= 0;

        if (isHomeVisible && window.scrollY > 100) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
      setInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 배경색: 0%일 때 #EAEAEA, 35% 시점에 #232323 → 이후 그대로 유지
  const bg = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    ["#EAEAEA", "#232323", "#232323"]
  );

  // 텍스트 확대 - 최대 크기 제한하고 더 부드럽게
  const scale = useTransform(
    scrollYProgress,
    [0, 0.7, 0.85, 1],
    [1, 1.3, 1.5, 1.6]
  );

  // 텍스트 투명도: 더 자연스러운 페이드아웃
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.65, 1],
    [1, 1, 0.3, 0]
  );

  // 텍스트 색상: 검정 → 흰색
  const color = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["#000000", "#ffffff", "#ffffff"]
  );

  // Y축 이동으로 자연스러운 움직임 추가
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, -100]);

  return (
    <section id="home" ref={ref} className="relative h-[150vh] w-full">
      <motion.div
        style={{ backgroundColor: bg }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <motion.div
          style={{
            scale: mounted && !initialLoad ? scale : 1, // 초기 로드 중에는 기본 크기
            opacity: mounted && !initialLoad ? opacity : 1,
            color: mounted && !initialLoad ? color : "#000000",
            y: mounted && !initialLoad ? y : 0,
          }}
          initial={{ scale: 1, opacity: 1 }} // 초기값 명시
          transition={{ duration: 0.3 }}
          className="text-center will-change-transform"
        >
          <h1 className="text-hero">Front-End</h1>
          <p className="mt-2 text-subhero">
            어제보다 성장하는 개발자{" "}
            <span className="font-extrabold">김현우</span>
            입니다.
          </p>
          <motion.div
            style={{ opacity: mounted && !initialLoad ? opacity : 1 }}
            className="mt-4"
          >
            <DotLottieReact
              src="https://lottie.host/bc1f66f7-8d6d-4f56-94bb-c4d7756c83e5/oVS7kGB5b9.lottie"
              loop
              autoplay
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
