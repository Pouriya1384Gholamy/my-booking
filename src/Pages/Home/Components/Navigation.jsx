import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NAV_ITEMS } from "../data";

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navContent = (
    <nav
      className="fixed left-1/2 -translate-x-1/2 bottom-4 w-[calc(100%-2.5rem)] max-w-[460px] flex items-center justify-between h-20 rounded-[20px] bg-white dark:bg-[#2A2A2A] px-[15px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-colors duration-500 z-[9999]"
      dir="rtl"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="group relative flex flex-1 h-full flex-col items-center justify-center pt-2.5 cursor-pointer transition-all duration-300"
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <div
              className={`relative z-[2] flex h-[40px] w-[40px] items-center justify-center rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                isActive
                  ? "bg-transparent dark:bg-[#daa259] text-[#C9A87C] dark:text-white -translate-y-5 dark:shadow-[0_5px_15px_rgba(201,168,124,0.4)]"
                  : "text-[#8b8b8b] dark:text-white/40 group-hover:text-[#C9A87C]"
              }`}
            >
              {isActive && (
                <span className="absolute -inset-1 rounded-full bg-[#FDF6F0] dark:bg-[#2A2A2A] -z-10 border border-[#C9A87C]/40 shadow-[0_4px_10px_rgba(201,168,124,0.15)]" />
              )}
              <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:stroke-2 [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round] [&>svg]:transition-all [&>svg]:duration-300">
                {item.icon}
              </span>
            </div>

            <span
              className={`mt-[5px] text-[11px] font-semibold transition-all duration-300 ${
                isActive
                  ? "text-[#C9A87C] dark:text-[#F4F0E8] font-bold -translate-y-2.5 opacity-100"
                  : "text-[#8b8b8b] dark:text-white/40 opacity-80"
              }`}
            >
              {item.label}
            </span>

            <span
              className={`mt-1 h-[3px] w-5 rounded-[10px] bg-[#C9A87C] transition-all duration-300 ${
                isActive ? "opacity-100 scale-x-100 -translate-y-2.5" : "opacity-0 scale-x-0"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );

  if (!mounted) return null;
  return createPortal(navContent, document.body);
}