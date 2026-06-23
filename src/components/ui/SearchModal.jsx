import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CheckSquare, ArrowRight } from "lucide-react";
import { useTaskStore } from "../../store/taskStore";

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

  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = query.trim()
    ? tasks
        .map((task) => ({
          task,
          s: score(task.title, query),
        }))
        .filter(({ s }) => s > 0)
        .sort((a, b) => b.s - a.s)
        .map(({ task }) => task)
    : tasks.slice(0, 8);

  const flat = results;

  useEffect(() => {
    if (open) {
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
    const el = listRef.current?.querySelector(
      `[data-idx="${cursor}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  function selectItem(task) {
    onClose();
    console.log("selected:", task);
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* CENTER WRAPPER */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={onClose}>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-2xl
                flex flex-col
                overflow-hidden
                rounded-2xl
                border border-white/10
                bg-zinc-900/95
                shadow-2xl shadow-black/50
                backdrop-blur-2xl
              "
            >
              {/* INPUT */}
              <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3.5">
                <Search size={18} className="text-zinc-400" />

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                />

                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-zinc-500 hover:text-zinc-300 transition"
                  >
                    <X size={15} />
                  </button>
                )}

                <kbd className="hidden sm:inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] text-zinc-500">
                  esc
                </kbd>
              </div>

              {/* RESULTS */}
              <div
                ref={listRef}
                className="max-h-[420px] overflow-y-auto py-2"
              >
                {results.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-12 text-zinc-500">
                    <Search size={24} className="opacity-40" />
                    <p className="text-sm">No results for "{query}"</p>
                  </div>
                ) : (
                  results.map((task, idx) => {
                    const active = cursor === idx;

                    return (
                      <button
                        key={task.id}
                        data-idx={idx}
                        onMouseEnter={() => setCursor(idx)}
                        onClick={() => selectItem(task)}
                        className={`
                          group flex w-full items-center gap-3
                          px-4 py-2.5 text-left
                          transition-colors duration-100
                          ${
                            active
                              ? "bg-white/[0.06] text-white"
                              : "text-zinc-300 hover:bg-white/[0.04]"
                          }
                        `}
                      >
                        <div
                          className={`
                            flex h-8 w-8 shrink-0 items-center justify-center
                            rounded-xl border
                            ${
                              active
                                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                                : "border-white/5 bg-white/[0.03] text-zinc-400"
                            }
                          `}
                        >
                          <CheckSquare size={15} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {task.title}
                          </p>
                          <p className="truncate text-xs text-zinc-500 mt-0.5">
                            {task.description || "No description"}
                          </p>
                        </div>

                        <ArrowRight
                          size={14}
                          className={`
                            transition-all
                            ${
                              active
                                ? "opacity-100"
                                : "opacity-0 translate-x-1"
                            }
                          `}
                        />
                      </button>
                    );
                  })
                )}
              </div>

              {/* FOOTER */}
              <div className="flex items-center gap-4 border-t border-white/5 px-4 py-2.5 text-[11px] text-zinc-600">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> open</span>
                <span><kbd className="font-mono">esc</kbd> close</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}