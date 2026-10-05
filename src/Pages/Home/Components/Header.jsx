import React, { useEffect, useState, useRef } from "react";
import {
  FaHeart,
  FaSearch,
  FaSlidersH,
  FaBell,
  FaChevronLeft,
  FaMoon,
  FaSun,
  FaClock,
  FaCut,
  FaSpa,
  FaPaintBrush,
} from "react-icons/fa";

function Header() {
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
    <header className="bg-[#FDF6F0] dark:bg-[#1A1A1A] transition-colors duration-500">
      <div
        className="
          relative overflow-hidden
          rounded-b-[32px]
          sm:rounded-b-[42px]
          bg-gradient-to-br from-[#FDF6F0] via-[#FAEDE6] to-[#F5DCD5]
          dark:from-[#1F1F1F] dark:via-[#252525] dark:to-[#2A2A2A]
          px-4 pt-5 pb-24
          text-[#5D3A3A] dark:text-[#F4F0E8]
          transition-colors duration-500
          sm:px-6 sm:pt-7 sm:pb-28
          md:px-10 md:pb-32
          lg:px-16
        "
      >
        {/* ================= BACKGROUND DECORATIONS ================= */}
        <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-[#E8B4B8]/20 dark:bg-[#C9A87C]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-[#C9A87C]/10 dark:bg-[#E8B4B8]/5 blur-3xl" />

        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full border border-[#C9A87C]/25 dark:border-[#C9A87C]/15" />
        <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 sm:h-40 sm:w-40 rounded-full border border-[#C9A87C]/15 dark:border-[#C9A87C]/10" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* ================= TOP BAR ================= */}
          <div
            className="
              mb-5 sm:mb-6
              flex items-center justify-between
              border-b border-[#5D3A3A]/8 dark:border-white/10
              pb-4 sm:pb-5
              transition-colors duration-500
            "
            dir="rtl"
          >
            {/* LEFT ACTIONS */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                className="
                  relative flex h-9 w-9 sm:h-10 sm:w-10
                  items-center justify-center
                  rounded-full
                  border border-[#5D3A3A]/10 dark:border-white/10
                  bg-white/70 dark:bg-white/5
                  text-[#5D3A3A] dark:text-[#F4F0E8]
                  shadow-sm
                  transition
                  hover:border-[#C9A87C]/50 hover:text-[#C9A87C] hover:shadow-md
                  active:scale-95
                "
                aria-label="اعلان‌ها"
              >
                <FaBell className="text-[10px] sm:text-xs" />
                <span className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 h-1.5 w-1.5 rounded-full bg-[#E8B4B8] ring-2 ring-[#FDF6F0] dark:ring-[#1F1F1F]" />
              </button>

              <button
                className="
                  flex h-9 w-9 sm:h-10 sm:w-10
                  items-center justify-center
                  rounded-full
                  border border-[#5D3A3A]/10 dark:border-white/10
                  bg-white/70 dark:bg-white/5
                  text-[#5D3A3A] dark:text-[#F4F0E8]
                  shadow-sm
                  transition
                  hover:border-[#E8B4B8]/50 hover:text-[#E8B4B8] hover:shadow-md
                  active:scale-95
                "
                aria-label="علاقه‌مندی‌ها"
              >
                <FaHeart className="text-[10px] sm:text-xs" />
              </button>

              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                aria-label="تغییر تم"
                className="
                  relative flex h-9 w-9 sm:h-10 sm:w-10
                  items-center justify-center
                  overflow-hidden
                  rounded-full
                  border border-[#C9A87C]/30 dark:border-[#C9A87C]/40
                  bg-gradient-to-br from-[#FDF6F0] to-[#F5DCD5]
                  dark:from-[#2A2A2A] dark:to-[#1F1F1F]
                  text-[#C9A87C]
                  shadow-sm
                  transition-all duration-500
                  hover:border-[#C9A87C]/70 hover:shadow-md
                  active:scale-95
                "
              >
                <FaSun
                  className={`
                    absolute text-xs sm:text-sm text-[#C9A87C]
                    transition-all duration-500
                    ${darkMode ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
                  `}
                />
                <FaMoon
                  className={`
                    absolute text-xs sm:text-sm text-[#E8B4B8]
                    transition-all duration-500
                    ${darkMode ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
                  `}
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
            <div
              className="
                flex h-9 w-9 sm:h-10 sm:w-10
                items-center justify-center
                rounded-full
                border border-[#C9A87C]/50
                bg-white/60 dark:bg-white/5
                text-[#C9A87C]
                shadow-sm
                transition-colors duration-500
              "
            >
              <span className="font-serif text-base sm:text-lg">M</span>
            </div>
          </div>

          {/* ================= PROFILE ================= */}
          <div
            className="
              mb-5 sm:mb-7
              flex items-center gap-2.5 sm:gap-3
              rounded-[20px] sm:rounded-[24px]
              border border-white/60 dark:border-white/10
              bg-white/70 dark:bg-white/5
              p-2.5 sm:p-3
              shadow-[0_8px_30px_rgba(201,168,124,0.12)]
              dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              backdrop-blur-md
              transition-colors duration-500
            "
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
              <span className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-white dark:border-[#1F1F1F] bg-[#9DB89C] transition-colors duration-500" />
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

            <button
              className="
                hidden sm:flex shrink-0
                items-center gap-1.5
                rounded-xl
                border border-[#C9A87C]/30
                bg-white/50 dark:bg-white/5
                px-2.5 sm:px-3 py-1.5 sm:py-2
                text-[10px] sm:text-[11px]
                text-[#C9A87C]
                transition
                hover:bg-[#C9A87C]/10
              "
            >
              پروفایل
              <FaChevronLeft className="text-[7px] sm:text-[8px]" />
            </button>
          </div>

          {/* ================= HERO CONTENT ================= */}
          <div
            className="
              grid gap-6 sm:gap-7
              md:grid-cols-[1fr_290px] md:items-center md:gap-8
              lg:grid-cols-[1fr_340px]
            "
            dir="rtl"
          >
            {/* TEXT + SEARCH */}
            <div>
              <p className="mb-2.5 sm:mb-3 flex items-center gap-2 text-[8px] sm:text-[9px] font-medium tracking-[0.22em] text-[#C9A87C]">
                <span className="h-px w-5 sm:w-7 bg-[#C9A87C]" />
                BEAUTY EXPERIENCE
              </p>

              <p className="mt-3 sm:mt-4 max-w-lg text-[11px] sm:text-xs md:text-sm leading-5 sm:leading-6 md:leading-7 text-[#8B6F6F] dark:text-white/50 transition-colors duration-500">
                خدمات مورد علاقه‌ات را پیدا کن، متخصص مورد نظرت را انتخاب کن و
                وقتت را به راحتی رزرو کن.
              </p>

              {/* SEARCH */}
              <div className="mt-5 sm:mt-6 flex gap-2 sm:gap-2.5">
                <div
                  className="
                    group flex min-h-[46px] sm:min-h-[52px]
                    flex-1 items-center gap-2 sm:gap-3
                    rounded-2xl
                    border border-[#5D3A3A]/8 dark:border-white/10
                    bg-white dark:bg-[#2A2A2A]
                    px-3 sm:px-4
                    shadow-[0_10px_30px_rgba(201,168,124,0.15)]
                    dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                    transition-colors duration-500
                    focus-within:ring-4 focus-within:ring-[#E8B4B8]/20
                  "
                >
                  <FaSearch className="shrink-0 text-xs sm:text-sm text-[#C9A87C] transition group-focus-within:scale-110" />
                  <input
                    type="text"
                    placeholder="جستجو در خدمات سالن..."
                    className="
                      min-w-0 flex-1
                      bg-transparent
                      text-right text-xs sm:text-sm
                      text-[#5D3A3A] dark:text-[#F4F0E8]
                      outline-none
                      placeholder:text-[#B8A8A8] dark:placeholder:text-white/30
                      transition-colors duration-500
                    "
                  />
                </div>

                <button
                  className="
                    flex h-[46px] w-[46px] sm:h-[52px] sm:w-[52px] lg:w-14
                    shrink-0 items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br from-[#C9A87C] to-[#B8956A]
                    text-white
                    shadow-[0_10px_25px_rgba(201,168,124,0.4)]
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-[0_14px_30px_rgba(201,168,124,0.5)]
                    active:scale-95
                  "
                  aria-label="فیلترها"
                >
                  <FaSlidersH className="text-xs sm:text-sm" />
                </button>
              </div>
            </div>

            {/* ============ TABBED CARD - روی همه سایزها ============ */}
            <DesktopTabbedCard />
          </div>
        </div>

        {/* ================= BOTTOM CURVE ================= */}
        <div
          className="
            absolute bottom-[-1px] left-[-2%]
            h-8 sm:h-10 md:h-12
            w-[104%]
            rounded-[50%_50%_0_0]
            bg-[#FDF6F0] dark:bg-[#1A1A1A]
            transition-colors duration-500
          "
        />
      </div>
    </header>
  );
}

/* ============================================================
   🎴 کارت تب‌دار - روی همه سایزها نمایش داده می‌شه
   ============================================================ */

const suggestions = [
  {
    icon: FaSpa,
    title: "ماساژ صورت",
    price: "از ۸۵۰,۰۰۰",
    time: "۴۵ دقیقه",
  },
  {
    icon: FaPaintBrush,
    title: "میکاپ عروس",
    price: "از ۲,۵۰۰,۰۰۰",
    time: "۹۰ دقیقه",
  },
  {
    icon: FaCut,
    title: "رنگ و مش",
    price: "از ۱,۲۰۰,۰۰۰",
    time: "۱۲۰ دقیقه",
  },
];

function DesktopTabbedCard() {
  const [activeTab, setActiveTab] = useState("appointment");

  return (
    <div className="w-full">
      <div
        className="
          rounded-[20px] sm:rounded-[24px] md:rounded-[30px]
          border border-white/60 dark:border-white/10
          bg-white/80 dark:bg-[#2A2A2A]/80
          p-3.5 sm:p-4 md:p-5
          shadow-[0_20px_50px_rgba(201,168,124,0.18)]
          dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
          backdrop-blur-md
          transition-colors duration-500
        "
      >
        {/* Tab Buttons */}
        <div className="mb-3.5 sm:mb-4 md:mb-5 flex gap-1 rounded-2xl bg-[#FDF6F0]/60 dark:bg-white/5 p-1">
          <TabButton
            active={activeTab === "appointment"}
            onClick={() => setActiveTab("appointment")}
            icon={<FaClock className="text-[9px] sm:text-[10px]" />}
            label="نوبت بعدی"
          />
          <TabButton
            active={activeTab === "offer"}
            onClick={() => setActiveTab("offer")}
            icon={<FaHeart className="text-[9px] sm:text-[10px]" />}
            label="پیشنهاد ویژه"
          />
        </div>

        {activeTab === "appointment" ? <AppointmentTab /> : <OfferTab />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-1 items-center justify-center gap-1 sm:gap-1.5
        rounded-xl px-2 sm:px-3 py-1.5 sm:py-2
        text-[9px] sm:text-[10px] font-medium
        transition-all duration-300
        ${
          active
            ? "bg-white dark:bg-[#2A2A2A] text-[#C9A87C] shadow-[0_2px_8px_rgba(201,168,124,0.15)]"
            : "text-[#8B6F6F] dark:text-white/40 hover:text-[#C9A87C]"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}

/* ============================================================
   ⏱ تب نوبت بعدی - تایمر زنده
   ============================================================ */

function AppointmentTab() {
  const TOTAL_SECONDS = 2 * 60 * 60 + 15 * 60 + 30;
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  const progress = 1 - remaining / TOTAL_SECONDS;

  const format = (n) => String(n).padStart(2, "0");

  return (
    <div>
      <div className="flex items-center gap-3 sm:gap-4" dir="rtl">
        <ProgressCircle progress={progress} />

        <div className="flex-1 min-w-0">
          <p className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#C9A87C]">
            نوبت بعدی شما
          </p>
          <h3 className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-bold text-[#5D3A3A] dark:text-[#F4F0E8] truncate">
            رنگ و مش
          </h3>
          <p className="mt-0.5 text-[9px] sm:text-[10px] text-[#8B6F6F] dark:text-white/40">
            با خانم رضایی
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div
        className="mt-3 sm:mt-4 flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl bg-[#FDF6F0] dark:bg-white/5 py-2 sm:py-2.5"
        dir="rtl"
      >
        <TimeBox value={format(hours)} label="ساعت" />
        <span className="text-[#C9A87C] text-xs sm:text-sm">:</span>
        <TimeBox value={format(minutes)} label="دقیقه" />
        <span className="text-[#C9A87C] text-xs sm:text-sm">:</span>
        <TimeBox value={format(seconds)} label="ثانیه" />
      </div>

      <button
        className="
          mt-3 sm:mt-4
          flex w-full items-center justify-between
          rounded-xl
          bg-gradient-to-br from-[#C9A87C] to-[#B8956A]
          px-3 sm:px-4 py-2.5 sm:py-3
          text-[10px] sm:text-[11px] font-medium text-white
          shadow-[0_8px_20px_rgba(201,168,124,0.3)]
          transition
          hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(201,168,124,0.45)]
          active:scale-95
        "
        dir="rtl"
      >
        <span>جزئیات نوبت</span>
        <FaChevronLeft className="text-[8px] sm:text-[9px]" />
      </button>
    </div>
  );
}

function ProgressCircle({ progress }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 60 60">
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke="rgba(201,168,124,0.15)"
          strokeWidth="4"
        />
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-linear"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A87C" />
            <stop offset="100%" stopColor="#E8B4B8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <FaClock className="text-xs sm:text-sm text-[#C9A87C]" />
      </div>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-base sm:text-lg font-bold text-[#5D3A3A] dark:text-[#F4F0E8] tabular-nums">
        {value}
      </span>
      <span className="text-[7px] sm:text-[8px] text-[#8B6F6F] dark:text-white/40">
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   💡 تب پیشنهاد ویژه - اسلایدر خودکار
   ============================================================ */

function OfferTab() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    setIndex(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestions.length);
    }, 4000);
  };

  const current = suggestions[index];
  const Icon = current.icon;

  return (
    <div>
      <div className="flex items-center justify-between" dir="rtl">
        <span className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#C9A87C]">
          پیشنهاد امروز
        </span>
        <span className="flex items-center gap-1 text-[8px] sm:text-[9px] text-[#8B6F6F] dark:text-white/40">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9DB89C]" />
          ظرفیت محدود
        </span>
      </div>

      {/* Slide */}
      <div className="relative mt-3 sm:mt-4 h-20 sm:h-24 overflow-hidden">
        <div
          key={index}
          className="flex h-full items-center gap-2.5 sm:gap-3 rounded-2xl bg-gradient-to-br from-[#FDF6F0] to-[#F5DCD5] dark:from-white/5 dark:to-white/[0.02] p-2.5 sm:p-3 animate-slideIn"
          dir="rtl"
        >
          {/* Icon Circle */}
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 dark:bg-white/10 shadow-[0_4px_12px_rgba(201,168,124,0.15)]">
            <Icon className="text-lg sm:text-xl text-[#C9A87C]" />
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xs sm:text-sm font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
              {current.title}
            </h3>
            <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
              <span className="text-[9px] sm:text-[10px] font-medium text-[#C9A87C]">
                {current.price}
              </span>
              <span className="text-[8px] sm:text-[9px] text-[#8B6F6F] dark:text-white/40">
                • {current.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-1.5">
        {suggestions.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${
                i === index
                  ? "w-5 sm:w-6 bg-gradient-to-r from-[#C9A87C] to-[#E8B4B8]"
                  : "w-1.5 bg-[#C9A87C]/30 hover:bg-[#C9A87C]/50"
              }
            `}
            aria-label={`اسلاید ${i + 1}`}
          />
        ))}
      </div>

      <button
        className="
          mt-3 sm:mt-4
          flex w-full items-center justify-between
          rounded-xl
          bg-[#FDF6F0] dark:bg-white/5
          px-3 sm:px-4 py-2.5 sm:py-3
          text-[10px] sm:text-[11px] font-medium
          text-[#5D3A3A] dark:text-[#F4F0E8]
          transition
          hover:bg-[#C9A87C]/15 hover:text-[#C9A87C]
          active:scale-95
        "
        dir="rtl"
      >
        <span>رزرو کنید</span>
        <FaChevronLeft className="text-[8px] sm:text-[9px]" />
      </button>
    </div>
  );
}

export default Header;