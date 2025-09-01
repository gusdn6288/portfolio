import React from "react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-6 md:mb-8">
      {children}
    </h2>
  );
}

function QBox({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 md:p-5 text-sm md:text-base text-white/85">
      <p className="font-semibold mb-2">Q. {q}</p>
      <p className="leading-relaxed text-white/80">{a}</p>
    </div>
  );
}

function MiniCard({
  title,
  subtitle,
  imgAlt = "",
  imgSrc = "",
}: {
  title: string;
  subtitle?: string;
  imgSrc?: string;
  imgAlt?: string;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/7.5 transition">
      <div className="aspect-video rounded-lg bg-white/5 overflow-hidden mb-3">
        {/* 썸네일 자리 */}
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={imgAlt}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-white/30 text-xs">
            thumbnail
          </div>
        )}
      </div>
      <h4 className="text-white font-semibold">{title}</h4>
      {subtitle && <p className="mt-1 text-xs text-white/60">{subtitle}</p>}
    </article>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10 my-10 md:my-14" />;
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      {/* 좌측 사이드 내비 (고정) */}
      <aside className="fixed left-4 top-10 hidden lg:block">
        <nav className="flex flex-col gap-5 text-3xl font-extrabold text-white/40">
          <a className="hover:text-white transition" href="#home">
            Home
          </a>
          <a className="text-white" href="#about">
            About me
          </a>
          <a className="hover:text-white transition" href="#project">
            Project
          </a>
          <a className="hover:text-white transition" href="#activity">
            Activity
          </a>
        </nav>
      </aside>

      <main className="mx-auto max-w-5xl px-5 md:px-8 pt-10 md:pt-16">
        {/* 프로필 */}
        <section id="about" className="pt-4 md:pt-8">
          <div className="mx-auto w-full flex flex-col items-center">
            <div className="w-40 h-48 rounded-xl overflow-hidden ring-1 ring-white/10">
              {/* 증명사진 자리 */}
              <img
                className="h-full w-full object-cover"
                src="" /* 교체 */
                alt="profile"
              />
            </div>

            <button
              className="mt-3 rounded-lg bg-white text-black text-xs font-semibold px-3 py-1.5 hover:bg-white/90"
              onClick={() => alert("이메일/연락처 모달 연결 예정")}
            >
              유실 항아리 적기
            </button>
          </div>

          {/* Interview */}
          <div className="mt-10 md:mt-14">
            <SectionTitle>Interview</SectionTitle>

            <div className="grid gap-3 md:gap-4">
              <QBox
                q="프론트엔드를 결정한 이유?"
                a="캡스톤 디자인에서 처음 협업을 경험하며, 사용자 경험을 직접 만드는 프론트엔드에 매력을 느꼈습니다. 디자인과 구현을 잇는 과정에서 문제를 발견하고 개선하는 즐거움이 컸고, 자연스럽게 이 길을 선택하게 되었습니다."
              />
              <QBox
                q="나를 표현한다면?"
                a="‘어제보다 성장하는 사람’. 작은 습관을 꾸준히 쌓아가며 팀과 제품에 의미있는 변화를 만드는 것을 좋아합니다."
              />
              <QBox
                q="성장을 위해 어떤 노력을 하고 있는지?"
                a="매일 블로그 작성, 코딩테스트 풀이, 이전 팀원들과의 스터디를 통해 학습과 회고를 꾸준히 이어가고 있습니다."
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* 핵심 역량 */}
        <section className="mt-2">
          <SectionTitle>핵심 역량</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <MiniCard
              title="프론트엔드 개발"
              subtitle="상태 관리와 애니메이션"
              imgSrc=""
            />
            <MiniCard
              title="Framer Motion"
              subtitle="부드러운 인터랙션"
              imgSrc=""
            />
            <MiniCard
              title="커뮤니케이션 및 협업"
              subtitle="깃허브/노션/이슈 기반 협업"
              imgSrc=""
            />
          </div>
        </section>

        <Divider />

        {/* 기술 스택 및 도구 */}
        <section>
          <SectionTitle>기술 스택 및 도구</SectionTitle>

          <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-bold">Front-End</h3>
              <ul className="space-y-2 text-white/80">
                <li>React, TypeScript, Vite</li>
                <li>Tailwind CSS, Framer Motion</li>
                <li>Zustand / React Query (필요 시)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-bold">Tools</h3>
              <ul className="space-y-2 text-white/80">
                <li>GitHub, Notion</li>
                <li>Figma</li>
                <li>VS Code, Chrome DevTools</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* 교육 및 자격증 */}
        <section>
          <SectionTitle>교육 및 자격증</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/85">
            <ul className="space-y-5">
              <li>
                <p className="text-sm text-white/60">2019 - 2022</p>
                <p className="font-semibold">대전대학교 중퇴</p>
                <p className="text-sm text-white/60">컴퓨터 공학과</p>
              </li>
              <li>
                <p className="text-sm text-white/60">2023 - 2025</p>
                <p className="font-semibold">한국교통대학교 편입</p>
                <p className="text-sm text-white/60">소프트웨어학과</p>
              </li>
            </ul>

            <ul className="space-y-5">
              <li>
                <p className="text-sm text-white/60">2025.01 - 08</p>
                <p className="font-semibold">LG U+ 유레카 2기</p>
                <p className="text-sm text-white/60">
                  프론트엔드 최종 프로젝트 수행
                </p>
              </li>
              <li>
                <p className="text-sm text-white/60">2024.09.10</p>
                <p className="font-semibold">정보처리기사</p>
              </li>
            </ul>
          </div>
        </section>

        <Divider />

        {/* 프로젝트 */}
        <section id="project">
          <SectionTitle>프로젝트</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <MiniCard
              title="GitPulse"
              subtitle="깃허브 분석 서비스"
              imgSrc=""
            />
            <MiniCard title="UNOA" subtitle="쇼핑/예약 플랫폼" imgSrc="" />
            <MiniCard
              title="포트폴리오"
              subtitle="프론트엔드 포트폴리오 사이트"
              imgSrc=""
            />
            <MiniCard title="UTONG" subtitle="데이터 거래 플랫폼" imgSrc="" />
          </div>
        </section>

        <Divider />

        {/* 블로그 */}
        <section id="activity" className="pb-16 md:pb-24">
          <SectionTitle>블로그</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <MiniCard
              title="0819 tailwind 정리하기"
              subtitle="자세히 보기 >"
              imgSrc=""
            />
            <MiniCard
              title="0819 HTML에 대한 고찰"
              subtitle="자세히 보기 >"
              imgSrc=""
            />
            <MiniCard
              title="[React] 리액트 간단한 문법"
              subtitle="자세히 보기 >"
              imgSrc=""
            />
            <MiniCard
              title="그 외 글 모음"
              subtitle="자세히 보기 >"
              imgSrc=""
            />
          </div>

          <div className="mt-5 flex justify-center">
            <button
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              onClick={() => (window.location.href = "#")} // 블로그 링크 연결
            >
              블로그로 이동
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
