import { useEffect, useRef, useState } from "react";
import Toast from "./Toast";
import { useNotificationStore } from "../../store/notificationStore";

function NotificationCenter() {
  const { notifications } = useNotificationStore();
  const [toast, setToast] = useState(null);
  const lastToastedId = useRef(null);

  useEffect(() => {
    if (!notifications.length) return;

    const latest = notifications[0];

    if (latest.id === lastToastedId.current) return;

    if (latest.id.startsWith("temp-")) {
      lastToastedId.current = latest.id;

      // eslint-disable-next-line react-hooks/set-state-in-effect
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