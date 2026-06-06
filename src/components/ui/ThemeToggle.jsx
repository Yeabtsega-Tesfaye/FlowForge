import { Moon, Sun } from "lucide-react";

import { useThemeStore } from "../../store/themeStore";

function ThemeToggle() {
  const { theme, toggleTheme } =
    useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="
        rounded-xl p-2.5
        text-zinc-400 transition
        hover:bg-zinc-800
        hover:text-white
      "
    >
      {theme === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}

export default ThemeToggle;