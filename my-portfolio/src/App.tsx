import Header from "./components/Header";
import FAB from "./components/FAB";
import SideNav from "./components/SideNav";
import AboutSection from "./components/AboutSection";
import CoreSkillsSection from "./components/CoreSkillsSection";
import TechStackSection from "./components/TechStackSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogSection from "./components/BlogSection";

export default function App() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <FAB />
      <SideNav />

      {/* Hero - 밝은 배경 */}
      <section
        id="home"
        className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 bg-[#ECECEC]"
      >
        <h1 className="text-hero text-black/10">Front-End</h1>
        <p className="mt-2 text-subhero text-black/80">
          프론트엔드 개발자{" "}
          <span className="font-extrabold text-black">김현우</span>입니다.
        </p>
      </section>

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

      <section id="project" className="bg-[#232323] text-white  py-24">
        <ProjectsSection />
      </section>

      <section id="activity" className="bg-[#232323] text-white py-24">
        <BlogSection />
      </section>
    </main>
  );
}
