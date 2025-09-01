import React, { useEffect, useState } from "react";
import { smoothScrollTo } from "../utils/smoothScroll";

const sections = ["home", "about", "project", "activity"];

export default function SideNav() {
  const [active, setActive] = useState("home");
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(id);
            setOnDark(id !== "home"); // home일 땐 밝은색, 그 외엔 dark
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const targetY = el.offsetTop;
    smoothScrollTo(targetY, 750); // 1.5초 동안 천천히 스크롤
  };

  return (
    <aside className="fixed left-6 top-1/3 z-30 hidden md:block">
      <nav
        className={`flex flex-col gap-6 text-4xl font-bold transition-colors duration-300 ${
          onDark ? "text-white" : "text-black/50"
        }`}
      >
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={`transition-opacity duration-300 ${
              active === id ? "opacity-100" : "opacity-20"
            }`}
          >
            {id === "home" && "Home"}
            {id === "about" && "About me"}
            {id === "project" && "Project"}
            {id === "activity" && "Activity"}
          </a>
        ))}
      </nav>
    </aside>
  );
}
