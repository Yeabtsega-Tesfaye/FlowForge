import { useEffect, useRef, useState } from "react";
import Toast from "./Toast";
import { useNotificationStore } from "../../store/notificationStore";

function NotificationCenter() {
  const notifications = useNotificationStore((state) => state.notifications);
  const [toast, setToast] = useState(null);

  // Track the ID of the last notification we already toasted
  // so we never re-toast persisted notifications on refresh
  const lastToastedId = useRef(
    notifications.length ? notifications[0].id : null
  );

  useEffect(() => {
    if (!notifications.length) return;

    const latest = notifications[0];

    // Only toast if this is genuinely a new notification
    if (latest.id === lastToastedId.current) return;

    lastToastedId.current = latest.id;
    setToast(latest);

    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
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