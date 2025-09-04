import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import FeedbackPage from "./pages/FeedbackPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 기본 포트폴리오 페이지 */}
        <Route path="/" element={<App />} />

        {/* 피드백 페이지 */}
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
