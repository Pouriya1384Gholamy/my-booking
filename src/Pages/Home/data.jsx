import React from "react";
import {
  FaCut,
  FaSpa,
  FaPaintBrush,
  FaEye,
  FaHandSparkles,
  FaMagic,
} from "react-icons/fa";

/* ============ NAV ITEMS ============ */
export const NAV_ITEMS = [
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

/* ============ SERVICES ============ */
export const SERVICES = [
  { id: 1, name: "ناخن", icon: <FaHandSparkles />, meta: "۱۸ متخصص", hot: true },
  { id: 2, name: "کوتاهی مو", icon: <FaCut />, meta: "۱۲ متخصص" },
  { id: 3, name: "ابرو و مژه", icon: <FaEye />, meta: "۹ متخصص" },
  { id: 4, name: "میکاپ", icon: <FaPaintBrush />, meta: "۱۴ متخصص", hot: true },
  { id: 5, name: "پوست", icon: <FaSpa />, meta: "۱۱ متخصص" },
  { id: 6, name: "رنگ مو", icon: <FaMagic />, meta: "۱۰ متخصص" },
];

/* ============ STYLISTS ============ */
export const STYLISTS = [
  { id: 1, name: "سارا احمدی", role: "متخصص رنگ و مش", rating: 4.9, reviews: 240, img: "https://i.pravatar.cc/300?img=5", next: "امروز ۱۶:۰۰", available: true },
  { id: 2, name: "نیلوفر کرمی", role: "میکاپ آرتیست", rating: 4.8, reviews: 186, img: "https://i.pravatar.cc/300?img=9", next: "امروز ۱۸:۳۰", available: true },
  { id: 3, name: "مهسا رضایی", role: "متخصص ناخن", rating: 4.7, reviews: 131, img: "https://i.pravatar.cc/300?img=16", next: "فردا ۱۰:۰۰", available: false },
  { id: 4, name: "الهام صادقی", role: "پوست و مو", rating: 5.0, reviews: 98, img: "https://i.pravatar.cc/300?img=20", next: "امروز ۱۷:۰۰", available: true },
  { id: 5, name: "ریحانه موسوی", role: "شینیون و کوتاهی", rating: 4.8, reviews: 207, img: "https://i.pravatar.cc/300?img=23", next: "فردا ۱۱:۳۰", available: false },
  { id: 6, name: "پریسا نوری", role: "ابرو و مژه", rating: 4.9, reviews: 154, img: "https://i.pravatar.cc/300?img=32", next: "امروز ۱۹:۰۰", available: true },
];