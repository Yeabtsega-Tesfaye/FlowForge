import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import { motion } from "framer-motion";

import ThemeToggle from "../ui/ThemeToggle";

function Topbar({ setSidebarOpen }) {
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-20 items-center gap-4

        border-b border-white/5
        bg-zinc-950/70

        px-4
        backdrop-blur-2xl

        sm:px-6
        lg:px-8
      "
    >
      {/* Ambient Gradient */}
      <div
        className="
          pointer-events-none absolute
          inset-0 overflow-hidden
        "
      >
        <div
          className="
            absolute left-1/3 top-0
            h-32 w-32 rounded-full
            bg-blue-500/10 blur-3xl
          "
        />

        <div
          className="
            absolute right-0 top-0
            h-32 w-32 rounded-full
            bg-purple-500/10 blur-3xl
          "
        />
      </div>

      {/* Mobile Menu */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setSidebarOpen(true)}
        className="
          relative z-10

          rounded-2xl border border-white/5
          bg-white/[0.03]
          p-2.5

          text-zinc-400

          transition-all duration-300

          hover:border-white/10
          hover:bg-white/[0.06]
          hover:text-white

          lg:hidden
        "
      >
        <Menu size={20} />
      </motion.button>

      {/* Search */}
      <div
        className="
          relative z-10 hidden
          w-full max-w-md

          md:block
        "
      >
        <Search
          size={18}
          className="
            absolute left-4 top-1/2
            -translate-y-1/2

            text-zinc-500
          "
        />

        <input
          type="text"
          placeholder="Search tasks, analytics, AI tools..."
          className="
            w-full rounded-2xl

            border border-white/5
            bg-white/[0.03]

            py-3 pl-11 pr-4

            text-sm text-white

            outline-none

            transition-all duration-300

            placeholder:text-zinc-500

            hover:border-white/10
            hover:bg-white/[0.05]

            focus:border-blue-500/20
            focus:bg-white/[0.06]
            focus:shadow-[0_0_0_4px_rgba(59,130,246,0.08)]
          "
        />
      </div>

      {/* Right Side */}
      <div className="relative z-10 ml-auto flex items-center gap-3">
        <ThemeToggle />

        {/* Notifications */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="
            group relative

            rounded-2xl border border-white/5
            bg-white/[0.03]

            p-2.5

            text-zinc-400

            transition-all duration-300

            hover:border-white/10
            hover:bg-white/[0.06]
            hover:text-white
          "
        >
          {/* Hover Glow */}
          <div
            className="
              absolute inset-0 rounded-2xl

              bg-gradient-to-br
              from-blue-500/10
              to-purple-500/10

              opacity-0 blur-xl
              transition-opacity duration-300

              group-hover:opacity-100
            "
          />

          <Bell
            size={18}
            className="relative z-10"
          />

          {/* Notification Dot */}
          <span
            className="
              absolute right-2.5 top-2.5

              flex h-2.5 w-2.5
            "
          >
            <span
              className="
                absolute inline-flex h-full w-full
                animate-ping rounded-full
                bg-blue-400 opacity-75
              "
            />

            <span
              className="
                relative inline-flex
                h-2.5 w-2.5 rounded-full
                bg-blue-400
                shadow-[0_0_10px_rgba(96,165,250,0.9)]
              "
            />
          </span>
        </motion.button>

        {/* Avatar */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="
            group relative
          "
        >
          {/* Glow */}
          <div
            className="
              absolute inset-0 rounded-2xl

              bg-gradient-to-br
              from-blue-500/20
              to-purple-500/20

              opacity-0 blur-xl
              transition-opacity duration-300

              group-hover:opacity-100
            "
          />

          <div
            className="
              relative flex h-11 w-11
              items-center justify-center

              rounded-2xl

              border border-white/10

              bg-gradient-to-br
              from-blue-500
              via-indigo-500
              to-purple-600

              text-sm font-semibold
              text-white

              shadow-lg shadow-blue-500/20
            "
          >
            Y
          </div>
        </motion.button>
      </div>
    </header>
  );
}

export default Topbar;