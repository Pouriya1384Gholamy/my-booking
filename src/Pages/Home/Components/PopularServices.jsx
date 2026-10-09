import React, { useState } from "react";
import {
  FaFire,
  FaCheck,
  FaChevronLeft,
  FaSearch,
  FaSlidersH,
} from "react-icons/fa";
import { SERVICES } from "../data";

export default function PopularServices() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = SERVICES.find((s) => s.id === selectedId);

  const handleSelect = (id) =>
    setSelectedId((prev) => (prev === id ? null : id));

  return (
    <section className="mt-6 sm:mt-8" dir="rtl" aria-labelledby="popular-services-title">
      {/* ============ SEARCH BOX ============ */}
      <div className="flex gap-2 sm:gap-2.5">
        <div className="group flex min-h-[46px] sm:min-h-[52px] flex-1 items-center gap-2 sm:gap-3 rounded-2xl border border-[#5D3A3A]/8 dark:border-white/10 bg-white dark:bg-[#2A2A2A] px-3 sm:px-4 shadow-[0_10px_30px_rgba(201,168,124,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-colors duration-500 focus-within:ring-4 focus-within:ring-[#E8B4B8]/20">
          <FaSearch className="shrink-0 text-xs sm:text-sm text-[#C9A87C] transition group-focus-within:scale-110" />
          <input
            type="text"
            placeholder="جستجو در خدمات سالن..."
            className="min-w-0 flex-1 bg-transparent text-right text-xs sm:text-sm text-[#5D3A3A] dark:text-[#F4F0E8] outline-none placeholder:text-[#B8A8A8] dark:placeholder:text-white/30 transition-colors duration-500"
          />
        </div>

        <button
          className="flex h-[46px] w-[46px] sm:h-[52px] sm:w-[52px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C9A87C] to-[#B8956A] text-white shadow-[0_10px_25px_rgba(201,168,124,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(201,168,124,0.5)] active:scale-95"
          aria-label="فیلترها"
        >
          <FaSlidersH className="text-xs sm:text-sm" />
        </button>
      </div>

      {/* ============ HEADER ============ */}
      <div className="mt-6 sm:mt-7 mb-4 sm:mb-5 flex items-end justify-between">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-9 w-[3px] rounded-full bg-gradient-to-b from-[#C9A87C] to-[#E8B4B8]"
          />
          <div>
            <p className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#C9A87C]">
              POPULAR SERVICES
            </p>
            <h3
              id="popular-services-title"
              className="mt-1 text-sm sm:text-base font-bold text-[#5D3A3A] dark:text-[#F4F0E8] transition-colors duration-500"
            >
              خدمات محبوب
            </h3>
          </div>
        </div>

        <button
          type="button"
          className="group flex items-center gap-1 rounded-full border border-[#C9A87C]/30 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1.5 text-[10px] sm:text-xs text-[#8B6F6F] dark:text-white/50 transition hover:border-[#C9A87C] hover:text-[#C9A87C]"
        >
          مشاهده همه
          <FaChevronLeft className="text-[7px] transition-transform group-hover:-translate-x-0.5" />
        </button>
      </div>

      {/* ============ SERVICE ARCHES ============ */}
      <div className="-mx-4 sm:-mx-6 md:mx-0 [mask-image:linear-gradient(to_left,transparent,black_20px,black_calc(100%-20px),transparent)]">
        <div className="flex snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-6 md:px-1 pb-5 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICES.map((service) => {
            const isSelected = selectedId === service.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleSelect(service.id)}
                aria-pressed={isSelected}
                className={`group relative shrink-0 snap-start h-[140px] w-[96px] sm:h-[156px] sm:w-[108px] rounded-t-full rounded-b-[22px] border outline-none transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] focus-visible:ring-4 focus-visible:ring-[#E8B4B8]/40 ${
                  isSelected
                    ? "-translate-y-1.5 border-[#C9A87C] bg-gradient-to-b from-[#C9A87C] to-[#B8956A] shadow-[0_14px_30px_rgba(201,168,124,0.45)]"
                    : "border-[#C9A87C]/25 dark:border-white/10 bg-gradient-to-b from-white to-[#FAEDE6] dark:from-[#2E2E2E] dark:to-[#242424] shadow-[0_8px_20px_rgba(201,168,124,0.12)] hover:-translate-y-1 hover:border-[#C9A87C]/60"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-1.5 rounded-t-full rounded-b-[16px] border transition-colors duration-500 ${
                    isSelected
                      ? "border-white/40"
                      : "border-[#C9A87C]/20 dark:border-white/[0.07] group-hover:border-[#C9A87C]/40"
                  }`}
                />

                {service.hot && !isSelected && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#E8B4B8] to-[#C9A87C] text-white shadow-md ring-2 ring-[#FDF6F0] dark:ring-[#1F1F1F]">
                    <FaFire className="text-[8px]" />
                  </span>
                )}

                {isSelected && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#B8956A] shadow-md ring-2 ring-[#FDF6F0] dark:ring-[#1F1F1F]">
                    <FaCheck className="text-[8px]" />
                  </span>
                )}

                <span className="relative z-10 flex h-full flex-col items-center justify-end gap-1 pb-3.5 sm:pb-4">
                  <span
                    className={`mb-1.5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-lg sm:text-xl transition-all duration-500 ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#C9A87C]/10 dark:bg-[#C9A87C]/15 text-[#C9A87C] group-hover:bg-[#C9A87C]/20 group-hover:scale-110"
                    }`}
                  >
                    {service.icon}
                  </span>
                  <span
                    className={`text-[11px] sm:text-xs font-bold leading-none transition-colors duration-500 ${
                      isSelected ? "text-white" : "text-[#5D3A3A] dark:text-[#F4F0E8]"
                    }`}
                  >
                    {service.name}
                  </span>
                  <span
                    className={`text-[8px] sm:text-[9px] leading-none transition-colors duration-500 ${
                      isSelected ? "text-white/80" : "text-[#8B6F6F] dark:text-white/40"
                    }`}
                  >
                    {service.meta}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ QUICK BOOK BAR ============ */}
      {selected && (
        <div
          key={selected.id}
          className="animate-slideIn mt-1 flex items-center justify-between gap-3 rounded-2xl border border-[#C9A87C]/30 dark:border-white/10 bg-white/80 dark:bg-[#2A2A2A]/80 p-2.5 sm:p-3 shadow-[0_10px_30px_rgba(201,168,124,0.15)] backdrop-blur-md"
          role="status"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#C9A87C]/10 dark:bg-[#C9A87C]/15 text-sm text-[#C9A87C]">
              {selected.icon}
            </span>
            <div className="min-w-0">
              <p className="text-[9px] text-[#8B6F6F] dark:text-white/40">خدمت انتخابی</p>
              <p className="truncate text-xs font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
                {selected.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-br from-[#C9A87C] to-[#B8956A] px-3.5 py-2 text-[11px] font-medium text-white shadow-[0_8px_20px_rgba(201,168,124,0.3)] transition hover:-translate-y-0.5 active:scale-[0.97]"
          >
            رزرو نوبت
            <FaChevronLeft className="text-[8px]" />
          </button>
        </div>
      )}
    </section>
  );
}