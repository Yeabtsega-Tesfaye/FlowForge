import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";
import { useTaskStore } from "../../store/taskStore";

function getStreak(tasks) {
  if (!tasks.length) return 0;

  // collect all unique local dates with any task activity
  const activeDates = new Set(
    tasks.map((t) => {
      const d = new Date(t.updatedAt);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  let streak = 0;
  const now = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (activeDates.has(key)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function getPeakDay(tasks) {
  if (!tasks.length) return null;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const counts = Array(7).fill(0);

  tasks.forEach((t) => {
    const d = new Date(t.updatedAt);
    counts[d.getDay()]++;
  });

  const maxIdx = counts.indexOf(Math.max(...counts));
  return days[maxIdx];
}

function getCompletionRate(tasks) {
  if (!tasks.length) return 0;
  const completed = tasks.filter((t) => t.status === "completed").length;
  return Math.round((completed / tasks.length) * 100);
}

function InsightsCard() {
  const tasks = useTaskStore((s) => s.tasks);

  const streak = getStreak(tasks);
  const peakDay = getPeakDay(tasks);
  const completionRate = getCompletionRate(tasks);

  const insights = [
    {
      label: "Completion rate",
      value: `${completionRate}%`,
      sub: `${tasks.filter((t) => t.status === "completed").length} of ${tasks.length} tasks done`,
    },
    {
      label: "Peak day",
      value: peakDay ?? "—",
      sub: peakDay ? "Most active day of week" : "Not enough data yet",
    },
    {
      label: "Task streak",
      value: streak > 0 ? `${streak} day${streak > 1 ? "s" : ""}` : "—",
      sub: streak > 0 ? "Consecutive days active" : "No activity yet",
    },
  ];

  return (
    <GlassCard glow="from-amber-500/[0.06]">
      <div className="mb-5">
        <Pill color="amber">Insights</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Key patterns
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Derived from your task activity
        </p>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-zinc-600">
          Create some tasks to unlock insights.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {insights.map((ins) => (
            <div
              key={ins.label}
              className="
                rounded-2xl border border-white/[0.05]
                bg-white/[0.02] p-4
              "
            >
              <p className="text-sm text-zinc-500">{ins.label}</p>
              <p className="mt-1.5 text-xl font-medium text-white">
                {ins.value}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{ins.sub}</p>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

export default InsightsCard;