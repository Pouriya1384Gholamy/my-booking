import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  FaCheckCircle,
  FaFire,
} from "react-icons/fa";

/* ============================================================
   🧭 آیتم‌های ناوبری
   ============================================================ */

const NAV_ITEMS = [
  {
    id: "home",
    label: "خانه",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "cards",
    label: "کارت‌ها",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: "add",
    label: "افزودن",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    id: "transactions",
    label: "تراکنش‌ها",
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "پروفایل",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

/* ============================================================
   🧭 کامپوننت Navigation — با Portal مستقیم توی <body>
   ============================================================ */

function Navigation() {
  const [activeTab, setActiveTab] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navContent = (
    <nav
      className="
        fixed left-1/2 -translate-x-1/2
        bottom-4
        w-[calc(100%-2.5rem)] max-w-[460px]
        flex items-center justify-between
        h-20
        rounded-[20px]
        bg-white dark:bg-[#2A2A2A]
        px-[15px]
        shadow-[0_10px_25px_rgba(0,0,0,0.15)]
        dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
        transition-colors duration-500
        z-[9999]
      "
      dir="rtl"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="
              group relative flex flex-1
              h-full flex-col items-center justify-center
              pt-2.5 cursor-pointer transition-all duration-300
            "
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            {/* ICON WRAPPER */}
            <div
              className={`
                relative z-[2]
                flex h-[45px] w-[45px]
                items-center justify-center rounded-full
                transition-all duration-[400ms]
                ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                ${
                  isActive
                    ? "bg-[#4a2eb2] dark:bg-[#C9A87C] text-white -translate-y-7 shadow-[0_5px_15px_rgba(74,46,178,0.4)] dark:shadow-[0_5px_15px_rgba(201,168,124,0.4)]"
                    : "text-[#8b8b8b] dark:text-white/40 group-hover:text-[#4a2eb2] dark:group-hover:text-[#C9A87C]"
                }
              `}
            >
              {isActive && (
                <span
                  className="
                    absolute -inset-1 rounded-full
                    bg-white dark:bg-[#2A2A2A] -z-10
                    shadow-[0_4px_10px_rgba(0,0,0,0.05)]
                    dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)]
                  "
                />
              )}

              <span
                className="
                  [&>svg]:h-6 [&>svg]:w-6
                  [&>svg]:fill-none
                  [&>svg]:stroke-current
                  [&>svg]:stroke-2
                  [&>svg]:[stroke-linecap:round]
                  [&>svg]:[stroke-linejoin:round]
                  [&>svg]:transition-all [&>svg]:duration-300
                "
              >
                {item.icon}
              </span>
            </div>

            {/* TEXT */}
            <span
              className={`
                mt-[5px] text-[11px] font-semibold transition-all duration-300
                ${
                  isActive
                    ? "text-[#2d2d2d] dark:text-[#F4F0E8] font-bold -translate-y-2.5 opacity-100"
                    : "text-[#8b8b8b] dark:text-white/40 opacity-80"
                }
              `}
            >
              {item.label}
            </span>

            {/* INDICATOR */}
            <span
              className={`
                mt-1 h-[3px] w-5 rounded-[10px]
                bg-[#4a2eb2] dark:bg-[#C9A87C]
                transition-all duration-300
                ${
                  isActive
                    ? "opacity-100 scale-x-100 -translate-y-2.5"
                    : "opacity-0 scale-x-0"
                }
              `}
            />
          </button>
        );
      })}
    </nav>
  );

  /* ✅ رندر مستقیم توی <body> با Portal */
  if (!mounted) return null;
  return createPortal(navContent, document.body);
}

/* ============================================================
   🏠 کامپوننت اصلی Header
   ============================================================ */

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

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
          className="
            relative overflow-hidden
            rounded-b-[32px]
            sm:rounded-b-[42px]
            bg-gradient-to-br
            from-[#FDF6F0]
            via-[#FAEDE6]
            to-[#F5DCD5]
            dark:from-[#1F1F1F]
            dark:via-[#252525]
            dark:to-[#2A2A2A]
            px-4 pt-5 pb-24
            text-[#5D3A3A]
            dark:text-[#F4F0E8]
            transition-colors duration-500
            sm:px-6 sm:pt-7 sm:pb-28
            md:px-10 md:pb-32
            lg:px-16
          "
        >
          {/* ================= BACKGROUND DECORATIONS ================= */}

          <div
            className="
              pointer-events-none
              absolute -right-28 -top-28
              h-64 w-64
              rounded-full
              bg-[#E8B4B8]/20
              dark:bg-[#C9A87C]/10
              blur-3xl
              sm:h-80 sm:w-80
            "
          />

          <div
            className="
              pointer-events-none
              absolute -left-24 top-40
              h-56 w-56
              rounded-full
              bg-[#C9A87C]/10
              dark:bg-[#E8B4B8]/5
              blur-3xl
              sm:h-72 sm:w-72
            "
          />

          <div
            className="
              pointer-events-none
              absolute -right-16 -top-16
              h-48 w-48
              rounded-full
              border border-[#C9A87C]/25
              dark:border-[#C9A87C]/15
              sm:h-64 sm:w-64
            "
          />

          <div
            className="
              pointer-events-none
              absolute -right-6 -top-6
              h-28 w-28
              rounded-full
              border border-[#C9A87C]/15
              dark:border-[#C9A87C]/10
              sm:h-40 sm:w-40
            "
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            {/* ================= TOP BAR ================= */}

            <div
              className="
                mb-5 sm:mb-6
                flex items-center justify-between
                border-b
                border-[#5D3A3A]/8
                dark:border-white/10
                pb-4 sm:pb-5
                transition-colors duration-500
              "
              dir="rtl"
            >
              {/* LEFT ACTIONS */}

              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* NOTIFICATION */}

                <button
                  className="
                    relative
                    flex h-9 w-9 sm:h-10 sm:w-10
                    items-center justify-center
                    rounded-full
                    border border-[#5D3A3A]/10
                    dark:border-white/10
                    bg-white/70
                    dark:bg-white/5
                    text-[#5D3A3A]
                    dark:text-[#F4F0E8]
                    shadow-sm
                    transition
                    hover:border-[#C9A87C]/50
                    hover:text-[#C9A87C]
                    hover:shadow-md
                    active:scale-95
                  "
                  aria-label="اعلان‌ها"
                >
                  <FaBell className="text-[10px] sm:text-xs" />

                  <span
                    className="
                      absolute
                      right-1.5 top-1.5
                      sm:right-2 sm:top-2
                      h-1.5 w-1.5
                      rounded-full
                      bg-[#E8B4B8]
                      ring-2
                      ring-[#FDF6F0]
                      dark:ring-[#1F1F1F]
                    "
                  />
                </button>

                {/* FAVORITE */}

                <button
                  className="
                    flex h-9 w-9 sm:h-10 sm:w-10
                    items-center justify-center
                    rounded-full
                    border border-[#5D3A3A]/10
                    dark:border-white/10
                    bg-white/70
                    dark:bg-white/5
                    text-[#5D3A3A]
                    dark:text-[#F4F0E8]
                    shadow-sm
                    transition
                    hover:border-[#E8B4B8]/50
                    hover:text-[#E8B4B8]
                    hover:shadow-md
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
                    relative
                    flex h-9 w-9 sm:h-10 sm:w-10
                    items-center justify-center
                    overflow-hidden
                    rounded-full
                    border border-[#C9A87C]/30
                    dark:border-[#C9A87C]/40
                    bg-gradient-to-br
                    from-[#FDF6F0]
                    to-[#F5DCD5]
                    dark:from-[#2A2A2A]
                    dark:to-[#1F1F1F]
                    text-[#C9A87C]
                    shadow-sm
                    transition-all duration-500
                    hover:border-[#C9A87C]/70
                    hover:shadow-md
                    active:scale-95
                  "
                >
                  <FaSun
                    className={`
                      absolute
                      text-xs sm:text-sm
                      text-[#C9A87C]
                      transition-all duration-500
                      ${
                        darkMode
                          ? "rotate-90 scale-0 opacity-0"
                          : "rotate-0 scale-100 opacity-100"
                      }
                    `}
                  />

                  <FaMoon
                    className={`
                      absolute
                      text-xs sm:text-sm
                      text-[#E8B4B8]
                      transition-all duration-500
                      ${
                        darkMode
                          ? "rotate-0 scale-100 opacity-100"
                          : "-rotate-90 scale-0 opacity-0"
                      }
                    `}
                  />
                </button>
              </div>

              {/* BRAND */}

              <div className="text-center">
                <p
                  className="
                    font-serif
                    text-base sm:text-lg
                    tracking-[0.12em]
                    text-[#5D3A3A]
                    dark:text-[#F4F0E8]
                    transition-colors duration-500
                  "
                >
                  MAHOUR
                </p>

                <p
                  className="
                    mt-0.5
                    text-[7px] sm:text-[8px]
                    tracking-[0.35em]
                    text-[#C9A87C]
                  "
                >
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
                  bg-white/60
                  dark:bg-white/5
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
                flex items-center
                gap-2.5 sm:gap-3
                rounded-[20px]
                sm:rounded-[24px]
                border border-white/60
                dark:border-white/10
                bg-white/70
                dark:bg-white/5
                p-2.5 sm:p-3
                shadow-[0_8px_30px_rgba(201,168,124,0.12)]
                dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                backdrop-blur-md
                transition-colors duration-500
              "
              dir="rtl"
            >
              {/* AVATAR */}

              <div className="relative shrink-0">
                <div
                  className="
                    rounded-[14px]
                    sm:rounded-[18px]
                    bg-gradient-to-br
                    from-[#E8B4B8]
                    to-[#C9A87C]
                    p-[2px]
                  "
                >
                  <img
                    src="https://i.pravatar.cc/150?img=1"
                    alt="آواتار"
                    className="
                      h-11 w-11
                      sm:h-14 sm:w-14
                      md:h-16 md:w-16
                      rounded-[12px]
                      sm:rounded-[16px]
                      object-cover
                    "
                  />
                </div>

                <span
                  className="
                    absolute
                    -bottom-0.5 -left-0.5
                    sm:-bottom-1 sm:-left-1
                    h-3.5 w-3.5
                    sm:h-4 sm:w-4
                    rounded-full
                    border-2
                    border-white
                    dark:border-[#1F1F1F]
                    bg-[#9DB89C]
                  "
                />
              </div>

              {/* PROFILE TEXT */}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h2
                    className="
                      text-sm sm:text-base md:text-lg
                      font-bold
                      text-[#5D3A3A]
                      dark:text-[#F4F0E8]
                      transition-colors duration-500
                    "
                  >
                    سلام، مریم
                  </h2>

                  <FaHeart className="text-[10px] sm:text-xs text-[#E8B4B8]" />
                </div>

                <p
                  className="
                    mt-0.5 sm:mt-1
                    truncate
                    text-[10px] sm:text-xs md:text-sm
                    text-[#8B6F6F]
                    dark:text-white/50
                    transition-colors duration-500
                  "
                >
                  برای یک تجربه زیبایی جدید آماده‌ای؟
                </p>
              </div>

              {/* PROFILE BUTTON */}

              <button
                className="
                  hidden sm:flex
                  shrink-0
                  items-center
                  gap-1.5
                  rounded-xl
                  border border-[#C9A87C]/30
                  bg-white/50
                  dark:bg-white/5
                  px-2.5 sm:px-3
                  py-1.5 sm:py-2
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
                grid
                gap-6 sm:gap-7
                md:grid-cols-[1fr_290px]
                md:items-center
                md:gap-8
                lg:grid-cols-[1fr_340px]
              "
              dir="rtl"
            >
              {/* TEXT + SEARCH */}

              <div>
                <p
                  className="
                    mb-2.5 sm:mb-3
                    flex items-center gap-2
                    text-[8px] sm:text-[9px]
                    font-medium
                    tracking-[0.22em]
                    text-[#C9A87C]
                  "
                >
                  <span className="h-px w-5 sm:w-7 bg-[#C9A87C]" />
                  BEAUTY EXPERIENCE
                </p>

                <p
                  className="
                    mt-3 sm:mt-4
                    max-w-lg
                    text-[11px]
                    sm:text-xs
                    md:text-sm
                    leading-5
                    sm:leading-6
                    md:leading-7
                    text-[#8B6F6F]
                    dark:text-white/50
                    transition-colors duration-500
                  "
                >
                  خدمات مورد علاقه‌ات را پیدا کن، متخصص مورد نظرت را انتخاب کن و
                  وقتت را به راحتی رزرو کن.
                </p>

                {/* SEARCH */}

                <div className="mt-5 sm:mt-6 flex gap-2 sm:gap-2.5">
                  <div
                    className="
                      group
                      flex min-h-[46px]
                      sm:min-h-[52px]
                      flex-1
                      items-center
                      gap-2 sm:gap-3
                      rounded-2xl
                      border border-[#5D3A3A]/8
                      dark:border-white/10
                      bg-white
                      dark:bg-[#2A2A2A]
                      px-3 sm:px-4
                      shadow-[0_10px_30px_rgba(201,168,124,0.15)]
                      dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                      transition-colors duration-500
                      focus-within:ring-4
                      focus-within:ring-[#E8B4B8]/20
                    "
                  >
                    <FaSearch
                      className="
                        shrink-0
                        text-xs sm:text-sm
                        text-[#C9A87C]
                        transition
                        group-focus-within:scale-110
                      "
                    />

                    <input
                      type="text"
                      placeholder="جستجو در خدمات سالن..."
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        text-right
                        text-xs sm:text-sm
                        text-[#5D3A3A]
                        dark:text-[#F4F0E8]
                        outline-none
                        placeholder:text-[#B8A8A8]
                        dark:placeholder:text-white/30
                        transition-colors duration-500
                      "
                    />
                  </div>

                  {/* FILTER BUTTON */}

                  <button
                    className="
                      flex
                      h-[46px] w-[46px]
                      sm:h-[52px] sm:w-[52px]
                      lg:w-14
                      shrink-0
                      items-center justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-[#C9A87C]
                      to-[#B8956A]
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

              {/* ================= BEAUTY DASHBOARD ================= */}

              <BeautyDashboardCard />
            </div>
          </div>

          {/* ================= BOTTOM CURVE ================= */}

          <div
            className="
              absolute
              bottom-[-1px]
              left-[-2%]
              h-8 sm:h-10 md:h-12
              w-[104%]
              rounded-[50%_50%_0_0]
              bg-[#FDF6F0]
              dark:bg-[#1A1A1A]
              transition-colors duration-500
            "
          />
        </div>
      </header>

      {/* ==================================================
          ✅ Navigation — با Portal مستقیم توی <body>
         ================================================== */}
      <Navigation />

      {/* 👇 فضای خالی زیر محتوا، چون نوار fixed روی محتوا شناوره */}
      <div className="h-28" aria-hidden="true" />
    </>
  );
}

/* ============================================================
   ✨ BEAUTY DASHBOARD CARD — تب‌دار
   ============================================================ */

function BeautyDashboardCard() {
  const hasNextBooking = false;

  const [activeTab, setActiveTab] = useState("today");

  return (
    <div
      className="
        w-full
        rounded-[20px]
        sm:rounded-[24px]
        md:rounded-[30px]
        border border-white/60
        dark:border-white/10
        bg-white/80
        dark:bg-[#2A2A2A]/80
        p-3.5
        sm:p-4
        md:p-5
        shadow-[0_20px_50px_rgba(201,168,124,0.18)]
        dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
        backdrop-blur-md
        transition-colors duration-500
      "
      dir="rtl"
    >
      {/* CARD HEADER */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <div>
          <p className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#C9A87C]">
            YOUR BEAUTY SPACE
          </p>
          <h3 className="mt-1 text-xs sm:text-sm font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            فضای زیبایی تو
          </h3>
        </div>

        <div
          className="
            flex h-8 w-8 sm:h-9 sm:w-9
            items-center justify-center
            rounded-xl
            bg-[#C9A87C]/10
            text-[#C9A87C]
          "
        >
          <FaHeart className="text-[10px] sm:text-xs" />
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 rounded-2xl bg-[#FDF6F0]/60 dark:bg-white/5 p-1">
        <DashboardTab
          active={activeTab === "today"}
          onClick={() => setActiveTab("today")}
          icon={<FaClock className="text-[9px] sm:text-[10px]" />}
          label="امروز"
        />
        <DashboardTab
          active={activeTab === "status"}
          onClick={() => setActiveTab("status")}
          icon={<FaHeart className="text-[9px] sm:text-[10px]" />}
          label="وضعیت"
        />
        <DashboardTab
          active={activeTab === "trending"}
          onClick={() => setActiveTab("trending")}
          icon={<FaFire className="text-[9px] sm:text-[10px]" />}
          label="ترند"
        />
      </div>

      {/* TAB CONTENT */}
      <div className="mt-3.5 sm:mt-4">
        {activeTab === "today" && <TodayTab hasNextBooking={hasNextBooking} />}
        {activeTab === "status" && <StatusTab />}
        {activeTab === "trending" && <TrendingTab />}
      </div>
    </div>
  );
}

/* ============================================================
   🔘 DASHBOARD TAB BUTTON
   ============================================================ */

function DashboardTab({ active, onClick, icon, label }) {
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
   📅 TAB 1 — امروز در ماهور
   ============================================================ */

function TodayTab({ hasNextBooking }) {
  return (
    <div className="animate-slideIn">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] sm:text-[9px] tracking-[0.18em] text-[#C9A87C]">
            TODAY AT MAHOUR
          </p>
          <h4 className="mt-1 text-[10px] sm:text-xs font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            امروز در ماهور
          </h4>
        </div>
        <span className="text-[8px] text-[#8B6F6F] dark:text-white/40">
          وضعیت امروز
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        <DashboardStat value="۳۴" label="نوبت آزاد" />
        <DashboardStat value="۱۲" label="متخصص فعال" />
        <DashboardStat value="۸" label="خدمت ویژه" />
      </div>

      <div
        className="
          mt-3 rounded-2xl
          bg-gradient-to-br
          from-[#FDF6F0] to-[#F5DCD5]
          dark:from-white/5 dark:to-white/[0.02]
          p-3 sm:p-3.5
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="
                flex h-9 w-9 sm:h-10 sm:w-10 shrink-0
                items-center justify-center rounded-xl
                bg-white/80 dark:bg-white/10 text-[#C9A87C]
              "
            >
              <FaClock className="text-xs sm:text-sm" />
            </div>

            <div>
              <p className="text-[8px] sm:text-[9px] text-[#8B6F6F] dark:text-white/40">
                {hasNextBooking ? "رزرو بعدی شما" : "رزرو بعدی"}
              </p>
              <h4 className="mt-0.5 text-[10px] sm:text-xs font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
                {hasNextBooking ? "میکاپ و شینیون" : "هنوز رزروی نداری"}
              </h4>
            </div>
          </div>

          <span
            className="
              rounded-full bg-[#9DB89C]/15
              px-2 py-1 text-[7px] sm:text-[8px]
              font-medium text-[#6B8A6A]
            "
          >
            {hasNextBooking ? "تأیید شده" : "آماده‌ای؟"}
          </span>
        </div>

        {hasNextBooking ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/60 dark:bg-white/5 px-2.5 py-2">
              <p className="text-[7px] text-[#8B6F6F] dark:text-white/40">
                تاریخ
              </p>
              <p className="mt-0.5 text-[9px] font-medium text-[#5D3A3A] dark:text-[#F4F0E8]">
                شنبه، ۲۵ مهر
              </p>
            </div>
            <div className="rounded-xl bg-white/60 dark:bg-white/5 px-2.5 py-2">
              <p className="text-[7px] text-[#8B6F6F] dark:text-white/40">
                ساعت
              </p>
              <p className="mt-0.5 text-[9px] font-medium text-[#5D3A3A] dark:text-[#F4F0E8]">
                ۱۸:۳۰
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-[8px] sm:text-[9px] leading-4 text-[#8B6F6F] dark:text-white/40">
              وقتشه یه تجربه جدید برای خودت انتخاب کنی ✨
            </p>
            <button
              className="
                mt-2.5 flex w-full items-center justify-between
                rounded-xl
                bg-gradient-to-br from-[#C9A87C] to-[#B8956A]
                px-3 py-2.5
                text-[9px] sm:text-[10px] font-medium text-white
                shadow-[0_8px_20px_rgba(201,168,124,0.25)]
                transition
                hover:-translate-y-0.5
                hover:shadow-[0_12px_25px_rgba(201,168,124,0.4)]
                active:scale-[0.98]
              "
            >
              <span>اولین رزرو من</span>
              <FaChevronLeft className="text-[8px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   💚 TAB 2 — وضعیت زیبایی تو
   ============================================================ */

function StatusTab() {
  return (
    <div className="animate-slideIn">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] sm:text-[9px] tracking-[0.18em] text-[#C9A87C]">
            BEAUTY STATUS
          </p>
          <h4 className="mt-1 text-[10px] sm:text-xs font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            وضعیت زیبایی تو
          </h4>
        </div>
        <span className="text-[9px] font-bold text-[#6B8A6A]">عالی ✨</span>
      </div>

      <div
        className="
          mt-3 flex items-center gap-3
          rounded-2xl
          border border-[#9DB89C]/20
          bg-gradient-to-br from-[#9DB89C]/10 to-[#9DB89C]/5
          p-3
        "
      >
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center rounded-xl
            bg-[#9DB89C]/20 text-[#6B8A6A]
          "
        >
          <FaCheckCircle className="text-sm" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] sm:text-[10px] font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            همه چیز مرتبه!
          </p>
          <p className="mt-0.5 text-[8px] sm:text-[9px] text-[#8B6F6F] dark:text-white/40">
            طبق برنامه‌ی زیبایی‌ات پیش می‌ری
          </p>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#FDF6F0] dark:bg-white/5 px-2.5 py-2">
          <p className="text-[7px] text-[#8B6F6F] dark:text-white/40">
            آخرین بازدید
          </p>
          <p className="mt-0.5 text-[9px] font-medium text-[#5D3A3A] dark:text-[#F4F0E8]">
            ۱۲ روز پیش
          </p>
        </div>
        <div className="rounded-xl bg-[#FDF6F0] dark:bg-white/5 px-2.5 py-2">
          <p className="text-[7px] text-[#8B6F6F] dark:text-white/40">
            پیشنهاد امروز
          </p>
          <p className="mt-0.5 text-[9px] font-medium text-[#C9A87C]">
            فیشیال + آبرسانی
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <span className="text-[8px] sm:text-[9px] text-[#8B6F6F] dark:text-white/40">
            پیشرفت برنامه‌ی ماهانه
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold text-[#C9A87C]">
            ۷۵٪
          </span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#FDF6F0] dark:bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#C9A87C] to-[#E8B4B8] transition-all duration-700"
            style={{ width: "75%" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   🔥 TAB 3 — خدمات ترند
   ============================================================ */

function TrendingTab() {
  return (
    <div className="animate-slideIn">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] sm:text-[9px] tracking-[0.18em] text-[#C9A87C]">
            TRENDING
          </p>
          <h4 className="mt-1 text-[10px] sm:text-xs font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            خدمات ترند این هفته
          </h4>
        </div>
        <span className="text-[8px] text-[#C9A87C]">محبوب‌ترین‌ها</span>
      </div>

      <div className="mt-2.5 space-y-2">
        <TrendingService
          icon={<FaSpa />}
          title="فیشیال و آبرسانی"
          bookings="۴۸ رزرو"
          rank={1}
        />
        <TrendingService
          icon={<FaPaintBrush />}
          title="میکاپ لایت"
          bookings="۳۶ رزرو"
          rank={2}
        />
        <TrendingService
          icon={<FaCut />}
          title="رنگ و مش"
          bookings="۲۹ رزرو"
          rank={3}
        />
      </div>
    </div>
  );
}

/* ============================================================
   📊 DASHBOARD STAT
   ============================================================ */

function DashboardStat({ value, label }) {
  return (
    <div
      className="
        flex flex-col items-center
        rounded-xl
        bg-[#FDF6F0]
        dark:bg-white/5
        py-2
      "
    >
      <span
        className="
          font-serif
          text-xs sm:text-sm
          font-bold
          text-[#5D3A3A]
          dark:text-[#F4F0E8]
        "
      >
        {value}
      </span>

      <span
        className="
          mt-0.5
          text-[7px] sm:text-[8px]
          text-[#8B6F6F]
          dark:text-white/40
        "
      >
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   🔥 TRENDING SERVICE
   ============================================================ */

function TrendingService({ icon, title, bookings, rank }) {
  const rankColors = {
    1: "bg-gradient-to-br from-[#C9A87C] to-[#B8956A] text-white",
    2: "bg-gradient-to-br from-[#E8B4B8] to-[#C9A87C] text-white",
    3: "bg-gradient-to-br from-[#B8A8A8] to-[#8B6F6F] text-white",
  };

  return (
    <div
      className="
        flex items-center gap-2.5
        rounded-xl
        bg-[#FDF6F0]/70
        dark:bg-white/5
        px-2.5 py-2
        transition
        hover:bg-[#C9A87C]/10
        hover:translate-x-[-2px]
      "
    >
      <div
        className="
          flex h-8 w-8 shrink-0
          items-center justify-center
          rounded-lg
          bg-white dark:bg-white/10
          text-[#C9A87C] shadow-sm
        "
      >
        <span className="text-[10px]">{icon}</span>
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            truncate
            text-[9px] sm:text-[10px]
            font-medium
            text-[#5D3A3A]
            dark:text-[#F4F0E8]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5
            text-[7px] sm:text-[8px]
            text-[#8B6F6F]
            dark:text-white/40
          "
        >
          این هفته {bookings}
        </p>
      </div>

      <div
        className={`
          flex h-5 w-5 shrink-0
          items-center justify-center
          rounded-full text-[8px] font-bold
          shadow-sm
          ${rankColors[rank] || "bg-[#C9A87C]/20 text-[#C9A87C]"}
        `}
      >
        {rank}
      </div>
    </div>
  );
}

export default Header;