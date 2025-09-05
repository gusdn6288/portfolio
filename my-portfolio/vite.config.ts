/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 로컬 개발시에만 프록시 사용
      // 배포시에는 환경변수 VITE_API_BASE로 실제 백엔드 도메인 사용
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    passWithNoTests: true,
  },
  // 환경변수 타입 정의
  define: {
    __API_BASE__: JSON.stringify(process.env.VITE_API_BASE || ""),
  },
});
