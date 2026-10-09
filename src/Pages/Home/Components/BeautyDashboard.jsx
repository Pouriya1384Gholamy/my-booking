import React, { useState } from "react";
import {
  FaHeart,
  FaClock,
  FaFire,
  FaCheckCircle,
  FaChevronLeft,
  FaSpa,
  FaPaintBrush,
  FaCut,
} from "react-icons/fa";

/* ============ TAB BUTTON ============ */
function DashboardTab({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1 sm:gap-1.5 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-medium transition-all duration-300 ${
        active
          ? "bg-white dark:bg-[#2A2A2A] text-[#C9A87C] shadow-[0_2px_8px_rgba(201,168,124,0.15)]"
          : "text-[#8B6F6F] dark:text-white/40 hover:text-[#C9A87C]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ============ STAT ============ */
function DashboardStat({ value, label }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-[#FDF6F0] dark:bg-white/5 py-2">
      <span className="font-serif text-xs sm:text-sm font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
        {value}
      </span>
      <span className="mt-0.5 text-[7px] sm:text-[8px] text-[#8B6F6F] dark:text-white/40">
        {label}
      </span>
    </div>
  );
}

/* ============ TRENDING SERVICE ============ */
function TrendingService({ icon, title, bookings, rank }) {
  const rankColors = {
    1: "bg-gradient-to-br from-[#C9A87C] to-[#B8956A] text-white",
    2: "bg-gradient-to-br from-[#E8B4B8] to-[#C9A87C] text-white",
    3: "bg-gradient-to-br from-[#B8A8A8] to-[#8B6F6F] text-white",
  };

  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-[#FDF6F0]/70 dark:bg-white/5 px-2.5 py-2 transition hover:bg-[#C9A87C]/10 hover:translate-x-[-2px]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-white/10 text-[#C9A87C] shadow-sm">
        <span className="text-[10px]">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[9px] sm:text-[10px] font-medium text-[#5D3A3A] dark:text-[#F4F0E8]">
          {title}
        </p>
        <p className="mt-0.5 text-[7px] sm:text-[8px] text-[#8B6F6F] dark:text-white/40">
          این هفته {bookings}
        </p>
      </div>
      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold shadow-sm ${rankColors[rank] || "bg-[#C9A87C]/20 text-[#C9A87C]"}`}>
        {rank}
      </div>
    </div>
  );
}

/* ============ TAB CONTENTS ============ */
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
        <span className="text-[8px] text-[#8B6F6F] dark:text-white/40">وضعیت امروز</span>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        <DashboardStat value="۳۴" label="نوبت آزاد" />
        <DashboardStat value="۱۲" label="متخصص فعال" />
        <DashboardStat value="۸" label="خدمت ویژه" />
      </div>

      <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#FDF6F0] to-[#F5DCD5] dark:from-white/5 dark:to-white/[0.02] p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-[#C9A87C]">
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
          <span className="rounded-full bg-[#9DB89C]/15 px-2 py-1 text-[7px] sm:text-[8px] font-medium text-[#6B8A6A]">
            {hasNextBooking ? "تأیید شده" : "آماده‌ای؟"}
          </span>
        </div>

        <div className="mt-2">
          <p className="text-[8px] sm:text-[9px] leading-4 text-[#8B6F6F] dark:text-white/40">
            وقتشه یه تجربه جدید برای خودت انتخاب کنی ✨
          </p>
          <button className="mt-2.5 flex w-full items-center justify-between rounded-xl bg-gradient-to-br from-[#C9A87C] to-[#B8956A] px-3 py-2.5 text-[12px] font-medium text-white shadow-[0_8px_20px_rgba(201,168,124,0.25)] transition hover:-translate-y-0.5 active:scale-[0.98]">
            <span>رزرو نوبت</span>
            <FaChevronLeft className="text-[8px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusTab() {
  return (
    <div className="animate-slideIn">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] sm:text-[9px] tracking-[0.18em] text-[#C9A87C]">BEAUTY STATUS</p>
          <h4 className="mt-1 text-[10px] sm:text-xs font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            وضعیت زیبایی تو
          </h4>
        </div>
        <span className="text-[9px] font-bold text-[#6B8A6A]">عالی</span>
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#9DB89C]/20 bg-gradient-to-br from-[#9DB89C]/10 to-[#9DB89C]/5 p-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9DB89C]/20 text-[#6B8A6A]">
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
          <p className="text-[7px] text-[#8B6F6F] dark:text-white/40">آخرین بازدید</p>
          <p className="mt-0.5 text-[9px] font-medium text-[#5D3A3A] dark:text-[#F4F0E8]">۱۲ روز پیش</p>
        </div>
        <div className="rounded-xl bg-[#FDF6F0] dark:bg-white/5 px-2.5 py-2">
          <p className="text-[7px] text-[#8B6F6F] dark:text-white/40">پیشنهاد امروز</p>
          <p className="mt-0.5 text-[9px] font-medium text-[#C9A87C]">فیشیال + آبرسانی</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <span className="text-[8px] sm:text-[9px] text-[#8B6F6F] dark:text-white/40">
            پیشرفت برنامه‌ی ماهانه
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold text-[#C9A87C]">۷۵٪</span>
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

function TrendingTab() {
  return (
    <div className="animate-slideIn">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] sm:text-[9px] tracking-[0.18em] text-[#C9A87C]">TRENDING</p>
          <h4 className="mt-1 text-[10px] sm:text-xs font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            خدمات ترند این هفته
          </h4>
        </div>
        <span className="text-[8px] text-[#C9A87C]">محبوب‌ترین‌ها</span>
      </div>

      <div className="mt-2.5 space-y-2">
        <TrendingService icon={<FaSpa />} title="فیشیال و آبرسانی" bookings="۴۸ رزرو" rank={1} />
        <TrendingService icon={<FaPaintBrush />} title="میکاپ لایت" bookings="۳۶ رزرو" rank={2} />
        <TrendingService icon={<FaCut />} title="رنگ و مش" bookings="۲۹ رزرو" rank={3} />
      </div>
    </div>
  );
}

/* ============ MAIN CARD ============ */
export default function BeautyDashboard() {
  const hasNextBooking = false;
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div
      className="w-full rounded-[20px] sm:rounded-[24px] md:rounded-[30px] border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#2A2A2A]/80 p-3.5 sm:p-4 md:p-5 shadow-[0_20px_50px_rgba(201,168,124,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors duration-500"
      dir="rtl"
    >
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <div>
          <p className="text-[8px] sm:text-[9px] tracking-[0.22em] text-[#C9A87C]">
            YOUR BEAUTY SPACE
          </p>
          <h3 className="mt-1 text-xs sm:text-sm font-bold text-[#5D3A3A] dark:text-[#F4F0E8]">
            فضای زیبایی تو
          </h3>
        </div>
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#C9A87C]/10 text-[#C9A87C]">
          <FaHeart className="text-[10px] sm:text-xs" />
        </div>
      </div>

      <div className="flex gap-1 rounded-2xl bg-[#FDF6F0]/60 dark:bg-white/5 p-1">
        <DashboardTab
          active={activeTab === "today"}
          onClick={() => setActiveTab("today")}
          icon={<FaClock className="text-[10px]" />}
          label="امروز"
        />
        <DashboardTab
          active={activeTab === "status"}
          onClick={() => setActiveTab("status")}
          icon={<FaHeart className="text-[10px]" />}
          label="وضعیت"
        />
        <DashboardTab
          active={activeTab === "trending"}
          onClick={() => setActiveTab("trending")}
          icon={<FaFire className="text-[10px]" />}
          label="ترند"
        />
      </div>

      <div className="mt-3.5 sm:mt-4">
        {activeTab === "today" && <TodayTab hasNextBooking={hasNextBooking} />}
        {activeTab === "status" && <StatusTab />}
        {activeTab === "trending" && <TrendingTab />}
      </div>
    </div>
  );
}