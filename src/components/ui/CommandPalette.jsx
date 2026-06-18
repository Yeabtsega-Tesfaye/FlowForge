import {
  Search,
  Command,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { commandItems } from "../../data/commandPalette";
import { useCommandPaletteStore } from "../../store/commandPaletteStore";

function CommandPalette() {
  // eslint-disable-next-line no-unused-vars
  const { open, openPalette, closePalette } = useCommandPaletteStore();

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Keyboard Shortcut
  useEffect(() => {
    const down = (e) => {
      // FIXED: Removed the Ctrl+K listener from here so it doesn't fight with App.jsx
      if (e.key === "Escape") {
        closePalette();
      }
    };

    window.addEventListener("keydown", down);

    return () =>
      window.removeEventListener(
        "keydown",
        down
      );
  }, [closePalette]);

  // Filtered Commands
  const filteredItems = useMemo(() => {
    return commandItems.filter((item) =>
      item.title
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  const handleSelect = (path) => {
    navigate(path);

    closePalette();

    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closePalette()}
            className="
              fixed inset-0 z-[120]

              bg-black/60

              backdrop-blur-md
            "
          />

          {/* Ambient Ring */}
<div
  className="
    pointer-events-none absolute
    inset-0 rounded-[2rem]

    ring-1 ring-white/10
    ring-inset
  "
/>

{/* Top Glow */}
<div
  className="
    absolute left-0 top-0
    h-px w-full

    bg-gradient-to-r
    from-transparent
    via-blue-400/50
    to-transparent
  "
/>

<motion.div
  initial={{
    opacity: 0,
    y: 10,
    scale: 0.96,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  exit={{
    opacity: 0,
    y: 10,
    scale: 0.96,
  }}
  transition={{
    duration: 0.18,
  }}
  onClick={() => closePalette()}
  className="
    fixed inset-0
    z-[130]

    flex items-center
    justify-center

    px-4
  "
>
<div
  onClick={(e) => e.stopPropagation()}
  className="
    relative overflow-hidden

    w-full
    max-w-xl
    sm:max-w-2xl
    lg:max-w-3xl

    rounded-[2rem]

    border border-white/10

    bg-zinc-900/90

    shadow-2xl
    shadow-black/40

    backdrop-blur-2xl
  "
>
              {/* Ambient Glow */}
              <div
                className="
                  pointer-events-none
                  absolute inset-0

                  bg-gradient-to-br
                  from-blue-500/[0.05]
                  to-purple-500/[0.05]
                "
              />

              <div className="noise-overlay absolute inset-0" />

              {/* Search */}
<div
  className="
    relative flex items-center
    gap-3

    border-b border-white/10

    px-6 py-5

    transition-all duration-200

    focus-within:bg-white/[0.02]
  "
>
                <Search
                  size={18}
                  className="text-zinc-500"
                />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search commands..."
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
className="
  w-full bg-transparent

  py-1

  text-[15px]
  text-white

  outline-none

  placeholder:text-zinc-500

  caret-blue-400
"
                />

                <div
                  className="
                    hidden items-center
                    gap-1 rounded-lg

                    border border-white/10

                    bg-white/[0.03]

                    px-2 py-1

                    text-[10px]
                    text-zinc-500

                    sm:flex
                  "
                >
                  <Command size={12} />
                  K
                </div>
              </div>

              {/* Results */}
              <div
                className="
                  relative max-h-[420px]
                  overflow-y-auto p-3
                "
              >
                <div className="space-y-1">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          handleSelect(item.path)
                        }
                        className="
                          group flex w-full
                          items-center gap-4

                          rounded-2xl

                          px-4 py-3

                          text-left

                          transition-all
                          duration-200

                          hover:bg-white/[0.05]
                        "
                      >
                        <div
                          className="
                            flex h-10 w-10
                            items-center
                            justify-center

                            rounded-2xl

                            border border-white/10

                            bg-white/[0.03]

                            text-zinc-300

                            transition-all
                            duration-200

                            group-hover:scale-105
                            group-hover:text-white
                          "
                        >
                          <Icon size={18} />
                        </div>

                        <div className="flex-1">
                          <p
                            className="
                              text-sm
                              font-medium
                              text-white
                            "
                          >
                            {item.title}
                          </p>

                          <p
                            className="
                              mt-1 text-xs
                              text-zinc-500
                            "
                          >
                            {item.category}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Empty */}
                {filteredItems.length === 0 && (
                  <div
                    className="
                      flex flex-col
                      items-center
                      justify-center

                      py-16 text-center
                    "
                  >
                    <div
                      className="
                        flex h-14 w-14
                        items-center
                        justify-center

                        rounded-3xl

                        border border-white/10

                        bg-white/[0.03]
                      "
                    >
                      <Search
                        size={20}
                        className="text-zinc-500"
                      />
                    </div>

                    <h3
                      className="
                        mt-5 text-lg
                        font-medium
                        text-white
                      "
                    >
                      No commands found
                    </h3>

                    <p
                      className="
                        mt-2 text-sm
                        text-zinc-500
                      "
                    >
                      Try another search term.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;