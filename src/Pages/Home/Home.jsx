import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import PopularServices from "./Components/PopularServices";
import BeautyDashboard from "./Components/BeautyDashboard";
import StylistsSlider from "./Components/StylistsSlider";
import Navigation from "./Components/Navigation";

import "./animations.css";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <>
      <header className="bg-[#FDF6F0] dark:bg-[#1A1A1A] transition-colors duration-500">
        <div
          className="relative overflow-hidden rounded-b-[32px] sm:rounded-b-[42px] bg-gradient-to-br from-[#FDF6F0] via-[#FAEDE6] to-[#F5DCD5] dark:from-[#1F1F1F] dark:via-[#252525] dark:to-[#2A2A2A] px-4 pt-5 pb-24 text-[#5D3A3A] dark:text-[#F4F0E8] transition-colors duration-500 sm:px-6 sm:pt-7 sm:pb-28 md:px-10 md:pb-32 lg:px-16"
        >
          {/* BACKGROUND DECORATIONS */}
          <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#E8B4B8]/20 dark:bg-[#C9A87C]/10 blur-3xl sm:h-80 sm:w-80" />
          <div className="pointer-events-none absolute -left-24 top-40 h-56 w-56 rounded-full bg-[#C9A87C]/10 blur-3xl sm:h-72 sm:w-72" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#C9A87C]/25 sm:h-64 sm:w-64" />

          <div className="relative z-10 mx-auto max-w-6xl">
            {/* TOP BAR + PROFILE */}
            <Header darkMode={darkMode} onToggleTheme={toggleTheme} />

            {/* MAIN GRID: خدمات محبوب (با سرچ) + داشبورد */}
            <div
              className="grid gap-6 sm:gap-7 md:grid-cols-[1fr_290px] md:items-start md:gap-8 lg:grid-cols-[1fr_340px]"
              dir="rtl"
            >
              {/* ستون اول (سمت راست در RTL): سرچ + خدمات محبوب */}
              <div className="min-w-0">
                <PopularServices />
              </div>

              {/* ستون دوم (سمت چپ در RTL): داشبورد */}
              <BeautyDashboard />
            </div>

            {/* STYLISTS SLIDER */}
            <StylistsSlider />
          </div>

          {/* BOTTOM CURVE */}
          <div className="absolute bottom-[-1px] left-[-2%] h-8 sm:h-10 md:h-12 w-[104%] rounded-[50%_50%_0_0] bg-[#FDF6F0] dark:bg-[#1A1A1A] transition-colors duration-500" />
        </div>
      </header>

      <Navigation />
      <div className="h-28" aria-hidden="true" />
    </>
  );
}