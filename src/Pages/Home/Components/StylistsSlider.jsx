import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { STYLISTS } from "../data";

/* ============ STYLIST CARD ============ */
function StylistCard({ stylist }) {
  const [liked, setLiked] = useState(false);
  const [flyingHearts, setFlyingHearts] = useState([]);
  const [bursting, setBursting] = useState(false);
  const heartBtnRef = useRef(null);
  const navigate = useNavigate();

  const filledStars = Math.round(stylist.rating);
  const ratingText = stylist.rating.toLocaleString("fa-IR", { minimumFractionDigits: 1 });
  const reviewsText = stylist.reviews.toLocaleString("fa-IR");
  const reveal = "group-hover:opacity-100 group-focus-within:opacity-100";

  /* 🎯 کلیک روی لایک */
  const handleLike = (e) => {
    e.stopPropagation();
    const willLike = !liked;
    setLiked(willLike);

    if (willLike) {
      const clickX = e.clientX;
      const clickY = e.clientY;
      const btnRect = heartBtnRef.current?.getBoundingClientRect();
      if (!btnRect) return;

      const targetX = btnRect.left + btnRect.width / 2;
      const targetY = btnRect.top + btnRect.height / 2;

      const id = Date.now() + Math.random();
      setFlyingHearts((prev) => [
        ...prev,
        { id, startX: clickX, startY: clickY, deltaX: targetX - clickX, deltaY: targetY - clickY },
      ]);

      setTimeout(() => {
        setFlyingHearts((prev) => prev.filter((h) => h.id !== id));
      }, 950);

      setBursting(true);
      setTimeout(() => setBursting(false), 700);
    }
  };

  /* 🎯 کلیک روی رزرو → رفتن به صفحه Reservation */
  const handleReserve = (e) => {
    e.stopPropagation();
    navigate("/reservation", { state: { stylist } });
  };

  return (
    <article
      tabIndex={0}
      onClick={handleReserve}
      className="group relative shrink-0 snap-start cursor-pointer h-[270px] w-[176px] sm:h-[310px] sm:w-[204px] overflow-hidden rounded-[26px] border border-white/60 dark:border-white/10 shadow-[0_12px_30px_rgba(201,168,124,0.2)] outline-none transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(201,168,124,0.38)] focus-visible:-translate-y-1.5 focus-visible:ring-4 focus-visible:ring-[#E8B4B8]/40"
    >
      {/* تصویر */}
      <img
        src={stylist.img}
        alt={stylist.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 group-focus-within:scale-110"
      />

      {/* گرادیانت پایه */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      {/* گرادیانت طلایی هنگام هاور */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#8A6A40]/95 via-[#C9A87C]/45 to-transparent opacity-0 transition-opacity duration-500 ${reveal}`}
      />

      {/* نشان وضعیت */}
      <span
        className={`absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full px-2 py-1 text-[8px] sm:text-[9px] font-medium text-white backdrop-blur-md ${
          stylist.available ? "bg-[#6B8A6A]/80" : "bg-black/45"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            stylist.available ? "bg-[#CFE8CE]" : "bg-white/60"
          }`}
        />
        {stylist.available ? "آزاد امروز" : "نوبت فردا"}
      </span>

      {/* دکمه لایک */}
      <button
        ref={heartBtnRef}
        type="button"
        onClick={handleLike}
        aria-pressed={liked}
        aria-label={liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        className="absolute left-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-300 hover:bg-white/35 active:scale-90"
      >
        {bursting && (
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[#E8B4B8]/50 animate-heart-burst" />
        )}
        <span className={`relative z-10 inline-flex ${bursting && liked ? "animate-heart-pop" : ""}`}>
          <FaHeart
            className={`text-xs transition-colors duration-300 ${
              liked ? "text-[#E8B4B8]" : "text-white"
            }`}
          />
        </span>
      </button>

      {/* اطلاعات پایین */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 text-white">
        <h4 className="truncate text-sm sm:text-base font-bold drop-shadow-md">
          {stylist.name}
        </h4>

        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <FaStar
                key={i}
                className={`text-[10px] ${
                  i < filledStars ? "text-[#F2D29B]" : "text-white/30"
                }`}
              />
            ))}
          </span>
          <span className="text-[10px] font-bold">{ratingText}</span>
          <span className="text-[9px] text-white/70">({reviewsText})</span>
        </div>

        <span className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-white/15 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-[11px] font-medium">
          <span className="h-1 w-1 shrink-0 rounded-full bg-[#F2D29B]" />
          <span className="truncate">{stylist.role}</span>
        </span>

        {/* بخش جزئیات هنگام هاور */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
          <div className="overflow-hidden">
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/25 pt-3">
              <div className="min-w-0">
                <p className="text-[8px] sm:text-[9px] text-white/70">نوبت بعدی</p>
                <p className="mt-0.5 truncate text-[10px] sm:text-[11px] font-medium">
                  {stylist.next}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReserve}
                className="flex shrink-0 items-center gap-1 rounded-xl bg-white px-3 py-2 text-[10px] sm:text-[11px] font-bold text-[#8A6A40] shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 active:scale-95"
              >
                رزرو
                <FaChevronLeft className="text-[8px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* قلب پرنده */}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            {flyingHearts.map((h) => (
              <span
                key={h.id}
                className="pointer-events-none fixed z-[99999] animate-fly-to-heart"
                style={{
                  left: h.startX,
                  top: h.startY,
                  "--dx": `${h.deltaX}px`,
                  "--dy": `${h.deltaY}px`,
                }}
              >
                <FaHeart className="text-2xl text-[#E8B4B8] drop-shadow-[0_0_12px_rgba(232,180,184,0.9)]" />
              </span>
            ))}
          </>,
          document.body
        )}
    </article>
  );
}

/* ============ STYLISTS SLIDER ============ */
export default function StylistsSlider() {
  const trackRef = useRef(null);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrowClass =
    "hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A87C]/30 dark:border-white/10 bg-white/70 dark:bg-white/5 text-[#C9A87C] shadow-sm transition hover:border-[#C9A87C] hover:shadow-md active:scale-90";

  return (
    <section className="mt-10 sm:mt-12" dir="rtl" aria-labelledby="stylists-title">
      {/* HEADER */}
      <div className="mb-4 sm:mb-5 flex items-end justify-between">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-9 w-[3px] rounded-full bg-gradient-to-b from-[#C9A87C] to-[#E8B4B8]"
          />
          <div>
            <p className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#C9A87C]">
              OUR STYLISTS
            </p>
            <h3
              id="stylists-title"
              className="mt-1 text-sm sm:text-base font-bold text-[#5D3A3A] dark:text-[#F4F0E8] transition-colors duration-500"
            >
              آرایشگرهای ماهور
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => scrollByCard(1)} aria-label="قبلی" className={arrowClass}>
            <FaChevronRight className="text-[10px]" />
          </button>
          <button type="button" onClick={() => scrollByCard(-1)} aria-label="بعدی" className={arrowClass}>
            <FaChevronLeft className="text-[10px]" />
          </button>
        </div>
      </div>

      {/* TRACK */}
      <div className="-mx-4 sm:-mx-6 md:mx-0 [mask-image:linear-gradient(to_left,transparent,black_20px,black_calc(100%-20px),transparent)]">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto scroll-smooth px-4 sm:px-6 md:px-1 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STYLISTS.map((stylist) => (
            <StylistCard key={stylist.id} stylist={stylist} />
          ))}
        </div>
      </div>
    </section>
  );
}