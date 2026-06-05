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
            onClick={() => setSidebarOpen(false)}
            className="
              fixed inset-0 z-40
              bg-black/60 backdrop-blur-sm
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
          border-r border-zinc-800
          bg-zinc-900/95 backdrop-blur-xl
          transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div
          className="
            flex h-16 items-center
            justify-between border-b border-zinc-800
            px-6
          "
        >
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              FlowForge
            </h1>

            <p className="text-xs text-zinc-500">
              Productivity Platform
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="
              rounded-lg p-2 text-zinc-400
              transition hover:bg-zinc-800
              hover:text-white lg:hidden
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  group flex items-center gap-3
                  rounded-xl px-4 py-3
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-blue-500/20 to-purple-500/20
                        text-white
                        border border-blue-500/20
                      `
                      : `
                        text-zinc-400
                        hover:bg-zinc-800/80
                        hover:text-white
                      `
                  }
                `
                }
              >
                <Icon size={18} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div className="border-t border-zinc-800 p-4">
          <div
            className="
              flex items-center gap-3
              rounded-xl bg-zinc-800/50 p-3
            "
          >
            <div
              className="
                h-10 w-10 rounded-full
                bg-gradient-to-br
                from-blue-500 to-purple-600
              "
            />

            <div>
              <p className="text-sm font-medium text-white">
                Yeabtsega
              </p>

              <p className="text-xs text-zinc-500">
                Software Engineer
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;