import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";
import { useTaskStore } from "../../store/taskStore";

const PRIORITIES = [
  { key: "high",   label: "High",   color: "bg-red-500",     text: "text-red-400"     },
  { key: "medium", label: "Medium", color: "bg-amber-500",   text: "text-amber-400"   },
  { key: "low",    label: "Low",    color: "bg-emerald-500", text: "text-emerald-400" },
];

function PriorityBreakdownCard() {
  const tasks = useTaskStore((s) => s.tasks);

  const active = tasks.filter((t) => t.status !== "completed");
  const total  = active.length;

  const counts = PRIORITIES.map(({ key, label, color, text }) => {
    const count = active.filter((t) => t.priority === key).length;
    const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
    return { key, label, color, text, count, pct };
  });

  return (
    <GlassCard glow="from-red-500/[0.06]">
      <div className="mb-5">
        <Pill color="red">Priority</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Priority breakdown
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Active tasks by urgency
        </p>
      </div>

      {total === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-zinc-600">
          No active tasks.
        </div>
      ) : (
        <div className="space-y-5">
          {counts.map(({ key, label, color, text, count, pct }) => (
            <div key={key}>
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-sm font-medium ${text}`}>{label}</span>
                <span className="text-sm text-zinc-400">
                  {count} task{count !== 1 ? "s" : ""} · {pct}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className={`h-full rounded-full ${color} opacity-80 transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}

          <div className="mt-2 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
            <p className="text-xs text-zinc-500">
              {counts[0].count > 0
                ? `${counts[0].count} high-priority task${counts[0].count > 1 ? "s" : ""} need${counts[0].count === 1 ? "s" : ""} attention`
                : "No high-priority tasks — you're in good shape"}
            </p>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

export default PriorityBreakdownCard;