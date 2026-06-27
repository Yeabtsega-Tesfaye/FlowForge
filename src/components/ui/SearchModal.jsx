import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CheckSquare, ArrowRight, Command } from "lucide-react";
import { useTaskStore } from "../../store/taskStore";
import { useTaskUIStore } from "../../store/taskModalStore";

function fuzzy(str, query) {
  const s = str.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return true;

  let si = 0;
  for (const ch of q) {
    si = s.indexOf(ch, si);
    if (si === -1) return false;
    si++;
  }
  return true;
}

function score(title, query) {
  const q = query.toLowerCase().trim();
  const label = title.toLowerCase();

  if (label.startsWith(q)) return 3;
  if (label.includes(q)) return 2;
  if (fuzzy(label, q)) return 1;

  return 0;
}

export default function SearchModal({ open, onClose }) {
  const { tasks } = useTaskStore();
  const { openTask } = useTaskUIStore();
  // eslint-disable-next-line no-unused-vars
  const toggleTaskStatus = useTaskStore((s) => s.toggleTaskStatus);

  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = query.trim()
    ? tasks
        .map((task) => ({ task, s: score(task.title, query) }))
        .filter(({ s }) => s > 0)
        .sort((a, b) => b.s - a.s)
        .map(({ task }) => task)
    : tasks.slice(0, 8);

  const flat = results;

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKey = useCallback(
    (e) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, flat.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      }

      if (e.key === "Enter") {
        const item = flat[cursor];
        if (item) selectItem(item);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, flat, cursor]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCursor(0);
  }, [query]);

  function selectItem(task) {
    onClose();
    openTask(task, "details");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
          />

          {/* CENTER WRAPPER */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative w-full max-w-2xl
                flex flex-col
                overflow-hidden
                rounded-[2rem]
                border border-white/10
                bg-zinc-900/90
                shadow-2xl shadow-black/50
                backdrop-blur-2xl
              "
            >
              {/* Top gradient line */}
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

              {/* Ambient glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05]" />

              {/* Noise overlay */}
              <div className="noise-overlay absolute inset-0" />

              {/* INPUT */}
              <div className="relative flex items-center gap-3 border-b border-white/10 px-6 py-5 transition-all duration-200 focus-within:bg-white/[0.02]">
                <Search size={18} className="text-zinc-500" />

                <input
                  autoFocus
                  type="text"
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-zinc-500 caret-blue-400 p-2 leading-normal"
                />

                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-zinc-500 hover:text-zinc-300 transition"
                  >
                    <X size={15} />
                  </button>
                )}

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
                {results.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
                      <Search size={20} className="text-zinc-500" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-white">
                      No results found
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500">
                      Try a different search term.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {results.map((task, idx) => {
                      const active = cursor === idx;

                      return (
                        <button
                          key={task.id}
                          data-idx={idx}
                          onMouseEnter={() => setCursor(idx)}
                          onClick={() => selectItem(task)}
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
                            <CheckSquare size={16} />
                          </div>

                          {/* Text */}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {task.title}
                            </p>
                            <p className="truncate text-xs text-zinc-500 mt-0.5">
                              {task.description || "No description"}
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

              {/* FOOTER */}
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}