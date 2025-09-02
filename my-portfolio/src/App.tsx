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

      <section id="stack" className="bg-[#232323] text-white py-24">
        <TechStackSection />
      </section>

      <section id="education" className="bg-[#232323] text-white py-24">
        <EducationSection />
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
