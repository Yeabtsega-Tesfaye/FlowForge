import { useEffect, useRef, useState } from "react";
import Toast from "./Toast";
import { useNotificationStore } from "../../store/notificationStore";

function NotificationCenter() {
  const { notifications, loadNotifications } = useNotificationStore();
  const [toast, setToast] = useState(null);
  const lastToastedId = useRef(null);

  // Load notifications from API on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  // Toast only genuinely new notifications
  useEffect(() => {
    if (!notifications.length) return;
    const latest = notifications[0];
    if (latest.id === lastToastedId.current) return;
    if (latest.id.startsWith("temp-")) {
      lastToastedId.current = latest.id;
      setToast(latest);
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <Toast
      show={!!toast}
      message={toast?.message}
      type={toast?.type}
    />
  );
}

export default NotificationCenter;