import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { getPreferences, updatePreferences } from "../../services/authService";
import { useNotificationStore } from "../../store/notificationStore";

const EMAIL_PREFS = [
  { id: "taskReminders", label: "Task reminders",  sub: "Get emailed when a task deadline is near"       },
  { id: "weeklyDigest",  label: "Weekly digest",   sub: "A summary of your productivity every Monday"    },
  { id: "updates",       label: "Product updates", sub: "New features and improvements to FlowForge"     },
];

const INAPP_PREFS = [
  { id: "taskDone",      label: "Task completed",  sub: "Notify when a task moves to completed"          },
  { id: "aiSuggestions", label: "AI suggestions",  sub: "Alerts when the AI assistant has insights"      },
  { id: "streakAlerts",  label: "Streak alerts",   sub: "Remind me to keep my productivity streak"       },
];

const DEFAULTS = {
  email: { taskReminders: true,  weeklyDigest: true,  updates: false      },
  inApp: { taskDone: true,       aiSuggestions: true, streakAlerts: false },
};

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative h-5 w-9 flex-shrink-0 rounded-full
        border transition-all duration-300
        ${checked
          ? "border-blue-500/50 bg-blue-500/70"
          : "border-white/10 bg-white/[0.06]"
        }
      `}
    >
      <span className={`
        absolute top-0.5 h-4 w-4 rounded-full
        bg-white shadow transition-all duration-300
        ${checked ? "left-[18px]" : "left-0.5"}
      `} />
    </button>
  );
}

function PrefGroup({ title, prefs, values, onChange }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
        {title}
      </p>
      <div className="space-y-0">
        {prefs.map((pref, i) => (
          <div
            key={pref.id}
            className={`
              flex items-center justify-between gap-4 py-3
              ${i !== prefs.length - 1 ? "border-b border-white/[0.04]" : ""}
            `}
          >
            <div>
              <p className="text-sm text-zinc-200">{pref.label}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{pref.sub}</p>
            </div>
            <Toggle
              checked={values[pref.id] ?? false}
              onChange={(v) => onChange(pref.id, v)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsSection() {
  const addNotification = useNotificationStore((s) => s.addNotification);

  const [email,    setEmail]    = useState(DEFAULTS.email);
  const [inapp,    setInapp]    = useState(DEFAULTS.inApp);
  const [loading,  setLoading]  = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getPreferences()
      .then((prefs) => {
        if (prefs.email) setEmail(prefs.email);
        if (prefs.inApp) setInapp(prefs.inApp);
      })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePreferences({ email, inApp: inapp });
      addNotification({
        title:   "Preferences saved",
        message: "Your notification preferences have been updated.",
        type:    "success",
      });
    } catch (err) {
      addNotification({
        title:   "Error",
        message: err.message,
        type:    "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-sm text-zinc-500">Loading preferences...</div>;
  }

  return (
    <div className="space-y-4">
      <PrefGroup
        title="Email notifications"
        prefs={EMAIL_PREFS}
        values={email}
        onChange={(id, v) => setEmail((prev) => ({ ...prev, [id]: v }))}
      />
      <PrefGroup
        title="In-app notifications"
        prefs={INAPP_PREFS}
        values={inapp}
        onChange={(id, v) => setInapp((prev) => ({ ...prev, [id]: v }))}
      />
      <div className="flex justify-end">
        <Button variant="primary" loading={loading} onClick={handleSave}>
          Save preferences
        </Button>
      </div>
    </div>
  );
}

export default NotificationsSection;