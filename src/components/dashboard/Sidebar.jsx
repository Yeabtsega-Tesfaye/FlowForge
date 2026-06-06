import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { navigation } from "../../data/navigation";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="
              fixed inset-0 z-40
              bg-black/70 backdrop-blur-md
              lg:hidden
            "
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-white/10
          bg-zinc-950/80
          backdrop-blur-2xl
          transition-transform duration-300
          noise-overlay

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* Ambient Glow */}
        <div
          className="
            pointer-events-none absolute inset-0
            overflow-hidden
          "
        >
          <div
            className="
              absolute -left-24 top-0
              h-72 w-72 rounded-full
              bg-blue-500/10 blur-3xl
            "
          />

          <div
            className="
              absolute bottom-0 left-10
              h-64 w-64 rounded-full
              bg-purple-500/10 blur-3xl
            "
          />
        </div>

        {/* Header */}
        <div
          className="
            relative flex h-20 items-center
            justify-between
            border-b border-white/5
            px-6
          "
        >
          <div className="space-y-1">
            <h1
              className="
                text-xl font-semibold tracking-tight
                text-gradient
              "
            >
              FlowForge
            </h1>

            <p
              className="
                text-xs font-medium
                uppercase tracking-[0.18em]
                text-zinc-500
              "
            >
              Productivity Platform
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="
              rounded-xl border border-white/5
              bg-white/[0.03] p-2
              text-zinc-400
              transition-all duration-200

              hover:border-white/10
              hover:bg-white/[0.06]
              hover:text-white

              active:scale-95

              lg:hidden
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 space-y-2 px-4 py-6">
          {navigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.04,
                }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    group relative flex items-center
                    gap-3 overflow-hidden
                    rounded-2xl px-4 py-3.5

                    text-sm font-medium

                    transition-all duration-300

                    ${
                      isActive
                        ? `
                          border border-white/10
                          bg-white/[0.06]
                          text-white
                          shadow-lg
                        `
                        : `
                          text-zinc-400

                          hover:border hover:border-white/5
                          hover:bg-white/[0.04]
                          hover:text-white
                        `
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Glow */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-pill"
                          className="
                            absolute inset-0
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-500/10
                            to-purple-500/10
                          "
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 24,
                          }}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={`
                          relative z-10 flex h-9 w-9
                          items-center justify-center
                          rounded-xl transition-all duration-300

                          ${
                            isActive
                              ? `
                                bg-gradient-to-br
                                from-blue-500/20
                                to-purple-500/20

                                text-blue-300
                              `
                              : `
                                bg-white/[0.03]

                                text-zinc-500

                                group-hover:text-zinc-200
                              `
                          }
                        `}
                      >
                        <Icon size={18} />
                      </div>

                      {/* Label */}
                      <span className="relative z-10 tracking-tight">
                        {item.name}
                      </span>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="
                            absolute right-3
                            h-2 w-2 rounded-full
                            bg-blue-400
                            shadow-[0_0_12px_rgba(96,165,250,0.9)]
                          "
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div
          className="
            relative border-t border-white/5
            p-4
          "
        >
          <div
            className="
              group relative overflow-hidden
              rounded-2xl border border-white/5
              bg-white/[0.03]
              p-4

              transition-all duration-300

              hover:border-white/10
              hover:bg-white/[0.05]
            "
          >
            {/* Glow */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-br
                from-blue-500/[0.08]
                to-purple-500/[0.08]
                opacity-0 transition-opacity duration-300

                group-hover:opacity-100
              "
            />

            <div className="relative flex items-center gap-3">
              {/* Avatar */}
              <div
                className="
                  flex h-11 w-11 items-center
                  justify-center rounded-2xl

                  bg-gradient-to-br
                  from-blue-500
                  via-indigo-500
                  to-purple-600

                  text-sm font-semibold text-white

                  shadow-lg shadow-blue-500/20
                "
              >
                Y
              </div>

              {/* User Info */}
              <div className="min-w-0">
                <p
                  className="
                    truncate text-sm
                    font-semibold text-white
                  "
                >
                  Yeabtsega
                </p>

                <p
                  className="
                    truncate text-xs
                    text-zinc-500
                  "
                >
                  Software Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;