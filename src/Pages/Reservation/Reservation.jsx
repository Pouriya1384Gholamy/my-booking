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
  FaRegClock,
  FaHistory,
  FaUserFriends,
  FaCheck,
} from "react-icons/fa";

/* ============================================================
   🔧 ابزارها
   ============================================================ */

const toFa = (v) => String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

// getDay(): 0 = یکشنبه
const WEEKDAYS = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

const TIME_SLOTS = [
  "10:30",
  "11:00",
  "12:00",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "18:30",
];

// تقویم شمسی با Intl — ارقام لاتین برای ساختن کلید، نمایش فارسی جداست
const jalaliFmt = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

function buildMonths(totalDays = 130, maxMonths = 5) {
  const base = new Date();
  base.setHours(12, 0, 0, 0);

  const groups = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(base);
    date.setDate(base.getDate() + i);

    const parts = jalaliFmt.formatToParts(date);
    const get = (t) => Number(parts.find((p) => p.type === t)?.value);
    const jy = get("year");
    const jm = get("month");
    const jd = get("day");
    const key = `${jy}-${jm}`;

    let group = groups[groups.length - 1];
    if (!group || group.key !== key) {
      group = { key, name: JALALI_MONTHS[jm - 1], days: [] };
      groups.push(group);
    }
    group.days.push({ jd, weekday: WEEKDAYS[date.getDay()] });
  }
  return groups.slice(0, maxMonths);
}

/* ============================================================
   👩‍🎨 داده‌ی پیش‌فرض (اگه از صفحه‌ی قبل stylist نیومد)
   ============================================================ */

const FALLBACK_STYLIST = {
  name: "سارا احمدی",
  role: "متخصص رنگ و مش",
  rating: 4.9,
  reviews: 240,
  img: "https://i.pravatar.cc/600?img=5",
};

/* ============================================================
   📅 صفحه‌ی رزرو
   ============================================================ */

function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const stylist = location.state?.stylist ?? FALLBACK_STYLIST;

  const months = useMemo(() => buildMonths(), []);
  const [monthIdx, setMonthIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [liked, setLiked] = useState(false);
  const [booked, setBooked] = useState(false);

  const month = months[monthIdx];
  const dayRefs = useRef([]);
  const firstRender = useRef(true);

  const rating = Number(stylist.rating);
  const ratingText = Number.isFinite(rating)
    ? rating.toLocaleString("fa-IR", { minimumFractionDigits: 1 })
    : String(stylist.rating);
  const price = stylist.price ?? 150000;

  // روز انتخابی رو وسط لیست بیار (بدون اسکرول خود صفحه)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dayRefs.current[dayIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [dayIdx, monthIdx]);

  const handleMonth = (i) => {
    setMonthIdx(i);
    setDayIdx(0);
  };

  const handleBook = () => {
    // اینجا می‌تونی درخواست رزرو رو به API بفرستی
    // { stylist, month: month.name, day: month.days[dayIdx].jd, time }
    setBooked(true);
    setTimeout(() => setBooked(false), 2500);
  };

  // اندازه‌ی کاشی روز بر اساس فاصله از روز انتخابی
  const tileStyle = (i) => {
    const d = Math.abs(i - dayIdx);
    if (d === 0)
      return "h-[88px] w-[66px] -translate-y-1 bg-gradient-to-b from-[#C9A87C] to-[#B8956A] text-white ring-2 ring-offset-2 ring-[#C9A87C] ring-offset-white dark:ring-offset-[#1F1F1F] shadow-[0_12px_24px_rgba(201,168,124,0.45)]";
    if (d === 1)
      return "h-[68px] w-[52px] bg-white dark:bg-white/10 text-[#5D3A3A] dark:text-[#F4F0E8] shadow-[0_6px_14px_rgba(201,168,124,0.18)] border border-[#C9A87C]/15";
    if (d === 2)
      return "h-[54px] w-[42px] bg-[#FDF6F0] dark:bg-white/5 text-[#8B6F6F] dark:text-white/50 opacity-80";
    return "h-[44px] w-[34px] bg-[#FDF6F0] dark:bg-white/5 text-[#8B6F6F] dark:text-white/40 opacity-55";
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#FDF6F0] via-[#FAEDE6] to-[#F5DCD5] dark:from-[#1F1F1F] dark:via-[#252525] dark:to-[#2A2A2A] transition-colors duration-500 sm:py-6"
      dir="rtl"
    >
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white dark:bg-[#1A1A1A] transition-colors duration-500 sm:min-h-0 sm:rounded-[36px] sm:shadow-[0_30px_70px_rgba(201,168,124,0.25)] dark:sm:shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
        {/* ================= HERO ================= */}
        <div className="relative z-10 h-[330px] sm:h-[360px] overflow-hidden rounded-b-[36px] sm:rounded-t-[36px] shadow-[0_14px_30px_rgba(93,58,58,0.18)]">
          <img
            src={stylist.img}
            alt={stylist.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          {/* گرادیانت‌ها */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3a2418]/85 via-[#3a2418]/15 to-black/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#C9A87C]/20 via-transparent to-transparent" />

          {/* دکمه‌ها */}
          <button
            onClick={() => navigate(-1)}
            aria-label="بازگشت"
            className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition hover:bg-white/40 active:scale-95"
          >
            <FaArrowRight className="text-xs" />
          </button>

          <button
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label="علاقه‌مندی"
            className="absolute left-4 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/25 backdrop-blur-md transition hover:bg-white/40 active:scale-95"
          >
            {liked ? (
              <FaHeart className="text-sm text-[#E8B4B8]" />
            ) : (
              <FaRegHeart className="text-sm text-white" />
            )}
          </button>

          {/* نام و تخصص */}
          <div className="absolute bottom-5 right-5 text-white">
            <h1 className="text-xl font-bold drop-shadow-md">{stylist.name}</h1>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-white/85">
              <span>{stylist.role}</span>
              <span className="h-1 w-1 rounded-full bg-white/50" />
              <span className="flex items-center gap-1 font-bold text-[#F2D29B]">
                <FaStar className="text-[11px]" />
                {ratingText}
              </span>
            </div>
          </div>

          {/* دکمه‌های ارتباط */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2">
            {[
              { icon: <FaRegCommentDots />, label: "پیام" },
              { icon: <FaPhoneAlt />, label: "تماس" },
              { icon: <FaVideo />, label: "تماس تصویری" },
            ].map((a) => (
              <button
                key={a.label}
                aria-label={a.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-sm text-[#B8956A] shadow-md backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white active:scale-95"
              >
                {a.icon}
              </button>
            ))}
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="-mt-8 rounded-b-[30px] bg-[#FDF6F0] dark:bg-[#242424] px-5 pb-5 pt-12 shadow-[0_8px_20px_rgba(201,168,124,0.12)] transition-colors duration-500">
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                icon: <FaHistory />,
                value: toFa(stylist.experience ?? 8),
                label: "سال تجربه",
              },
              {
                icon: <FaUserFriends />,
                value: stylist.clients ?? "۲٫۷K+",
                label: "مشتری",
              },
              {
                icon: <FaRegStar />,
                value: ratingText,
                label: "نظرات",
              },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-white/10 text-xs text-[#C9A87C] shadow-sm">
                  {s.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold leading-none text-[#5D3A3A] dark:text-[#F4F0E8]">
                    {s.value}
                  </p>
                  <p className="mt-1 truncate text-[9px] text-[#8B6F6F] dark:text-white/40">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= انتخاب تاریخ ================= */}
        <section className="px-5 pt-6">
          <h2 className="text-sm font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            انتخاب تاریخ
          </h2>

          {/* ماه‌ها */}
          <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {months.map((m, i) => (
              <button
                key={m.key}
                onClick={() => handleMonth(i)}
                aria-pressed={i === monthIdx}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs transition-all duration-300 ${
                  i === monthIdx
                    ? "bg-[#C9A87C]/15 font-bold text-[#B8956A]"
                    : "text-[#8B6F6F] dark:text-white/50 hover:text-[#C9A87C]"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* روزها */}
          <div className="relative -mx-5 mt-5">
            <div
              className="
                flex items-end gap-2.5
                overflow-x-auto px-[calc(50%-33px)] pb-6 pt-3
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
            >
              {month.days.map((d, i) => {
                const selected = i === dayIdx;
                return (
                  <button
                    key={`${month.key}-${d.jd}`}
                    ref={(el) => (dayRefs.current[i] = el)}
                    onClick={() => setDayIdx(i)}
                    aria-pressed={selected}
                    className={`
                      relative flex shrink-0 flex-col items-center justify-center
                      rounded-[16px] outline-none
                      transition-all duration-500
                      ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                      motion-reduce:transition-none
                      focus-visible:ring-2 focus-visible:ring-[#E8B4B8]
                      ${tileStyle(i)}
                    `}
                  >
                    <span
                      className={`font-bold leading-none ${
                        selected ? "text-xl" : "text-sm"
                      }`}
                    >
                      {toFa(d.jd)}
                    </span>
                    <span
                      className={`mt-1.5 leading-none ${
                        selected ? "text-[9px] text-white/85" : "text-[7px] opacity-70"
                      }`}
                    >
                      {d.weekday}
                    </span>

                    {selected && (
                      <span className="absolute -bottom-4 h-1 w-1 rounded-full bg-[#C9A87C]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= انتخاب ساعت ================= */}
        <section className="px-5 pt-1">
          <h2 className="text-sm font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            انتخاب ساعت
          </h2>

          <div className="-mx-5 mt-4 flex gap-2.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TIME_SLOTS.map((t) => {
              const active = t === time;
              return (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  aria-pressed={active}
                  className={`
                    flex shrink-0 items-center gap-1.5
                    rounded-full border px-3.5 py-2
                    text-xs transition-all duration-300
                    ${
                      active
                        ? "border-[#C9A87C] bg-[#C9A87C]/10 font-bold text-[#B8956A] shadow-[0_4px_12px_rgba(201,168,124,0.25)]"
                        : "border-[#5D3A3A]/10 dark:border-white/10 text-[#8B6F6F] dark:text-white/50 hover:border-[#C9A87C]/50"
                    }
                  `}
                >
                  <FaRegClock className="text-[10px]" />
                  {toFa(t)}
                </button>
              );
            })}
          </div>
        </section>

        {/* فاصله برای دکمه‌ی پایین */}
        <div className="flex-1" />

        {/* ================= دکمه‌ی رزرو (چسبیده به پایین) ================= */}
        <div className="sticky bottom-0 z-20 mt-6 bg-gradient-to-t from-white via-white to-transparent px-5 pb-6 pt-6 dark:from-[#1A1A1A] dark:via-[#1A1A1A] sm:rounded-b-[36px]">
          <button
            onClick={handleBook}
            className={`
              flex w-full items-center justify-center gap-2
              rounded-2xl py-4
              text-sm font-bold text-white
              transition-all duration-300
              hover:-translate-y-0.5 active:scale-[0.98]
              ${
                booked
                  ? "bg-[#6B8A6A] shadow-[0_12px_28px_rgba(107,138,106,0.4)]"
                  : "bg-gradient-to-br from-[#C9A87C] to-[#B8956A] shadow-[0_12px_28px_rgba(201,168,124,0.45)]"
              }
            `}
          >
            {booked ? (
              <>
                <FaCheck className="text-xs" />
                رزرو شما ثبت شد
              </>
            ) : (
              <>ثبت رزرو - {toFa(price.toLocaleString("en-US")).replace(/,/g, "٬")} تومان</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
