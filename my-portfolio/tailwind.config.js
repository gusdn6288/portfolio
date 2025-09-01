/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // 기본 폰트로 Inter 지정
      },
      colors: {
        canvas: "#ECECEC",
      },
      fontSize: {
        hero: [
          "clamp(3rem, 8vw, 10rem)",
          { lineHeight: "1.05", fontWeight: "800" },
        ],
        subhero: [
          "clamp(1.125rem, 2.4vw, 3rem)",
          { lineHeight: "1.25", fontWeight: "700" },
        ],
      },
      boxShadow: {
        fab: "0 2px 10px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
