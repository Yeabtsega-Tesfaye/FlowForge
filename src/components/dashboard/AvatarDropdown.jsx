import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, User, Command, Bell, LogOut } from "lucide-react";
import { useNotificationStore } from "../../store/notificationStore";
import { useCommandPaletteStore } from "../../store/commandPaletteStore";
import { useNotificationPanelStore } from "../../store/notificationPanelStore";
import { useAuthStore } from "../../store/authStore";

import Avatar from "../ui/Avatar";

function MenuItem({ icon: Icon, label, onClick, danger, badge, kbd }) {
  return (
    <button
      onMouseDown={onClick}
      className={`
        flex w-full items-center gap-2.5
        rounded-xl px-3 py-2.5 text-sm
        border border-transparent
        transition-all duration-150
        ${
          danger
            ? "text-red-400 hover:border-red-500/10 hover:bg-red-500/[0.08] hover:text-red-300"
            : "text-zinc-400 hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-white"
        }
      `}
    >
      <Icon size={15} className="flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {kbd && (
        <span
          className="
          rounded-md border border-white/[0.08]
          bg-white/[0.04] px-1.5 py-0.5
          font-mono text-[10px] text-zinc-600
        "
        >
          {kbd}
        </span>
      )}
      {badge > 0 && (
        <span
          className="
          rounded-md border border-blue-500/20
          bg-blue-500/10 px-1.5 py-0.5
          text-[10px] text-blue-400
        "
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function AvatarDropdown({ open, onClose, avatarButtonRef }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { notifications } = useNotificationStore();
  const { openPalette } = useCommandPaletteStore();
  const { openPanel } = useNotificationPanelStore();
  const { clearAuth, user } = useAuthStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const displayName = user?.name ?? "—";
  const displayEmail = user?.email ?? "—";

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (avatarButtonRef?.current?.contains(e.target)) return;
      if (ref.current && ref.current.contains(e.target)) return;
      onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, avatarButtonRef]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const go = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -6 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="
            absolute right-0 top-[calc(100%+10px)]
            z-50 w-60 overflow-hidden
            rounded-2xl border border-white/[0.08]
            bg-zinc-950/95 backdrop-blur-2xl
            shadow-2xl shadow-black/50
          "
        >
          {/* Profile row */}
          <div
            className="
            flex items-center gap-3
            border-b border-white/[0.06]
            px-4 py-3.5
          "
          >
            <div className="rounded-xl overflow-hidden shadow-lg shadow-blue-500/20">
              <Avatar
                seed={user?.avatarSeed}
                size={36}
                className="rounded-xl"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {displayName}
              </p>
              <p className="truncate text-xs text-zinc-500">{displayEmail}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="p-1.5">
            <MenuItem
              icon={LayoutDashboard}
              label="Dashboard"
              onClick={() => go("/dashboard")}
            />
            <MenuItem
              icon={User}
              label="Profile & settings"
              onClick={() => go("/settings")}
            />
            <div className="hidden md:block">
              <MenuItem
                icon={Command}
                label="Command palette"
                kbd="⌘K"
                onClick={() => {
                  openPalette();
                  onClose();
                }}
              />
            </div>
            <MenuItem
              icon={Bell}
              label="Notifications"
              badge={unreadCount}
              onClick={() => {
                onClose();
                openPanel();
              }}
            />
          </div>

          <div className="mx-2 h-px bg-white/[0.06]" />

          <div className="p-1.5">
            <MenuItem
              icon={LogOut}
              label="Sign out"
              danger
              onClick={() => {
                clearAuth();
                go("/login");
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AvatarDropdown;
