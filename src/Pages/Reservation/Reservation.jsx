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
  FaCalendarAlt,
  FaTimes,
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
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

const MORNING_SLOTS = TIME_SLOTS.filter((slot) => slot < "12:30");
const EVENING_SLOTS = TIME_SLOTS.filter((slot) => slot >= "12:30");
const SLIDER_PAGE_SIZE = 6;

const jalaliFormatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  year: "numeric", month: "numeric", day: "numeric",
});

const getJalaliParts = (date) => {
  const parts = jalaliFormatter.formatToParts(date);
  const get = (type) => Number(parts.find((part) => part.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
};

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

function buildCalendar({ pastMonths = 1, futureMonths = 11 } = {}) {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  const todayKey = getDateKey(now);
  const currentMonthKey = getMonthKey(now);

  let startOfCurrentMonth = new Date(now);
  while (true) {
    const previous = new Date(startOfCurrentMonth);
    previous.setDate(previous.getDate() - 1);
    if (getMonthKey(previous) !== currentMonthKey) break;
    startOfCurrentMonth = previous;
  }

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
        month,
        days: [],
      };
      groups.push(group);
    }

    group.days.push({
      key, date, jd: day,
      weekday: WEEKDAYS[date.getDay()],
      weekdayIndex: date.getDay(),
      monthKey, monthName: JALALI_MONTHS[month - 1], year,
      isPast: key < todayKey,
      isToday: key === todayKey,
    });
  }

  const months = groups.slice(0, pastMonths + 1 + futureMonths);
  const days = months.flatMap((month) => month.days);

  return { todayKey, months, days };
}

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
   انیمیشن‌ها
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
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
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
          animation: `${direction === "up" ? "rollUp" : "rollDown"} 460ms cubic-bezier(0.22, 1, 0.36, 1) both`,
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
    <div className="relative flex items-center gap-4">
      <div className="pointer-events-none absolute right-0 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-[#C9A87C]/20 blur-2xl sm:h-24 sm:w-24" />
      
      <div dir="ltr" aria-hidden="true" className="relative flex text-[50px] font-extrabold leading-none sm:text-[64px]">
        {digits.map((char, i) => (
          <RollingDigit key={i} char={char} direction={direction} />
        ))}
      </div>

      <div className="relative min-w-0 flex-1">
        <p key={day.weekday} data-anim className="text-sm font-bold text-[#5D3A3A] dark:text-[#F4EDE5]" style={{ animation: "fadeSlide 380ms ease-out both" }}>
          {day.weekday}
        </p>
        <p key={`${day.monthName}-${day.year}`} data-anim className="mt-1 text-xs text-[#9B8578] dark:text-white/50" style={{ animation: "fadeSlide 380ms 60ms ease-out both" }}>
          {day.monthName} {toFa(day.year)}
        </p>
      </div>

      <span key={relativeLabel} data-anim className="relative shrink-0 rounded-full bg-[#C9A87C]/15 px-3 py-1.5 text-[11px] font-bold text-[#A47D54]" style={{ animation: "fadeSlide 380ms 100ms ease-out both" }}>
        {relativeLabel}
      </span>

      <p className="sr-only" aria-live="polite">
        {day.weekday} {toFa(day.jd)} {day.monthName} {toFa(day.year)}
      </p>
    </div>
  );
}

/* ============================================================
   مودال تقویم (Calendar Modal) — طراحی اپلیکیشن‌گونه و مینیمال
   ============================================================ */
function CalendarModal({ isOpen, onClose, months, selectedKey, onSelect, todayKey, currentMonthIdx }) {
  const [viewMonthIdx, setViewMonthIdx] = useState(currentMonthIdx);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const idx = months.findIndex((m) => m.days.some((d) => d.key === selectedKey));
      if (idx >= 0) setViewMonthIdx(idx);
    }
  }, [isOpen, selectedKey, months]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const month = months[viewMonthIdx];
  if (!month) return null;

  const canGoPrev = viewMonthIdx > currentMonthIdx;
  const canGoNext = viewMonthIdx < months.length - 1;

  const firstDayWeekday = month.days[0]?.weekdayIndex ?? 0;
  const leadingBlanks = (firstDayWeekday + 1) % 7;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "backdropIn 250ms ease-out both" }}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="انتخاب تاریخ"
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-[#EFE4DC] bg-[#FFFCFA] shadow-[0_30px_80px_rgba(42,29,24,0.35)] dark:border-white/[0.08] dark:bg-[#201C1A]"
        style={{ animation: "modalIn 300ms cubic-bezier(0.22, 1, 0.36, 1) both" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-sm font-black text-[#4B302A] dark:text-[#F4EDE5]">
            انتخاب تاریخ
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5EDE6] text-[#A47D54] transition hover:bg-[#EDDCCB] active:scale-90 dark:bg-white/[0.06]"
          >
            <FaTimes className="text-[10px]" />
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between px-5 py-2">
          <button
            type="button"
            onClick={() => canGoPrev && setViewMonthIdx(viewMonthIdx - 1)}
            disabled={!canGoPrev}
            aria-label="ماه قبل"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F3EE] text-[#A47D54] transition hover:bg-[#EDDCCB] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white/[0.06]"
          >
            <FaChevronRight className="text-[10px]" />
          </button>

          <div className="text-center">
            <p className="text-sm font-black text-[#4B302A] dark:text-[#F4EDE5]">
              {month.name}
            </p>
            <p className="mt-0.5 text-[10px] text-[#A18A7B] dark:text-white/45">
              {toFa(month.year)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => canGoNext && setViewMonthIdx(viewMonthIdx + 1)}
            disabled={!canGoNext}
            aria-label="ماه بعد"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F3EE] text-[#A47D54] transition hover:bg-[#EDDCCB] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white/[0.06]"
          >
            <FaChevronLeft className="text-[10px]" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 px-4 pb-1">
          {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
            <div key={day} className="text-center text-[10px] font-bold text-[#A18A7B] dark:text-white/40">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid — اندازه‌های دقیقاً مطابق کد اصلی */}
        <div className="grid grid-cols-7 gap-1 px-4 pb-4">
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <div key={`blank-${i}`} className="h-10" />
          ))}

          {month.days.map((day) => {
            const isSelected = day.key === selectedKey;
            const isPast = day.isPast;
            const isToday = day.isToday;

            return (
              <button
                key={day.key}
                type="button"
                onClick={() => {
                  if (!isPast) {
                    onSelect(day);
                    onClose();
                  }
                }}
                disabled={isPast}
                aria-pressed={isSelected}
                aria-label={`${day.weekday} ${day.jd} ${day.monthName}`}
                className={`
                  relative flex h-10 w-full items-center justify-center rounded-xl text-xs font-bold transition-all duration-200
                  ${isSelected
                    ? "bg-gradient-to-br from-[#CDA783] to-[#A97754] text-white shadow-[0_6px_16px_rgba(184,149,106,0.35)]"
                    : isPast
                    ? "cursor-not-allowed text-[#C5B8AE] opacity-40 dark:text-white/20"
                    : isToday
                    ? "bg-[#F4E8DE] text-[#A47D54] ring-1 ring-[#E2C9B0] hover:bg-[#EDDCCB] dark:bg-white/[0.06] dark:ring-white/[0.1]"
                    : "text-[#5D3A3A] hover:bg-[#F5EDE6] active:scale-95 dark:text-[#F4EDE5] dark:hover:bg-white/[0.06]"
                  }
                `}
              >
                {toFa(day.jd)}
                {isToday && !isSelected && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#C49A75]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   اسلایدر ساعت‌ها
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
    const delta = el.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollBy({ left: delta, behavior });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const index = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    setPage(Math.min(lastPage, Math.max(0, index)));
  };

  useEffect(() => {
    const index = pages.findIndex((p) => p.includes(time));
    if (index >= 0 && index !== page) goToPage(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  if (slots.length === 0) return null;

  const arrowClass = "flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F3EE] text-[10px] text-[#A47D54] transition hover:bg-[#C9A87C]/20 active:scale-90 disabled:opacity-30 disabled:hover:bg-[#F8F3EE] dark:bg-white/10";

  return (
    <div>
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
            <button type="button" aria-label="صفحه‌ی قبلی" disabled={page === 0} onClick={() => goToPage(page - 1)} className={arrowClass}>
              <FaChevronRight />
            </button>
            <button type="button" aria-label="صفحه‌ی بعدی" disabled={page === lastPage} onClick={() => goToPage(page + 1)} className={arrowClass}>
              <FaChevronLeft />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((pageSlots, i) => (
          <div
            key={i}
            ref={(el) => (pageRefs.current[i] = el)}
            className="grid w-full shrink-0 snap-start grid-cols-3 grid-rows-2 gap-2 sm:grid-cols-4"
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
                    h-10 rounded-xl text-xs transition-all duration-200 active:scale-[0.97] sm:h-12 sm:text-sm
                    ${past
                      ? "cursor-not-allowed bg-[#F5F0EB] text-[#B8AAA0] opacity-45 dark:bg-white/5 dark:text-white/20"
                      : active
                      ? "bg-gradient-to-l from-[#B78A65] to-[#8E6247] font-bold text-white shadow-[0_8px_18px_rgba(184,149,106,0.3)]"
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

      {pages.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`صفحه ${toFa(i + 1)}`}
              aria-current={i === page}
              onClick={() => goToPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? "w-5 bg-[#C9A87C]" : "w-1.5 bg-[#C9A87C]/30 hover:bg-[#C9A87C]/60"}`}
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
    const idx = months.findIndex((m) => m.days.some((d) => d.key === todayKey));
    return idx >= 0 ? idx : 0;
  }, [months, todayKey]);

  const [selectedKey, setSelectedKey] = useState(todayKey);
  const [time, setTime] = useState("10:30");
  const [liked, setLiked] = useState(false);
  const [booked, setBooked] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const bookTimer = useRef(null);

  const selectedIndex = days.findIndex((day) => day.key === selectedKey);
  const selectedDay = days[selectedIndex] ?? days[0];

  const prevIndexRef = useRef(selectedIndex);
  const direction = selectedIndex >= prevIndexRef.current ? "up" : "down";
  useEffect(() => {
    prevIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  const diffFromToday = selectedIndex - todayIndex;
  const relativeLabel =
    diffFromToday === 0 ? "امروز" :
    diffFromToday === 1 ? "فردا" :
    diffFromToday === 2 ? "پس‌فردا" :
    `${toFa(diffFromToday)} روز دیگر`;

  const rating = Number(stylist.rating);
  const ratingText = Number.isFinite(rating)
    ? rating.toLocaleString("fa-IR", { minimumFractionDigits: 1 })
    : String(stylist.rating ?? "—");

  const price = Number(stylist.price ?? 150000);
  const priceText = toFa(price.toLocaleString("en-US")).replace(/,/g, "٬");

  useEffect(() => {
    return () => {
      if (bookTimer.current) clearTimeout(bookTimer.current);
    };
  }, []);

  const selectDay = (day) => {
    if (!day || day.isPast) return;
    setSelectedKey(day.key);
    setBooked(false);
  };

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = selectedDay?.key === todayKey;

  const isSlotPast = (slot) => {
    if (!isToday) return false;
    const [h, m] = slot.split(":").map(Number);
    return h * 60 + m <= nowMinutes;
  };

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
    setBooked(true);
    if (bookTimer.current) clearTimeout(bookTimer.current);
    bookTimer.current = setTimeout(() => setBooked(false), 2500);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_rgba(222,190,163,0.28),_transparent_36%),linear-gradient(135deg,#F8F4F0_0%,#F2E8E2_52%,#F7F1ED_100%)] px-0 py-0 transition-colors duration-500 dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(132,91,73,0.16),_transparent_36%),linear-gradient(135deg,#171514_0%,#211C1A_52%,#191716_100%)] sm:px-4 sm:py-6 lg:px-8 lg:py-10"
    >
      <style>{ANIMATION_CSS}</style>

      <main className="mx-auto grid min-h-screen w-full max-w-2xl grid-cols-1 overflow-hidden border border-white/70 bg-[#FFFCFA]/95 shadow-[0_28px_100px_rgba(82,55,43,0.13)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/[0.07] dark:bg-[#201C1A]/95 sm:min-h-0 sm:rounded-[30px] lg:min-h-0 lg:max-w-6xl lg:grid-cols-12 lg:rounded-[38px] lg:shadow-[0_35px_110px_rgba(42,29,24,0.20)]">
        
        {/* ستون راست: هدر و آمار */}
        <aside className="relative lg:col-span-4 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-hidden lg:rounded-r-[38px] lg:border-l lg:border-[#EDE2DA] lg:bg-[#FBF6F2] lg:self-start dark:lg:border-white/[0.07] dark:lg:bg-[#211D1B]">
          
          {/* HERO — ارتفاع بیشتر */}
          <section className="relative z-10 h-[400px] overflow-hidden rounded-b-[30px] shadow-[0_18px_44px_rgba(70,43,31,0.20)] sm:h-[460px] sm:rounded-b-[34px] lg:h-[65%] lg:rounded-b-none lg:rounded-tr-[38px]">
            <img
              src={stylist.img || FALLBACK_STYLIST.img}
              alt={stylist.name}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#20120F]/95 via-[#281A17]/30 to-black/30" />

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
              {liked ? <FaHeart className="text-sm text-[#F2B9BE]" /> : <FaRegHeart className="text-sm text-white" />}
            </button>

            <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-7 sm:left-6 sm:right-6">
              <div className="min-w-0 text-white">
                <h1 className="truncate text-2xl font-black tracking-tight drop-shadow-md sm:text-3xl">
                  {stylist.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/85 sm:text-sm">
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

          {/* STATS */}
          <section className="rounded-b-[30px] bg-[#FBF6F2] px-5 pb-7 pt-6 transition-colors duration-500 dark:bg-[#211D1B] sm:px-6 lg:h-[35%] lg:rounded-b-none lg:bg-transparent lg:px-7 lg:py-8 lg:dark:bg-transparent">
            <div className="grid grid-cols-3 gap-2.5 lg:grid-cols-1 lg:gap-4">
              {[
                { icon: <FaHistory />, value: toFa(stylist.experience ?? 8), label: "سال تجربه" },
                { icon: <FaUserFriends />, value: stylist.clients ?? "۲٫۷K+", label: "مشتری" },
                { icon: <FaRegStar />, value: toFa(stylist.reviews ?? 0), label: "نظر" },
              ].map((stat) => (
                <div key={stat.label} className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-[#EFE4DC] bg-white/75 px-2 py-3 text-center shadow-[0_5px_18px_rgba(75,48,35,0.035)] dark:border-white/[0.06] dark:bg-white/[0.035] sm:flex-row sm:px-2.5 sm:text-right lg:flex-row lg:gap-3 lg:px-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F4E8DE] text-sm text-[#A47D54] dark:bg-white/[0.07]">
                    {stat.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-extrabold text-[#5D3A3A] dark:text-[#F4EDE5] lg:text-sm">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[9px] text-[#9B8578] dark:text-white/45 lg:text-[10px]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* ستون چپ: انتخاب تاریخ و ساعت */}
        <div className="flex flex-1 flex-col lg:col-span-8 lg:px-10 lg:py-8">
          
          {/* ================= DATE PICKER ================= */}
          <section>
            <div className="mb-4">
              <h2 className="flex items-center gap-2 text-base font-black tracking-tight text-[#4B302A] before:h-5 before:w-1 before:rounded-full before:bg-[#C49A75] dark:text-[#F4EDE5] sm:text-lg">
                انتخاب تاریخ
              </h2>
              <p className="mt-1.5 text-xs text-[#A18A7B] dark:text-white/45">روز مناسب خودت رو برای مراجعه انتخاب کن</p>
            </div>

            <div className="mt-2 rounded-[26px] bg-gradient-to-br from-[#F8F0E9] to-[#FFFDFC] p-4 ring-1 ring-[#EFE3D9] dark:from-white/[0.045] dark:to-white/[0.015] dark:ring-white/[0.06] sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold tracking-[0.12em] text-[#A18A7B] dark:text-white/45">APPOINTMENT DATE</span>
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold text-[#9B765B] ring-1 ring-[#E9D8CA] dark:bg-white/[0.05] dark:ring-white/[0.08]">تقویم شمسی</span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <DateReadout day={selectedDay} direction={direction} relativeLabel={relativeLabel} />

                {/* دکمه مینیمال تقویم */}
                <button
                  type="button"
                  onClick={() => setCalendarOpen(true)}
                  aria-label="باز کردن تقویم"
                  className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#A47D54] ring-1 ring-[#E9D8CA] shadow-sm transition-all duration-200 hover:bg-[#F5EDE6] hover:ring-[#D9C2AC] active:scale-95 dark:bg-white/[0.06] dark:ring-white/[0.1]"
                >
                  <FaCalendarAlt className="text-[13px] transition-transform group-hover:scale-110" />
                </button>
              </div>

              {/* پیش‌نمایش ۵ روز اخیر */}
              <div className="mt-4 flex items-center justify-center gap-1.5 border-t border-[#F0E6DF] pt-4 dark:border-white/[0.06]">
                {days
                  .slice(Math.max(0, selectedIndex - 2), Math.min(days.length, selectedIndex + 3))
                  .map((day) => {
                    const isSelected = day.key === selectedKey;
                    const isPast = day.isPast;
                    return (
                      <button
                        key={day.key}
                        type="button"
                        onClick={() => !isPast && selectDay(day)}
                        disabled={isPast}
                        aria-pressed={isSelected}
                        aria-label={`${day.weekday} ${day.jd} ${day.monthName}`}
                        className={`
                          flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-xs transition-all duration-200
                          ${isSelected
                            ? "bg-gradient-to-b from-[#CDA783] to-[#A97754] text-white shadow-[0_6px_16px_rgba(184,149,106,0.35)]"
                            : isPast
                            ? "cursor-not-allowed bg-[#F5F0EB] text-[#B8AAA0] opacity-40 dark:bg-white/5 dark:text-white/20"
                            : "bg-white text-[#654C43] hover:-translate-y-0.5 hover:bg-[#F5EDE6] dark:bg-white/10 dark:text-[#F4EDE5]"
                          }
                        `}
                      >
                        <span className="text-[9px] opacity-75">{day.weekday.slice(0, 3)}</span>
                        <span className="mt-1 font-bold">{toFa(day.jd)}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </section>

          {/* ================= TIME PICKER ================= */}
          <section className="pt-7 lg:pt-8">
            <div className="mb-4">
              <h2 className="flex items-center gap-2 text-base font-black tracking-tight text-[#4B302A] before:h-5 before:w-1 before:rounded-full before:bg-[#C49A75] dark:text-[#F4EDE5] sm:text-lg">
                انتخاب ساعت
              </h2>
              <p className="mt-1.5 text-xs text-[#A18A7B] dark:text-white/45">یکی از زمان‌های آزاد رو انتخاب کن</p>
            </div>

            <div className="mt-5 space-y-5 rounded-[26px] border border-[#EFE4DC] bg-white/70 p-4 shadow-[0_10px_35px_rgba(75,48,35,0.035)] dark:border-white/[0.07] dark:bg-white/[0.025] sm:p-5">
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
          <div className="sticky bottom-0 z-20 mt-6 border-t border-[#EFE5DE] bg-[#FFFCFA]/95 px-5 pb-5 pt-5 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#201C1A]/95 sm:px-7 sm:pb-7 lg:static lg:mt-8 lg:border-t-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none lg:dark:bg-transparent">
            <button
              type="button"
              onClick={handleBook}
              disabled={!canBook}
              className={`
                flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold text-white ring-1 ring-black/[0.03]
                transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]
                disabled:cursor-not-allowed disabled:opacity-40 sm:text-base
                ${booked
                  ? "bg-gradient-to-l from-[#6E936E] to-[#527B58] shadow-[0_12px_28px_rgba(82,123,88,0.25)]"
                  : "bg-gradient-to-l from-[#B78A65] to-[#8E6247] shadow-[0_14px_30px_rgba(142,98,71,0.28)]"
                }
              `}
            >
              {booked ? (
                <><FaCheck className="text-xs" /> رزرو شما ثبت شد</>
              ) : (
                <>ثبت رزرو <span className="opacity-60">·</span> {priceText} تومان</>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* ================= CALENDAR MODAL ================= */}
      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        months={months}
        selectedKey={selectedKey}
        onSelect={selectDay}
        todayKey={todayKey}
        currentMonthIdx={currentMonthIdx}
      />
    </div>
  );
}

export default Reservation;