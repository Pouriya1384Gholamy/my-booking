import React from "react";
import {
  FaHeart,
  FaBell,
  FaMoon,
  FaSun,
  FaChevronLeft,
} from "react-icons/fa";

export default function Header({ darkMode, onToggleTheme }) {
  return (
    <>
      {/* ============ TOP BAR ============ */}
      <div
        className="mb-5 sm:mb-6 flex items-center justify-between border-b border-[#5D3A3A]/8 dark:border-white/10 pb-4 sm:pb-5 transition-colors duration-500"
        dir="rtl"
      >
        {/* LEFT ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#5D3A3A]/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-[#5D3A3A] dark:text-[#F4F0E8] shadow-sm transition hover:border-[#C9A87C]/50 hover:text-[#C9A87C] hover:shadow-md active:scale-95"
            aria-label="اعلان‌ها"
          >
            <FaBell className="text-[10px] sm:text-xs" />
            <span className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 h-1.5 w-1.5 rounded-full bg-[#E8B4B8] ring-2 ring-[#FDF6F0] dark:ring-[#1F1F1F]" />
          </button>

          <button
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#5D3A3A]/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-[#5D3A3A] dark:text-[#F4F0E8] shadow-sm transition hover:border-[#E8B4B8]/50 hover:text-[#E8B4B8] hover:shadow-md active:scale-95"
            aria-label="علاقه‌مندی‌ها"
          >
            <FaHeart className="text-[10px] sm:text-xs" />
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="تغییر تم"
            className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center overflow-hidden rounded-full border border-[#C9A87C]/30 dark:border-[#C9A87C]/40 bg-gradient-to-br from-[#FDF6F0] to-[#F5DCD5] dark:from-[#2A2A2A] dark:to-[#1F1F1F] text-[#C9A87C] shadow-sm transition-all duration-500 hover:border-[#C9A87C]/70 hover:shadow-md active:scale-95"
          >
            <FaSun
              className={`absolute text-xs sm:text-sm text-[#C9A87C] transition-all duration-500 ${
                darkMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <FaMoon
              className={`absolute text-xs sm:text-sm text-[#E8B4B8] transition-all duration-500 ${
                darkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </button>
        </div>

        {/* BRAND */}
        <div className="text-center">
          <p className="font-serif text-base sm:text-lg tracking-[0.12em] text-[#5D3A3A] dark:text-[#F4F0E8] transition-colors duration-500">
            MAHOUR
          </p>
          <p className="mt-0.5 text-[7px] sm:text-[8px] tracking-[0.35em] text-[#C9A87C]">
            BEAUTY STUDIO
          </p>
        </div>

        {/* LOGO */}
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#C9A87C]/50 bg-white/60 dark:bg-white/5 text-[#C9A87C] shadow-sm transition-colors duration-500">
          <span className="font-serif text-base sm:text-lg">M</span>
        </div>
      </div>

      {/* ============ PROFILE BAR ============ */}
      <div
        className="mb-5 sm:mb-7 flex items-center gap-2.5 sm:gap-3 rounded-[20px] sm:rounded-[24px] border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 p-2.5 sm:p-3 shadow-[0_8px_30px_rgba(201,168,124,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md transition-colors duration-500"
        dir="rtl"
      >
        <div className="relative shrink-0">
          <div className="rounded-[14px] sm:rounded-[18px] bg-gradient-to-br from-[#E8B4B8] to-[#C9A87C] p-[2px]">
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt="آواتار"
              className="h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-[12px] sm:rounded-[16px] object-cover"
            />
          </div>
          <span className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-white dark:border-[#1F1F1F] bg-[#9DB89C]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#5D3A3A] dark:text-[#F4F0E8] transition-colors duration-500">
              سلام، مریم
            </h2>
            <FaHeart className="text-[10px] sm:text-xs text-[#E8B4B8]" />
          </div>
          <p className="mt-0.5 sm:mt-1 truncate text-[10px] sm:text-xs md:text-sm text-[#8B6F6F] dark:text-white/50 transition-colors duration-500">
            برای یک تجربه زیبایی جدید آماده‌ای؟
          </p>
        </div>

        <button className="hidden sm:flex shrink-0 items-center gap-1.5 rounded-xl border border-[#C9A87C]/30 bg-white/50 dark:bg-white/5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] text-[#C9A87C] transition hover:bg-[#C9A87C]/10">
          پروفایل
          <FaChevronLeft className="text-[7px] sm:text-[8px]" />
        </button>
      </div>
    </>
  );
}