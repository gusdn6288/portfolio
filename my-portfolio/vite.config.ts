// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 리포가 my-portfolio라면:
  base: "/my-portfolio/",
});
