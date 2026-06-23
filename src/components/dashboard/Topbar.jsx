import { Bell, Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import NotificationPanel from "../notifications/NotificationPanel";
import AvatarDropdown from "./AvatarDropdown";
import SearchModal from "../ui/SearchModal";
import { useNotificationStore } from "../../store/notificationStore";
import { useNotificationPanelStore } from "../../store/notificationPanelStore";
import { useAuthStore } from "../../store/authStore";

function getInitials(name) {
  if (!name) return "?";
  return name.trim().split(/\s+/)[0][0].toUpperCase();
}

function Topbar({ setSidebarOpen }) {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const avatarButtonRef = useRef(null);
  const bellButtonRef   = useRef(null);

  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount   = notifications.filter((n) => !n.read).length;
  const { open: notifOpen, togglePanel, closePanel } = useNotificationPanelStore();

  const user     = useAuthStore((s) => s.user);
  const initials = getInitials(user?.name);

  // Cmd/Ctrl + K global shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="
        sticky top-0 z-30
        flex h-20 items-center gap-4
        border-b border-white/5
        bg-zinc-950/70 px-4
        backdrop-blur-2xl sm:px-6 lg:px-8
      ">
        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/3 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        {/* Mobile menu */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(true)}
          className="
            relative z-10 rounded-2xl border border-white/5
            bg-white/[0.03] p-2.5 text-zinc-400
            transition-all duration-300
            hover:border-white/10 hover:bg-white/[0.06] hover:text-white
            lg:hidden
          "
        >
          <Menu size={20} />
        </motion.button>

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="
            relative z-10 hidden w-full max-w-md md:flex
            items-center gap-2
            rounded-2xl border border-white/5
            bg-white/[0.03] py-3 pl-4 pr-4
            text-sm text-zinc-500
            transition-all duration-300
            hover:border-white/10 hover:bg-white/[0.05] hover:text-zinc-400
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40
          "
        >
          <Search size={16} className="shrink-0" />
          <span className="flex-1 text-left text-sm">Search tasks…</span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.04] px-1.5 py-0.5 text-[11px] text-zinc-600">
            <span>⌘</span><span>F</span>
          </span>
        </button>

        {/* Right side */}
        <div className="relative z-10 ml-auto flex items-center gap-3">

          {/* Notifications */}
          <div className="relative">
            <motion.button
              ref={bellButtonRef}
              whileTap={{ scale: 0.96 }}
              onClick={() => { togglePanel(); setAvatarOpen(false); }}
              className="
                group relative rounded-2xl border border-white/5
                bg-white/[0.03] p-2.5 text-zinc-400
                transition-all duration-300
                hover:border-white/10 hover:bg-white/[0.06] hover:text-white
              "
            >
              <div className="
                absolute inset-0 rounded-2xl
                bg-gradient-to-br from-blue-500/10 to-purple-500/10
                opacity-0 blur-xl transition-opacity duration-300
                group-hover:opacity-100
              " />
              <Bell size={18} className="relative z-10" />
              {unreadCount > 0 && (
                <span className="absolute right-2.5 top-2.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
                </span>
              )}
            </motion.button>
            <NotificationPanel open={notifOpen} onClose={closePanel} bellRef={bellButtonRef} />
          </div>

          {/* Avatar */}
          <div className="relative">
            <motion.button
              ref={avatarButtonRef}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setAvatarOpen((p) => !p); closePanel(); }}
              className="group relative"
            >
              <div className="
                absolute inset-0 rounded-2xl
                bg-gradient-to-br from-blue-500/20 to-purple-500/20
                opacity-0 blur-xl transition-opacity duration-300
                group-hover:opacity-100
              " />
              <div className="
                relative flex h-11 w-11 items-center justify-center
                rounded-2xl border border-white/10
                bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600
                text-sm font-semibold text-white
                shadow-lg shadow-blue-500/20 select-none
              ">
                {initials}
              </div>
            </motion.button>
            <AvatarDropdown open={avatarOpen} onClose={() => setAvatarOpen(false)} avatarButtonRef={avatarButtonRef} />
          </div>

        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default Topbar;