// src/components/Footer.tsx
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#181818] text-gray-400 py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 왼쪽 - 카피라이트 */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} 현우 김. All rights reserved.
        </p>

        {/* 오른쪽 - 링크 */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/gusdn6288"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub 프로필"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
