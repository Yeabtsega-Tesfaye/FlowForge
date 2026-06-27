import { Search, Command, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { commandItems } from "../../data/commandPalette";
import { useCommandPaletteStore } from "../../store/commandPaletteStore";
import { useTaskUIStore } from "../../store/taskModalStore";
import { useNotificationStore } from "../../store/notificationStore";

function CommandPalette() {
  // eslint-disable-next-line no-unused-vars
  const { open, openPalette, closePalette } = useCommandPaletteStore();
  const { openTask } = useTaskUIStore();
  const { markAllAsRead, clearNotifications } = useNotificationStore();

  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const navigate = useNavigate();
  const listRef = useRef(null);

  // Filtered Commands
  const filteredItems = useMemo(() => {
    return commandItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Reset cursor when query changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCursor(0);
  }, [query]);

  // Reset state on open
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setCursor(0);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

const handleSelect = useCallback(
  (item) => {
    if (item.action) {
      item.action({ 
         openTask,
         markAllAsRead,
        clearNotifications,
       });
    } else if (item.path) {
      navigate(item.path);
    }

    closePalette();
    setQuery("");
  },
  [
    navigate, 
    closePalette, 
    openTask, 
    markAllAsRead,
    clearNotifications,
  ]
);

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, filteredItems.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      }

      if (e.key === "Enter") {
        const item = filteredItems[cursor];
        if (item) handleSelect(item);
      }

      if (e.key === "Escape") {
        closePalette();
      }
    },
    [open, filteredItems, cursor, handleSelect, closePalette]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md"
          />

          {/* CENTER WRAPPER */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={closePalette}
            className="fixed inset-0 z-[130] flex items-center justify-center px-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                relative overflow-hidden
                w-full max-w-xl sm:max-w-2xl lg:max-w-3xl
                rounded-[2rem]
                border border-white/10
                bg-zinc-900/90
                shadow-2xl shadow-black/40
                backdrop-blur-2xl
              "
            >
              {/* Top gradient line — now correctly inside the modal */}
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

              {/* Ambient glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05]" />

              {/* Noise overlay */}
              <div className="noise-overlay absolute inset-0" />

              {/* SEARCH INPUT */}
              <div className="relative flex items-center gap-3 border-b border-white/10 px-6 py-5 transition-all duration-200 focus-within:bg-white/[0.02]">
                <Search size={18} className="text-zinc-500" />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search commands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent p-2 text-[15px] text-white outline-none placeholder:text-zinc-500 caret-blue-400 leading-normal"
                />

                <div className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-zinc-500 sm:flex">
                  <Command size={12} />
                  K
                </div>
              </div>

              {/* RESULTS */}
              <div
                ref={listRef}
                className="relative max-h-[420px] overflow-y-auto p-3"
              >
                {filteredItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
                      <Search size={20} className="text-zinc-500" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-white">
                      No commands found
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500">
                      Try another search term.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredItems.map((item, idx) => {
                      const Icon = item.icon;
                      const active = cursor === idx;

                      return (
                        <button
                          key={item.id}
                          data-idx={idx}
                          onMouseEnter={() => setCursor(idx)}
                          onClick={() => handleSelect(item)}
                          className={`
                            group flex w-full items-center gap-4
                            rounded-2xl px-4 py-3 text-left
                            transition-all duration-200
                            ${
                              active
                                ? "bg-white/[0.06] text-white"
                                : "text-zinc-300 hover:bg-white/[0.04]"
                            }
                          `}
                        >
                          {/* Icon */}
                          <div
                            className={`
                              flex h-10 w-10 shrink-0 items-center justify-center
                              rounded-2xl border
                              transition-all duration-200
                              ${
                                active
                                  ? "border-blue-500/30 bg-blue-500/10 text-blue-400 scale-105"
                                  : "border-white/10 bg-white/[0.03] text-zinc-400 group-hover:scale-105 group-hover:text-white"
                              }
                            `}
                          >
                            <Icon size={18} />
                          </div>

                          {/* Text */}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-xs text-zinc-500">
                              {item.category}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ArrowRight
                            size={14}
                            className={`
                              shrink-0 transition-all duration-200
                              ${active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1"}
                            `}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* FOOTER — keyboard hints */}
              <div className="relative flex items-center gap-4 border-t border-white/5 px-6 py-3 text-[11px] text-zinc-600">
                <span>
                  <kbd className="font-mono">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> open
                </span>
                <span>
                  <kbd className="font-mono">esc</kbd> close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;