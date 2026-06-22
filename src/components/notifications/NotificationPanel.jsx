import { Bell, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useNotificationStore } from "../../store/notificationStore";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

function NotificationPanel({ open, onClose, bellRef }) {
  const {
    notifications,
    clearNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore();

  const isMobile    = useIsMobile();
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!isMobile && open && bellRef?.current) {
      const rect = bellRef.current.getBoundingClientRect();
      setDropdownPos({
        top:   rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [open, isMobile, bellRef]);

  const mobileVariants = {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit:    { y: "100%" },
  };

  const desktopVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: 10 },
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={
              isMobile
                ? "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                : "fixed inset-0 z-40"
            }
          />

          <motion.div
            variants={isMobile ? mobileVariants : desktopVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={!isMobile ? { top: dropdownPos.top, right: dropdownPos.right } : {}}
            className={
              isMobile
                ? `fixed bottom-0 left-0 right-0 z-50
                   flex flex-col max-h-[75vh] rounded-t-3xl
                   border-t border-white/10 bg-zinc-950 shadow-2xl`
                : `fixed z-50 w-[380px] overflow-hidden rounded-3xl
                   border border-white/10
                   bg-zinc-950/95 shadow-2xl backdrop-blur-2xl`
            }
          >
            {/* Drag handle — mobile only */}
            {isMobile && (
              <div className="flex shrink-0 justify-center pt-3 pb-1">
                <div className="h-1 w-10 rounded-full bg-zinc-700" />
              </div>
            )}

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/5 p-5">
              <div className="flex items-center gap-2">
                <Bell size={18} />
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="flex items-center gap-3">
                {notifications.some((n) => !n.read) && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-zinc-500 transition hover:text-white"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={clearNotifications}
                  className="text-zinc-500 transition hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-10 text-center text-sm text-zinc-500">
                  No notifications yet
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className="
                      group cursor-pointer border-b border-white/5
                      p-5 transition hover:bg-white/[0.03]
                    "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium text-white">
                          {notification.title}
                        </h4>
                        <p className="mt-1 text-sm text-zinc-400">
                          {notification.message}
                        </p>
                        <p className="mt-1.5 text-xs text-zinc-600">
                          {new Date(notification.createdAt).toLocaleTimeString("en-US", {
                            hour:   "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom safe area */}
            {isMobile && <div className="shrink-0 h-5" />}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default NotificationPanel;