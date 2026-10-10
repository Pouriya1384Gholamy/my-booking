import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaRegCommentDots,
  FaPhoneAlt,
  FaVideo,
  FaHistory,
  FaUserFriends,
  FaCheck,
  FaSun,
  FaMoon,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/* ============================================================
   ابزارهای تاریخ شمسی
   ============================================================ */

const toFa = (value) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

const JALALI_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];

const WEEKDAYS = [
  "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه",
  "پنجشنبه", "جمعه", "شنبه",
];

const TIME_SLOTS = [
  // صبح
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  // ظهر و عصر
  "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

const MORNING_SLOTS = TIME_SLOTS.filter((slot) => slot < "12:30");
const EVENING_SLOTS = TIME_SLOTS.filter((slot) => slot >= "12:30");

// هر صفحه‌ی اسلایدر ساعت: ۳ ستون × ۲ ردیف
const SLIDER_PAGE_SIZE = 6;

const jalaliFormatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const getJalaliParts = (date) => {
  const parts = jalaliFormatter.formatToParts(date);
  const get = (type) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
};

// کلید تاریخ میلادی محلی
const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getMonthKey = (date) => {
  const { year, month } = getJalaliParts(date);
  return `${year}-${month}`;
};

/*
  تقویم از یک ماه قبل از ماه جاری شروع می‌شود و تا ۱۱ ماه بعد ادامه دارد.
  - روزهای گذشته ساخته می‌شوند ولی قابل انتخاب نیستند (isPast).
  - امروز با isToday مشخص می‌شود.
*/
function buildCalendar({ pastMonths = 1, futureMonths = 11 } = {}) {
  const now = new Date();
  now.setHours(12, 0, 0, 0);

  const todayKey = getDateKey(now);
  const currentMonthKey = getMonthKey(now);

  // پیدا کردن اولین روز ماه جاری شمسی
  let startOfCurrentMonth = new Date(now);
  while (true) {
    const previous = new Date(startOfCurrentMonth);
    previous.setDate(previous.getDate() - 1);
    if (getMonthKey(previous) !== currentMonthKey) break;
    startOfCurrentMonth = previous;
  }

  // عقب بردن start به اندازه‌ی pastMonths ماه
  let start = new Date(startOfCurrentMonth);
  for (let i = 0; i < pastMonths; i++) {
    let cursor = new Date(start);
    cursor.setDate(cursor.getDate() - 1);
    const prevMonthKey = getMonthKey(cursor);
    while (true) {
      const p = new Date(cursor);
      p.setDate(p.getDate() - 1);
      if (getMonthKey(p) !== prevMonthKey) break;
      cursor = p;
    }
    start = cursor;
  }

  const groups = [];
  const totalDays = (pastMonths + futureMonths + 1) * 31 + 5;

  for (let i = 0; i < totalDays; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    date.setHours(12, 0, 0, 0);

    const { year, month, day } = getJalaliParts(date);
    const monthKey = `${year}-${month}`;
    const key = getDateKey(date);

    let group = groups[groups.length - 1];
    if (!group || group.key !== monthKey) {
      group = {
        key: monthKey,
        name: JALALI_MONTHS[month - 1],
        year,
        days: [],
      };
      groups.push(group);
    }

    group.days.push({
      key,
      date,
      jd: day,
      weekday: WEEKDAYS[date.getDay()],
      monthKey,
      monthName: JALALI_MONTHS[month - 1],
      year,
      isPast: key < todayKey,
      isToday: key === todayKey,
    });
  }

  const months = groups.slice(0, pastMonths + 1 + futureMonths);
  const days = months.flatMap((month) => month.days);

  return { todayKey, months, days };
}

/* ============================================================
   اطلاعات پیش‌فرض آرایشگر
   ============================================================ */

const FALLBACK_STYLIST = {
  name: "سارا احمدی",
  role: "متخصص رنگ و مش",
  rating: 4.9,
  reviews: 240,
  experience: 8,
  clients: "۲٫۷K+",
  price: 150000,
  img: "https://i.pravatar.cc/600?img=5",
};

/* ============================================================
   ✨ نمایش تاریخ انتخابی — رقم‌های غلتان (Odometer)
   با عوض شدن روز، فقط رقمی که تغییر کرده می‌غلتد.
   ============================================================ */

const ANIMATION_CSS = `
  @keyframes rollUp {
    from { transform: translateY(80%); opacity: 0; filter: blur(6px); }
    to   { transform: none; opacity: 1; filter: blur(0); }
  }
  @keyframes rollDown {
    from { transform: translateY(-80%); opacity: 0; filter: blur(6px); }
    to   { transform: none; opacity: 1; filter: blur(0); }
  }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-anim] { animation: none !important; }
  }
`;

function RollingDigit({ char, direction }) {
  return (
    <span className="relative inline-block h-[1.15em] w-[0.62em] overflow-hidden text-center align-top">
      <span
        key={char}
        data-anim
        className="inline-block bg-gradient-to-b from-[#DDBE94] to-[#A47D54] bg-clip-text text-transparent"
        style={{
          animation: `${
            direction === "up" ? "rollUp" : "rollDown"
          } 460ms cubic-bezier(0.22, 1, 0.36, 1) both`,
        }}
      >
        {char}
      </span>
    </span>
  );
}

function DateReadout({ day, direction, relativeLabel }) {
  const digits = toFa(day.jd).split("");

  return (
    <div className="relative mt-5 flex items-center gap-4">
      {/* هاله‌ی نرم پشت عدد */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#C9A87C]/20 blur-2xl" />

      {/* عدد غلتان */}
      <div
        dir="ltr"
        aria-hidden="true"
        className="relative flex text-[64px] font-extrabold leading-none"
      >
        {digits.map((char, i) => (
          <RollingDigit key={i} char={char} direction={direction} />
        ))}
      </div>

      {/* روز هفته و ماه */}
      <div className="relative min-w-0 flex-1">
        <p
          key={day.weekday}
          data-anim
          className="text-sm font-bold text-[#5D3A3A] dark:text-[#F4EDE5]"
          style={{ animation: "fadeSlide 380ms ease-out both" }}
        >
          {day.weekday}
        </p>
        <p
          key={`${day.monthName}-${day.year}`}
          data-anim
          className="mt-1 text-xs text-[#9B8578] dark:text-white/50"
          style={{ animation: "fadeSlide 380ms 60ms ease-out both" }}
        >
          {day.monthName} {toFa(day.year)}
        </p>
      </div>

      {/* برچسب نسبی: امروز / فردا / ... */}
      <span
        key={relativeLabel}
        data-anim
        className="relative shrink-0 rounded-full bg-[#C9A87C]/15 px-3 py-1.5 text-[11px] font-bold text-[#A47D54]"
        style={{ animation: "fadeSlide 380ms 100ms ease-out both" }}
      >
        {relativeLabel}
      </span>

      {/* برای صفحه‌خوان */}
      <p className="sr-only" aria-live="polite">
        {day.weekday} {toFa(day.jd)} {day.monthName} {toFa(day.year)}
      </p>
    </div>
  );
}

/* ============================================================
   کارت روز تقویم
   ============================================================ */

function DayCard({ day, distance, selected, onClick }) {
  const sizeByDistance = {
    0: "h-[86px] w-[58px] sm:w-[64px]",
    1: "h-[70px] w-[48px] sm:w-[52px]",
    2: "h-[58px] w-[40px] sm:w-[44px]",
    3: "h-[48px] w-[34px] sm:w-[38px]",
  };

  const isPast = day.isPast;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPast}
      aria-pressed={selected}
      aria-label={`${day.weekday} ${day.jd} ${day.monthName}`}
      className={`
        relative flex shrink-0 flex-col items-center justify-center
        rounded-[18px] outline-none
        transition-all duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]
        focus-visible:ring-2 focus-visible:ring-[#C9A87C]
        ${sizeByDistance[Math.min(distance, 3)]}
        ${
          selected
            ? "z-10 -translate-y-1 scale-[1.04] bg-gradient-to-b from-[#D8B98F] to-[#B8956A] text-white shadow-[0_12px_28px_rgba(184,149,106,0.38)]"
            : isPast
            ? "bg-[#F5F0EB] text-[#B8AAA0] opacity-40 dark:bg-white/5 dark:text-white/20"
            : distance === 1
            ? "bg-white text-[#654C43] shadow-sm dark:bg-white/10 dark:text-[#F4EDE5]"
            : "bg-[#F8F3EE] text-[#947F72] dark:bg-white/[0.055] dark:text-white/55"
        }
        ${isPast ? "cursor-not-allowed" : "cursor-pointer"}
        ${!selected && !isPast ? "hover:-translate-y-0.5" : ""}
        active:scale-[0.97]
      `}
    >
      <span
        className={`font-bold leading-none ${
          selected ? "text-xl" : distance === 1 ? "text-base" : "text-sm"
        }`}
      >
        {toFa(day.jd)}
      </span>

      <span
        className={`mt-2 whitespace-nowrap leading-none ${
          selected ? "text-[9px] text-white/90" : "text-[8px] opacity-75"
        }`}
      >
        {day.weekday}
      </span>

      {day.isToday && !selected && (
        <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-[#E8B4B8]" />
      )}
    </button>
  );
}

/* ============================================================
   اسلایدر ساعت‌ها — ۳ ستون × ۲ ردیف در هر صفحه + پگینیشن
   ============================================================ */

function TimeSlider({ icon, title, slots, time, isSlotPast, onSelect }) {
  const trackRef = useRef(null);
  const pageRefs = useRef([]);
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const out = [];
    for (let i = 0; i < slots.length; i += SLIDER_PAGE_SIZE) {
      out.push(slots.slice(i, i + SLIDER_PAGE_SIZE));
    }
    return out;
  }, [slots]);

  const lastPage = pages.length - 1;

  const goToPage = (index, behavior = "smooth") => {
    const track = trackRef.current;
    const el = pageRefs.current[index];
    if (!track || !el) return;
    const delta =
      el.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollBy({ left: delta, behavior });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const index = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    setPage(Math.min(lastPage, Math.max(0, index)));
  };

  // اگه ساعت انتخابی توی صفحه‌ی دیگه‌ای بود، اسلایدر بره همون صفحه
  useEffect(() => {
    const index = pages.findIndex((p) => p.includes(time));
    if (index >= 0 && index !== page) goToPage(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  if (slots.length === 0) return null;

  const arrowClass =
    "flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F3EE] text-[10px] text-[#A47D54] transition hover:bg-[#C9A87C]/20 active:scale-90 disabled:opacity-30 disabled:hover:bg-[#F8F3EE] dark:bg-white/10";

  return (
    <div>
      {/* هدر گروه + شمارنده + فلش‌ها */}
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-medium text-[#9B8578] dark:text-white/50">
          <span className="text-[11px] text-[#B8956A]">{icon}</span>
          {title}
        </p>

        {pages.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] tabular-nums text-[#A28E81] dark:text-white/40">
              {toFa(page + 1)} / {toFa(pages.length)}
            </span>
            <button
              type="button"
              aria-label="صفحه‌ی قبلی"
              disabled={page === 0}
              onClick={() => goToPage(page - 1)}
              className={arrowClass}
            >
              <FaChevronRight />
            </button>
            <button
              type="button"
              aria-label="صفحه‌ی بعدی"
              disabled={page === lastPage}
              onClick={() => goToPage(page + 1)}
              className={arrowClass}
            >
              <FaChevronLeft />
            </button>
          </div>
        )}
      </div>

      {/* ترک اسلایدر */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((pageSlots, i) => (
          <div
            key={i}
            ref={(el) => (pageRefs.current[i] = el)}
            className="grid w-full shrink-0 snap-start grid-cols-3 grid-rows-2 gap-2"
          >
            {pageSlots.map((slot) => {
              const active = time === slot;
              const past = isSlotPast(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={past}
                  onClick={() => onSelect(slot)}
                  aria-pressed={active}
                  className={`
                    h-11 rounded-xl text-xs transition-all duration-200
                    active:scale-[0.97]
                    ${
                      past
                        ? "cursor-not-allowed bg-[#F5F0EB] text-[#B8AAA0] opacity-45 dark:bg-white/5 dark:text-white/20"
                        : active
                        ? "bg-gradient-to-l from-[#C9A87C] to-[#AD875B] font-bold text-white shadow-[0_8px_18px_rgba(184,149,106,0.3)]"
                        : "bg-[#F8F3EE] text-[#846F62] hover:bg-[#C9A87C]/15 dark:bg-white/5 dark:text-white/65"
                    }
                  `}
                >
                  {toFa(slot)}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* نقطه‌های پگینیشن */}
      {pages.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`صفحه ${toFa(i + 1)}`}
              aria-current={i === page}
              onClick={() => goToPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page
                  ? "w-5 bg-[#C9A87C]"
                  : "w-1.5 bg-[#C9A87C]/30 hover:bg-[#C9A87C]/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   صفحه رزرو
   ============================================================ */

function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const stylist = location.state?.stylist ?? FALLBACK_STYLIST;

  const calendar = useMemo(() => buildCalendar(), []);
  const { months, days, todayKey } = calendar;

  const todayIndex = useMemo(
    () => Math.max(0, days.findIndex((d) => d.key === todayKey)),
    [days, todayKey]
  );

  const currentMonthIdx = useMemo(() => {
    const idx = months.findIndex((m) =>
      m.days.some((d) => d.key === todayKey)
    );
    return idx >= 0 ? idx : 0;
  }, [months, todayKey]);

  const [selectedKey, setSelectedKey] = useState(todayKey);
  const [monthIdx, setMonthIdx] = useState(currentMonthIdx);
  const [time, setTime] = useState("10:30");
  const [liked, setLiked] = useState(false);
  const [booked, setBooked] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const bookTimer = useRef(null);

  const monthScrollRef = useRef(null);
  const monthChipRefs = useRef([]);

  const selectedIndex = days.findIndex((day) => day.key === selectedKey);
  const selectedDay = days[selectedIndex] ?? days[0];

  // جهت حرکت برای انیمیشن رقم‌ها
  const prevIndexRef = useRef(selectedIndex);
  const direction = selectedIndex >= prevIndexRef.current ? "up" : "down";
  useEffect(() => {
    prevIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  const diffFromToday = selectedIndex - todayIndex;
  const relativeLabel =
    diffFromToday === 0
      ? "امروز"
      : diffFromToday === 1
      ? "فردا"
      : diffFromToday === 2
      ? "پس‌فردا"
      : `${toFa(diffFromToday)} روز دیگر`;

  const rating = Number(stylist.rating);
  const ratingText = Number.isFinite(rating)
    ? rating.toLocaleString("fa-IR", { minimumFractionDigits: 1 })
    : String(stylist.rating ?? "—");

  const price = Number(stylist.price ?? 150000);
  const priceText = toFa(price.toLocaleString("en-US")).replace(/,/g, "٬");

  // اسکرول خودکار نوار ماه‌ها به ماه فعال
  useEffect(() => {
    const el = monthChipRefs.current[monthIdx];
    const container = monthScrollRef.current;
    if (!el || !container) return;
    const target =
      el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, [monthIdx]);

  useEffect(() => {
    return () => {
      if (bookTimer.current) clearTimeout(bookTimer.current);
    };
  }, []);

  const selectDay = (day) => {
    if (!day || day.isPast) return;
    setSelectedKey(day.key);
    const nextMonthIdx = months.findIndex(
      (month) => month.key === day.monthKey
    );
    if (nextMonthIdx >= 0) setMonthIdx(nextMonthIdx);
    setBooked(false);
  };

  const handleMonth = (index) => {
    if (index < currentMonthIdx) return;
    const month = months[index];
    if (!month) return;
    const targetDay =
      month.days.find((day) => day.isToday) ??
      month.days.find((day) => !day.isPast);
    if (targetDay) selectDay(targetDay);
  };

  const moveDay = (offset) => {
    let nextIndex = selectedIndex + offset;
    while (nextIndex >= 0 && nextIndex < days.length && days[nextIndex].isPast) {
      nextIndex += offset;
    }
    const nextDay = days[nextIndex];
    if (!nextDay || nextDay.isPast) return;
    selectDay(nextDay);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    const dy = event.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 35 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) moveDay(1);
    else moveDay(-1);
  };

  // در RTL: چپ = روز بعد، راست = روز قبل
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveDay(1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveDay(-1);
    }
  };

  // ساعت‌های گذشته‌ی امروز
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = selectedDay?.key === todayKey;

  const isSlotPast = (slot) => {
    if (!isToday) return false;
    const [h, m] = slot.split(":").map(Number);
    return h * 60 + m <= nowMinutes;
  };

  // اگه ساعت انتخابی برای امروز گذشته باشه، اولین ساعت آزاد رو انتخاب کن
  useEffect(() => {
    if (isSlotPast(time)) {
      const next = TIME_SLOTS.find((slot) => !isSlotPast(slot));
      if (next) setTime(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey]);

  const handleSelectTime = (slot) => {
    setTime(slot);
    setBooked(false);
  };

  const canBook = selectedDay && !selectedDay.isPast && !isSlotPast(time);

  const handleBook = () => {
    if (!canBook) return;

    /* API call payload:
      { stylist, date: selectedDay.key, jalaliMonth: selectedDay.monthName,
        jalaliDay: selectedDay.jd, time, price }
    */

    setBooked(true);
    if (bookTimer.current) clearTimeout(bookTimer.current);
    bookTimer.current = setTimeout(() => setBooked(false), 2500);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-[#F9F3ED] via-[#F8EDE5] to-[#F0DED4] transition-colors duration-500 dark:from-[#171615] dark:via-[#201D1B] dark:to-[#292320] sm:py-8"
    >
      <style>{ANIMATION_CSS}</style>

      <main className="mx-auto flex min-h-screen max-w-md flex-col overflow-hidden bg-white shadow-[0_24px_80px_rgba(93,58,58,0.12)] transition-colors duration-500 dark:bg-[#1D1B1A] sm:min-h-0 sm:rounded-[34px] sm:shadow-[0_30px_90px_rgba(75,48,35,0.18)]">
        {/* ================= HERO ================= */}
        <section className="relative z-10 h-[300px] overflow-hidden rounded-b-[32px] shadow-[0_15px_35px_rgba(70,43,31,0.18)] sm:h-[330px] sm:rounded-t-[34px]">
          <img
            src={stylist.img || FALLBACK_STYLIST.img}
            alt={stylist.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#291B15]/90 via-[#291B15]/15 to-black/25" />

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="بازگشت"
            className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-xl transition hover:bg-white/25 active:scale-95"
          >
            <FaArrowRight className="text-xs" />
          </button>

          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label="افزودن به علاقه‌مندی‌ها"
            className="absolute left-4 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-xl transition hover:bg-white/25 active:scale-95"
          >
            {liked ? (
              <FaHeart className="text-sm text-[#F2B9BE]" />
            ) : (
              <FaRegHeart className="text-sm text-white" />
            )}
          </button>

          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
            <div className="min-w-0 text-white">
              <h1 className="truncate text-xl font-extrabold drop-shadow-md">
                {stylist.name}
              </h1>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-white/80">
                <span>{stylist.role}</span>
                <span className="h-1 w-1 rounded-full bg-white/50" />
                <span className="flex items-center gap-1 font-bold text-[#F3D29B]">
                  <FaStar className="text-[11px]" />
                  {ratingText}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {[
                { icon: <FaRegCommentDots />, label: "پیام" },
                { icon: <FaPhoneAlt />, label: "تماس" },
                { icon: <FaVideo />, label: "تماس تصویری" },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  aria-label={action.label}
                  title={action.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xs text-[#A47D54] shadow-lg transition hover:-translate-y-0.5 hover:bg-white active:scale-95"
                >
                  {action.icon}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="-mt-1 rounded-b-[28px] bg-[#FBF5EF] px-5 pb-5 pt-5 transition-colors duration-500 dark:bg-[#292523]">
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <FaHistory />, value: toFa(stylist.experience ?? 8), label: "سال تجربه" },
              { icon: <FaUserFriends />, value: stylist.clients ?? "۲٫۷K+", label: "مشتری" },
              { icon: <FaRegStar />, value: toFa(stylist.reviews ?? 0), label: "نظر" },
            ].map((stat) => (
              <div key={stat.label} className="flex min-w-0 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs text-[#B8956A] shadow-sm dark:bg-white/10">
                  {stat.icon}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-extrabold text-[#5D3A3A] dark:text-[#F4EDE5]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[9px] text-[#9B8578] dark:text-white/45">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= DATE PICKER ================= */}
        <section className="px-5 pt-7">
          <h2 className="text-sm font-extrabold text-[#5D3A3A] dark:text-[#F4EDE5]">
            انتخاب تاریخ
          </h2>

          {/* نمایش تاریخ انتخابی با رقم‌های غلتان */}
          <DateReadout
            day={selectedDay}
            direction={direction}
            relativeLabel={relativeLabel}
          />

          {/* ماه‌ها (از ماه جاری به بعد) */}
          <div
            ref={monthScrollRef}
            className="-mx-5 mt-5 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {months.map((month, index) => {
              if (index < currentMonthIdx) return null;
              const active = index === monthIdx;
              const showYear = index > currentMonthIdx && month.year !== months[index - 1].year;

              return (
                <button
                  key={month.key}
                  ref={(el) => (monthChipRefs.current[index] = el)}
                  type="button"
                  onClick={() => handleMonth(index)}
                  aria-pressed={active}
                  className={`
                    shrink-0 rounded-full px-4 py-2 text-xs transition-all duration-300
                    ${
                      active
                        ? "bg-[#C9A87C]/15 font-bold text-[#A47D54]"
                        : "text-[#9B8578] hover:text-[#A47D54] dark:text-white/50"
                    }
                  `}
                >
                  {month.name}
                  {showYear && (
                    <span className="mr-1 text-[9px] opacity-60">
                      {toFa(month.year)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* روزها — فقط ردیف روزها، بدون کادر و متن اضافه */}
          <div
            tabIndex={0}
            role="group"
            aria-label="انتخاب روز"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="mt-3 flex touch-pan-y items-center justify-center gap-1.5 py-3 outline-none sm:gap-2"
          >
            {days
              .slice(
                Math.max(0, selectedIndex - 3),
                Math.min(days.length, selectedIndex + 4)
              )
              .map((day) => {
                const index = days.findIndex((item) => item.key === day.key);
                return (
                  <DayCard
                    key={day.key}
                    day={day}
                    distance={Math.abs(index - selectedIndex)}
                    selected={day.key === selectedKey}
                    onClick={() => selectDay(day)}
                  />
                );
              })}
          </div>
        </section>

        {/* ================= TIME PICKER ================= */}
        <section className="px-5 pt-6">
          <h2 className="text-sm font-extrabold text-[#5D3A3A] dark:text-[#F4EDE5]">
            انتخاب ساعت
          </h2>

          <div className="mt-4 space-y-5">
            <TimeSlider
              icon={<FaSun />}
              title="صبح"
              slots={MORNING_SLOTS}
              time={time}
              isSlotPast={isSlotPast}
              onSelect={handleSelectTime}
            />
            <TimeSlider
              icon={<FaMoon />}
              title="ظهر و عصر"
              slots={EVENING_SLOTS}
              time={time}
              isSlotPast={isSlotPast}
              onSelect={handleSelectTime}
            />
          </div>
        </section>

        <div className="flex-1" />

        {/* ================= BOOK BUTTON ================= */}
        <div className="sticky bottom-0 z-20 mt-6 bg-gradient-to-t from-white via-white to-transparent px-5 pb-5 pt-6 dark:from-[#1D1B1A] dark:via-[#1D1B1A] sm:rounded-b-[34px]">
          <button
            type="button"
            onClick={handleBook}
            disabled={!canBook}
            className={`
              flex w-full items-center justify-center gap-2
              rounded-2xl py-4 text-sm font-extrabold text-white
              transition-all duration-300
              hover:-translate-y-0.5 active:scale-[0.98]
              disabled:cursor-not-allowed disabled:opacity-40
              ${
                booked
                  ? "bg-gradient-to-l from-[#6E936E] to-[#527B58] shadow-[0_12px_28px_rgba(82,123,88,0.25)]"
                  : "bg-gradient-to-l from-[#C9A87C] to-[#AD875B] shadow-[0_12px_28px_rgba(184,149,106,0.32)]"
              }
            `}
          >
            {booked ? (
              <>
                <FaCheck className="text-xs" />
                رزرو شما ثبت شد
              </>
            ) : (
              <>
                ثبت رزرو
                <span className="opacity-60">·</span>
                {priceText} تومان
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Reservation;
