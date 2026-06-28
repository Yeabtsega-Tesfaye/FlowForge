import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";
import { useTaskStore } from "../../store/taskStore";
import { AlertCircle, Clock3 } from "lucide-react";

const priorityStyles = {
  high:   "bg-red-500/10 text-red-400 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

function formatDueDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("T")[0].split("-");
  return new Date(+year, +month - 1, +day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getDaysLeft(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("T")[0].split("-");
  const due = new Date(+year, +month - 1, +day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function UpcomingDeadlinesCard() {
  const tasks = useTaskStore((s) => s.tasks);

  const upcoming = tasks
    .filter((t) => {
      if (t.status === "completed" || !t.dueDate) return false;
      const days = getDaysLeft(t.dueDate);
      return days !== null && days >= 0 && days <= 3;
    })
    .sort((a, b) => getDaysLeft(a.dueDate) - getDaysLeft(b.dueDate))
    .slice(0, 5);

  return (
    <GlassCard glow="from-emerald-500/[0.06]">
      <div className="mb-5">
        <Pill color="emerald">Deadlines</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Upcoming deadlines
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Non-completed tasks due in 3 days
        </p>
      </div>

      {upcoming.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
          <Clock3 size={24} className="text-zinc-700" />
          <p className="text-sm text-zinc-600">
            No deadlines in the next 3 days.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcoming.map((task) => {
            const days = getDaysLeft(task.dueDate);
            const isToday    = days === 0;
            const isTomorrow = days === 1;
            const label = isToday
              ? "Today"
              : isTomorrow
              ? "Tomorrow"
              : `${days} days`;

            return (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-3"
              >
                {isToday && (
                  <AlertCircle size={15} className="shrink-0 text-red-400" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {task.title}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {formatDueDate(task.dueDate)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${priorityStyles[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`text-[11px] font-medium ${
                      isToday ? "text-red-400" : isTomorrow ? "text-amber-400" : "text-zinc-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}

export default UpcomingDeadlinesCard;