import { Bell, Trash2 } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useNotificationStore } from "../../store/notificationStore";

// eslint-disable-next-line no-unused-vars
function NotificationPanel({ open, onClose }) {
  const { notifications, clearNotifications, markAsRead, deleteNotification } =
    useNotificationStore();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          className="
            absolute right-0 top-14 z-50

            w-[380px]
            overflow-hidden

            rounded-3xl
            border border-white/10

            bg-zinc-950/95

            shadow-2xl
            backdrop-blur-2xl
          "
        >
          {/* Header */}
          <div
            className="
              flex items-center
              justify-between

              border-b border-white/5
              p-5
            "
          >
            <div className="flex items-center gap-2">
              <Bell size={18} />

              <h3 className="font-semibold">Notifications</h3>
            </div>

            <button
              onClick={clearNotifications}
              className="
                text-zinc-500 transition
                hover:text-red-400
              "
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div
                className="
                  p-10 text-center
                  text-sm text-zinc-500
                "
              >
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => {
                    markAsRead(notification.id);
                  }}
                  className="
                    group

                    border-b border-white/5
                    p-5 transition cursor-pointer

                    hover:bg-white/[0.03]
                  "
                >
                  <div
                    className="
                      flex items-start
                      justify-between gap-3
                    "
                  >
                    <div>
                      <h4
                        className="
                          text-sm font-medium
                          text-white
                        "
                      >
                        {notification.title}
                      </h4>

                      <p
                        className="
                          mt-1 text-sm
                          text-zinc-400
                        "
                      >
                        {notification.message}
                      </p>
                    </div>

                    <div className="relative flex h-4 w-4 items-center justify-center">
                      {!notification.read && (
                        <div
                          className="
                            h-2 w-2
                            rounded-full
                            bg-blue-500

                            transition-opacity duration-200
                            group-hover:opacity-0
                          "
                        />
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="
                          absolute inset-0

                          flex items-center
                          justify-center

                          opacity-0

                          text-zinc-500
                          transition-all duration-200

                          hover:text-red-400

                          group-hover:opacity-100
                        "
                      >
                        <Trash2 size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotificationPanel;
