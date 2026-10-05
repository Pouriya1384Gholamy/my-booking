import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaSearch,
  FaSlidersH,
  FaBell,
  FaChevronLeft,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  // بارگذاری اولیه از localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // تاگل تم
  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="bg-[#FDF6F0] dark:bg-[#1A1A1A] transition-colors duration-500">
      {/* ================= MAIN HEADER ================= */}
      <div
        className="
          relative overflow-hidden
          rounded-b-[42px]
          bg-gradient-to-br from-[#FDF6F0] via-[#FAEDE6] to-[#F5DCD5]
          dark:from-[#1F1F1F] dark:via-[#252525] dark:to-[#2A2A2A]
          px-4 pt-5 pb-28
          text-[#5D3A3A] dark:text-[#F4F0E8]
          transition-colors duration-500
          sm:px-6 sm:pt-7 sm:pb-32
          md:px-10
          lg:px-16
        "
      >
        {/* ================= BACKGROUND DECORATIONS ================= */}
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#E8B4B8]/20 dark:bg-[#C9A87C]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#C9A87C]/10 dark:bg-[#E8B4B8]/5 blur-3xl" />

        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#C9A87C]/25 dark:border-[#C9A87C]/15" />
        <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full border border-[#C9A87C]/15 dark:border-[#C9A87C]/10" />

        <div className="pointer-events-none absolute left-[13%] top-[28%] h-1.5 w-1.5 rounded-full bg-[#C9A87C]/70" />
        <div className="pointer-events-none absolute right-[25%] top-[17%] h-2 w-2 rounded-full bg-[#E8B4B8]/80 dark:bg-[#C9A87C]/60" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* ================= TOP BAR ================= */}
          <div
            className="
              mb-6 flex items-center justify-between
              border-b border-[#5D3A3A]/8 dark:border-white/10
              pb-5
              transition-colors duration-500
            "
            dir="rtl"
          >
            {/* LEFT ACTIONS */}
            <div className="flex items-center gap-2">
              <button
                className="
                  relative flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-[#5D3A3A]/10 dark:border-white/10
                  bg-white/70 dark:bg-white/5
                  text-[#5D3A3A] dark:text-[#F4F0E8]
                  shadow-sm
                  transition
                  hover:border-[#C9A87C]/50
                  hover:text-[#C9A87C]
                  hover:shadow-md
                  active:scale-95
                "
                aria-label="اعلان‌ها"
              >
                <FaBell className="text-xs" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E8B4B8] ring-2 ring-[#FDF6F0] dark:ring-[#1F1F1F]" />
              </button>

              <button
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-[#5D3A3A]/10 dark:border-white/10
                  bg-white/70 dark:bg-white/5
                  text-[#5D3A3A] dark:text-[#F4F0E8]
                  shadow-sm
                  transition
                  hover:border-[#E8B4B8]/50
                  hover:text-[#E8B4B8]
                  hover:shadow-md
                  active:scale-95
                "
                aria-label="علاقه‌مندی‌ها"
              >
                <FaHeart className="text-xs" />
              </button>

              {/* 🌙☀️ THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                aria-label="تغییر تم"
                className="
                  relative flex h-10 w-10
                  items-center justify-center
                  overflow-hidden
                  rounded-full
                  border border-[#C9A87C]/30 dark:border-[#C9A87C]/40
                  bg-gradient-to-br from-[#FDF6F0] to-[#F5DCD5]
                  dark:from-[#2A2A2A] dark:to-[#1F1F1F]
                  text-[#C9A87C]
                  shadow-sm
                  transition-all duration-500
                  hover:border-[#C9A87C]/70
                  hover:shadow-md
                  active:scale-95
                "
              >
                {/* آیکون خورشید */}
                <FaSun
                  className={`
                    absolute text-sm text-[#C9A87C]
                    transition-all duration-500
                    ${darkMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
                  `}
                />
                {/* آیکون ماه */}
                <FaMoon
                  className={`
                    absolute text-sm text-[#E8B4B8]
                    transition-all duration-500
                    ${darkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
                  `}
                />
              </button>
            </div>

            {/* BRAND */}
            <div className="text-center">
              <p className="font-serif text-lg tracking-[0.12em] text-[#5D3A3A] dark:text-[#F4F0E8] transition-colors duration-500">
                MAHOUR
              </p>
              <p className="mt-0.5 text-[8px] tracking-[0.35em] text-[#C9A87C]">
                BEAUTY STUDIO
              </p>
            </div>

            {/* LOGO */}
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border border-[#C9A87C]/50
                bg-white/60 dark:bg-white/5
                text-[#C9A87C]
                shadow-sm
                transition-colors duration-500
              "
            >
              <span className="font-serif text-lg">M</span>
            </div>
          </div>

          {/* ================= PROFILE ================= */}
          <div
            className="
              mb-7
              flex items-center gap-3
              rounded-[24px]
              border border-white/60 dark:border-white/10
              bg-white/70 dark:bg-white/5
              p-3
              shadow-[0_8px_30px_rgba(201,168,124,0.12)]
              dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              backdrop-blur-md
              transition-colors duration-500
            "
            dir="rtl"
          >
            <div className="relative shrink-0">
              <div className="rounded-[18px] bg-gradient-to-br from-[#E8B4B8] to-[#C9A87C] p-[2px]">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="آواتار"
                  className="h-14 w-14 rounded-[16px] object-cover sm:h-16 sm:w-16"
                />
              </div>
              <span className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full border-2 border-white dark:border-[#1F1F1F] bg-[#9DB89C] transition-colors duration-500" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-[#5D3A3A] dark:text-[#F4F0E8] sm:text-lg transition-colors duration-500">
                  سلام، مریم
                </h2>
                <FaHeart className="text-xs text-[#E8B4B8]" />
              </div>
              <p className="mt-1 truncate text-xs text-[#8B6F6F] dark:text-white/50 sm:text-sm transition-colors duration-500">
                برای یک تجربه زیبایی جدید آماده‌ای؟
              </p>
            </div>

            <button
              className="
                hidden shrink-0
                items-center gap-1.5
                rounded-xl
                border border-[#C9A87C]/30
                bg-white/50 dark:bg-white/5
                px-3 py-2
                text-[11px]
                text-[#C9A87C]
                transition
                hover:bg-[#C9A87C]/10
                sm:flex
              "
            >
              پروفایل
              <FaChevronLeft className="text-[8px]" />
            </button>
          </div>

          {/* ================= HERO CONTENT ================= */}
          <div
            className="
              grid gap-8
              md:grid-cols-[1fr_270px]
              md:items-center
              lg:grid-cols-[1fr_330px]
            "
            dir="rtl"
          >
            <div>
              <p className="mb-3 flex items-center gap-2 text-[9px] font-medium tracking-[0.22em] text-[#C9A87C]">
                <span className="h-px w-7 bg-[#C9A87C]" />
                BEAUTY EXPERIENCE
              </p>

              <h1 className="max-w-xl font-serif text-3xl leading-[1.45] text-[#5D3A3A] dark:text-[#F4F0E8] sm:text-4xl md:text-5xl transition-colors duration-500">
                زیبایی تو،
                <br />
                <span className="text-[#C9A87C]">انتخاب توست.</span>
              </h1>

              <p className="mt-4 max-w-lg text-xs leading-6 text-[#8B6F6F] dark:text-white/50 sm:text-sm sm:leading-7 transition-colors duration-500">
                خدمات مورد علاقه‌ات را پیدا کن، متخصص مورد نظرت را انتخاب کن و
                وقتت را به راحتی رزرو کن.
              </p>

              {/* ================= SEARCH ================= */}
              <div className="mt-6 flex gap-2.5">
                <div
                  className="
                    group flex min-h-[52px]
                    flex-1 items-center
                    gap-3
                    rounded-2xl
                    border border-[#5D3A3A]/8 dark:border-white/10
                    bg-white dark:bg-[#2A2A2A]
                    px-4
                    shadow-[0_10px_30px_rgba(201,168,124,0.15)]
                    dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                    transition-colors duration-500
                    focus-within:ring-4
                    focus-within:ring-[#E8B4B8]/20
                  "
                >
                  <FaSearch className="shrink-0 text-sm text-[#C9A87C] transition group-focus-within:scale-110" />
                  <input
                    type="text"
                    placeholder="جستجو در خدمات سالن..."
                    className="
                      min-w-0 flex-1
                      bg-transparent
                      text-right text-sm
                      text-[#5D3A3A] dark:text-[#F4F0E8]
                      outline-none
                      placeholder:text-[#B8A8A8] dark:placeholder:text-white/30
                      transition-colors duration-500
                    "
                  />
                </div>

                <button
                  className="
                    flex h-[52px] w-[52px]
                    shrink-0
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br from-[#C9A87C] to-[#B8956A]
                    text-white
                    shadow-[0_10px_25px_rgba(201,168,124,0.4)]
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-[0_14px_30px_rgba(201,168,124,0.5)]
                    active:scale-95
                    sm:w-14
                  "
                  aria-label="فیلترها"
                >
                  <FaSlidersH className="text-sm" />
                </button>
              </div>
            </div>

            {/* ================= DESKTOP PROFILE CARD ================= */}
            <div
              className="
                hidden
                rounded-[30px]
                border border-white/60 dark:border-white/10
                bg-white/80 dark:bg-[#2A2A2A]/80
                p-5
                shadow-[0_20px_50px_rgba(201,168,124,0.18)]
                dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                backdrop-blur-md
                transition-colors duration-500
                md:block
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] tracking-[0.25em] text-[#C9A87C]">
                  YOUR BEAUTY SPACE
                </span>
                <span className="h-2 w-2 rounded-full bg-[#9DB89C]" />
              </div>

              <div className="mt-6 flex items-center gap-3" dir="rtl">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="مریم"
                  className="h-14 w-14 rounded-[17px] object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#5D3A3A] dark:text-[#F4F0E8] transition-colors duration-500">
                    مریم عزیز
                  </h3>
                  <p className="mt-1 text-[10px] text-[#8B6F6F] dark:text-white/40 transition-colors duration-500">
                    آخرین رزرو شما
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-[#5D3A3A]/8 dark:bg-white/10 transition-colors duration-500" />

              <div className="flex items-center justify-between" dir="rtl">
                <span className="text-[10px] text-[#8B6F6F] dark:text-white/40 transition-colors duration-500">
                  وضعیت رزرو
                </span>
                <span className="text-[10px] font-medium text-[#C9A87C]">
                  آماده رزرو
                </span>
              </div>

              <button
                className="
                  mt-4 flex w-full
                  items-center justify-between
                  rounded-xl
                  bg-[#FDF6F0] dark:bg-white/5
                  px-3 py-3
                  text-[10px]
                  text-[#5D3A3A] dark:text-[#F4F0E8]
                  transition
                  hover:bg-[#C9A87C]/15
                  hover:text-[#C9A87C]
                "
                dir="rtl"
              >
                <span>مشاهده پروفایل</span>
                <FaChevronLeft className="text-[8px]" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM CURVE ================= */}
        <div
          className="
            absolute
            bottom-[-1px]
            left-[-2%]
            h-10
            w-[104%]
            rounded-[50%_50%_0_0]
            bg-[#FDF6F0] dark:bg-[#1A1A1A]
            sm:h-12
            transition-colors duration-500
          "
        />
      </div>
    </header>
  );
}

export default Header;