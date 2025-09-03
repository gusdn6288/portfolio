<!--progress-badge-start-->
![Progress](https://img.shields.io/badge/Progress-0%25-lightgrey)
<!--progress-badge-end-->

# ✅ 포트폴리오 개발 테스크 파일 (최종 정리)

> 목적: **구직용 포트폴리오**. 대상: **채용 담당자**. 스택: **React + Vite + TypeScript + Tailwind**.  
> 차별점: **댓글/응원 기능**, **모던 + 애니메이션 연출**, **Vercel 배포**.

---

## 1️⃣ 환경 세팅
- [ ] React + Vite + TypeScript 프로젝트 생성 (`npm create vite@latest my-portfolio -- --template react-ts`)
- [ ] Tailwind CSS 설치 & 초기 설정 (`tailwind.config.ts`, `postcss.config.js`, `index.css`에 지시문 추가)
- [ ] ESLint + Prettier 설정 (포맷/룰 통일)
- [ ] GitHub 저장소 연결 및 첫 커밋
- [ ] Vercel 프로젝트 연결 & **초기 배포** (환경변수 필요시 등록)

---

## 2️⃣ 기본 레이아웃 & 디자인
- [ ] 공통 레이아웃 구성: **Header / Main / Footer**
- [ ] Tailwind `theme` 확장: 색상 팔레트, 폰트, spacing, shadow 토큰
- [ ] 반응형 레이아웃 (모바일 퍼스트, 데스크톱 최적화)
- [ ] 글로벌 스타일: 스크롤바, selection, 링크/버튼 상태
- [ ] 내비게이션 바: Home / About / Skills / Projects / Contact (활성 상태 표시)

---

## 3️⃣ 섹션별 구현
### 🏠 홈 (Intro)
- [ ] 이름, 직무(Frontend Developer), 짧은 한 줄 소개
- [ ] 진입 애니메이션(페이드/슬라이드/타이핑 등)
- [ ] CTA 버튼(Projects로 스크롤, Contact로 이동)

### 👤 자기소개 (About Me)
- [ ] 학력·경험(학생회 문화부장, 도서관 근로 등) 타임라인
- [ ] 프론트엔드 선택 이유/성장 스토리
- [ ] 키워드 배지(문제해결, 팀워크, 오너십 등)

### 🧰 스킬 (Skills)
- [ ] 핵심 스택 아이콘/뱃지(React, Vite, Tailwind, TypeScript)
- [ ] 숙련도/활용도 시각화(바/칩/태그)
- [ ] 툴/협업(ESLint, Prettier, Git/GitHub, Vercel)

### 📦 프로젝트 (Projects)
- [ ] 프로젝트 카드 레이아웃(썸네일/태그/링크)
- [ ] 대표 프로젝트 상세(UTONG, 요금제 추천 챗봇, 포인트샵 등)
- [ ] GitHub / 배포 링크 버튼
- [ ] 이미지/영상(데모 GIF 또는 mp4 썸네일)

### ✉️ 연락처 (Contact)
- [ ] 이메일, GitHub, LinkedIn 아이콘 링크
- [ ] “메일 보내기” 버튼(메일토 또는 폼)
- [ ] 간단한 감사 메시지/푸터 카피라이트

---

## 4️⃣ 특별 기능 (차별점)
- [ ] **댓글/응원 기능 UI** (닉네임 + 메시지 입력, 목록 표시)
- [ ] 백엔드 선택: **Firebase / Supabase / (간단 Express + MongoDB Atlas)** 중 택1
- [ ] 기능 플로우: 작성 → 저장 → 즉시 리스트 반영
- [ ] 유효성 검사(빈 값 제한, 길이 제한) 및 스팸 방지(딜레이/토큰 등)
- [ ] (선택) 삭제/신고/좋아요 기능

---

## 5️⃣ 애니메이션 & 인터랙션
- [ ] 스크롤 트랜지션(섹션 진입 모션) – Framer Motion
- [ ] 카드 Hover/Focu​s 인터랙션(리프트/블러/쉐도우)
- [ ] 배경 연출(보트/파도/그래프 등 컨셉)
- [ ] 모션 성능 점검(과도한 reflow/paint 방지)

---

## 6️⃣ 접근성 & 성능
- [ ] 명도 대비 / 키보드 포커스 링 / aria-label 점검
- [ ] 이미지 최적화(크기, 포맷, 지연 로딩)
- [ ] 번들 사이즈 확인(Vite 분석 플러그인 등)
- [ ] Lighthouse(Performance/Accessibility/Best Practices/SEO) 체크

---

## 7️⃣ 배포 & 메타
- [ ] Favicon / Open Graph / Twitter 카드 메타태그
- [ ] `robots.txt` & `sitemap`(선택)
- [ ] Vercel **프로덕션 배포**
- [ ] 장애 복구용 롤백 플랜(이전 빌드 재배포 방법 숙지)

---

## 8️⃣ 문서화 & 자동화
- [ ] **README.md** (소개, 스택, 폴더 구조, 실행/배포 방법, 스크린샷)
- [ ] 진행률 뱃지 마커 유지(아래 2줄 필수)
  ```md
