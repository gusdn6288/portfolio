import Header from "./components/Header";
import FAB from "./components/FAB";
import SideNav from "./components/SideNav";

import HomeSection from "./section/HomeSection";
import AboutSection from "./section/AboutSection";
import CoreSkillsSection from "./section/CoreSkillsSection";
import TechStackSection from "./section/TechStackSection";
import EducationSection from "./section/EducationSection";
import ProjectsSection from "./section/ProjectsSection";
import BlogSection from "./section/BlogSection";

export default function App() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <FAB />
      <SideNav />

      {/* Hero - 밝은 배경 (섹션 중첩 X) */}
      <HomeSection />

      {/* About 이하 - 어두운 배경 */}
      <section id="about" className="bg-[#232323] text-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <AboutSection />
        </div>
      </section>

      <section id="core" className="bg-[#232323] text-white py-24">
        <CoreSkillsSection />
      </section>

      {/* 교육과 기술스택을 나란히 배치 */}
      <section className="bg-[#232323] text-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 기술 스택 영역 */}
            <div id="stack">
              <TechStackSection />
            </div>

            {/* 교육 영역 */}
            <div id="education">
              <EducationSection />
            </div>
          </div>
        </div>
      </section>

      <section id="project" className="bg-[#232323] text-white py-24">
        <ProjectsSection />
      </section>

      <section id="activity" className="bg-[#232323] text-white py-24">
        <BlogSection />
      </section>
    </main>
  );
}
