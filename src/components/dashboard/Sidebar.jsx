import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { navigation } from "../../data/navigation";
import { useSidebarStore } from "../../store/sidebarStore";
import { useAuthStore } from "../../store/authStore";

import Avatar from "../ui/Avatar";

function Tooltip({ label, show }) {
  if (!show) return null;
  return (
    <div
      className="
        pointer-events-none absolute left-full
        ml-3 z-50
        whitespace-nowrap rounded-xl
        border border-white/10
        bg-zinc-900 px-3 py-1.5
        text-xs font-medium text-white
        shadow-xl
      "
    >
      {label}
      {/* Arrow */}
      <div
        className="
          absolute -left-1 top-1/2
          -translate-y-1/2
          h-2 w-2 rotate-45
          border-b border-l border-white/10
          bg-zinc-900
        "
      />
    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { collapsed, toggleCollapsed } = useSidebarStore();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHoveringCollapsed, setIsHoveringCollapsed] = useState(false);

  const user = useAuthStore((s) => s.user);

  // When collapsed + hovering sidebar, show expanded temporarily
  const isExpanded = !collapsed || isHoveringCollapsed;
  const sidebarWidth = isExpanded ? "w-72" : "w-20";

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
        onMouseEnter={() => collapsed && setIsHoveringCollapsed(true)}
        onMouseLeave={() => setIsHoveringCollapsed(false)}
        className={`
          fixed inset-y-0 left-0 z-40
          flex flex-col
          border-r border-white/10
          bg-zinc-950/80
          backdrop-blur-2xl
          transition-all duration-300 ease-in-out

          ${sidebarWidth}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        {/* Header */}
        <div
          className="
            relative flex h-20 items-center
            justify-between
            border-b border-white/5
            px-4
          "
        >
          {/* Logo */}
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 overflow-hidden"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <rect
                    width="48"
                    height="48"
                    rx="12"
                    fill="url(#logoGradFull)"
                  />
                  <defs>
                    <linearGradient
                      id="logoGradFull"
                      x1="0"
                      y1="0"
                      x2="48"
                      y2="48"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="13"
                    y="12"
                    width="4"
                    height="24"
                    rx="2"
                    fill="white"
                  />
                  <rect
                    x="13"
                    y="12"
                    width="16"
                    height="4"
                    rx="2"
                    fill="white"
                  />
                  <rect
                    x="13"
                    y="21"
                    width="12"
                    height="4"
                    rx="2"
                    fill="white"
                  />
                  <rect
                    x="27"
                    y="28"
                    width="10"
                    height="4"
                    rx="2"
                    fill="white"
                    transform="rotate(-38 27 28)"
                  />
                  <rect
                    x="30"
                    y="30"
                    width="4"
                    height="4"
                    rx="2"
                    fill="white"
                    opacity="0.6"
                  />
                </svg>

                {/* Hide text on mobile so logo doesn't fight X button */}
                <div className="hidden sm:block space-y-0.5">
                  <h1 className="text-xl font-semibold tracking-tight text-gradient whitespace-nowrap">
                    FlowForge
                  </h1>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 whitespace-nowrap">
                    Productivity Platform
                  </p>
                </div>

                {/* Mobile: show name but smaller, no subtitle */}
                <div className="block sm:hidden">
                  <h1 className="text-lg font-semibold tracking-tight text-gradient whitespace-nowrap">
                    FlowForge
                  </h1>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="url(#logoGrad)" />
                  <defs>
                    <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="13"
                    y="12"
                    width="4"
                    height="24"
                    rx="2"
                    fill="white"
                  />
                  <rect
                    x="13"
                    y="12"
                    width="16"
                    height="4"
                    rx="2"
                    fill="white"
                  />
                  <rect
                    x="13"
                    y="21"
                    width="12"
                    height="4"
                    rx="2"
                    fill="white"
                  />
                  <rect
                    x="27"
                    y="28"
                    width="10"
                    height="4"
                    rx="2"
                    fill="white"
                    transform="rotate(-38 27 28)"
                  />
                  <rect
                    x="30"
                    y="30"
                    width="4"
                    height="4"
                    rx="2"
                    fill="white"
                    opacity="0.6"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Close — lg:hidden keeps it off desktop */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="
              rounded-xl border border-white/5
              bg-white/[0.03] p-2
              text-zinc-400 transition-all duration-200
              hover:border-white/10 hover:bg-white/[0.06] hover:text-white
              active:scale-95 lg:hidden
            "
          >
            <X size={18} />
          </button>

          {/* Collapse Toggle — desktop only, no change */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={toggleCollapsed}
            className="
              absolute -right-3 top-[72px]
              hidden lg:flex
              items-center justify-center
              h-6 w-6 rounded-full
              border border-white/10
              bg-zinc-900
              text-zinc-400
              shadow-lg
              transition-all duration-200
              hover:border-white/20
              hover:text-white
              z-50
            "
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </motion.button>
        </div>
        {/* Navigation */}
        <nav className="relative flex-1 space-y-1 px-3 py-6">
          {navigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    group relative flex items-center
                    overflow-hidden rounded-2xl
                    text-sm font-medium
                    transition-all duration-300
                    ${isExpanded ? "gap-3 px-4 py-3.5" : "justify-center py-3.5"}
                    ${
                      isActive
                        ? "border border-white/10 bg-white/[0.06] text-white shadow-lg"
                        : "text-zinc-400 hover:border hover:border-white/5 hover:bg-white/[0.04] hover:text-white"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Glow */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-pill"
                          className="
                            absolute inset-0 rounded-2xl
                            bg-gradient-to-r
                            from-blue-500/10 to-purple-500/10
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
                          relative z-10 flex h-9 w-9 flex-shrink-0
                          items-center justify-center
                          rounded-xl transition-all duration-300
                          ${
                            isActive
                              ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-300"
                              : "bg-white/[0.03] text-zinc-500 group-hover:text-zinc-200"
                          }
                        `}
                      >
                        <Icon size={18} />
                      </div>

                      {/* Label — only when expanded */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 tracking-tight whitespace-nowrap overflow-hidden"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Active Dot — only when expanded */}
                      {isActive && isExpanded && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="
                            absolute right-3 z-10
                            h-2 w-2 rounded-full
                            bg-blue-400
                            shadow-[0_0_12px_rgba(96,165,250,0.9)]
                          "
                        />
                      )}
                    </>
                  )}
                </NavLink>

                {/* Tooltip — only when truly collapsed (not hover-expanded) */}
                {collapsed && !isHoveringCollapsed && (
                  <Tooltip label={item.name} show={hoveredItem === item.path} />
                )}
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div className="relative border-t border-white/5 p-3">
          <div
            onClick={() => {
              navigate("/settings");
              setSidebarOpen(false);
            }}
            className="
              group relative overflow-hidden
              rounded-2xl border border-white/5
              bg-white/[0.03] p-3
              transition-all duration-300
              hover:border-white/10 hover:bg-white/[0.05]
            "
          >
            <div
              className="
                absolute inset-0
                bg-gradient-to-br from-blue-500/[0.08] to-purple-500/[0.08]
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            <div
              className={`relative flex items-center ${isExpanded ? "gap-3" : "justify-center"}`}
            >
              {/* Avatar */}
              <Avatar
                seed={user?.avatarSeed}
                size={40}
                className="flex-shrink-0 rounded-2xl shadow-lg shadow-blue-500/20"
              />

              {/* User Info — only when expanded */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0 overflow-hidden"
                  >
                    <p className="truncate text-sm font-semibold text-white whitespace-nowrap">
                      {user?.name}
                    </p>
                    <p className="truncate text-xs text-zinc-500 whitespace-nowrap">
                      {user?.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
