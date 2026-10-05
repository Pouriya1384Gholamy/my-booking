import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="تغییر تم"
      className="
        relative flex h-10 w-10
        items-center justify-center
        overflow-hidden
        rounded-full
        border border-accent/30
        bg-surface
        text-accent
        shadow-sm
        transition-all duration-500
        hover:border-accent/70
        hover:shadow-md
        active:scale-95
      "
    >
      <FaSun
        className={`
          absolute text-sm text-accent
          transition-all duration-500
          ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
        `}
      />
      <FaMoon
        className={`
          absolute text-sm text-pink
          transition-all duration-500
          ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
        `}
      />
    </button>
  );
}

export default ThemeToggle;