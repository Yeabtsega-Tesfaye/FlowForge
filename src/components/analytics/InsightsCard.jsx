import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";

const insights = [
  {
    label: "Weekend drop-off",
    value: "−55%",
    sub: "Sat vs weekday avg",
  },
  {
    label: "Mid-week peak",
    value: "Thu",
    sub: "Consistent high-output day",
  },
  {
    label: "Task streak",
    value: "7 days",
    sub: "Active every day this week",
  },
];

function InsightsCard() {
  return (
    <GlassCard glow="from-amber-500/[0.06]">
      <div className="mb-5">
        <Pill color="amber">Insights</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Key patterns this week
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Derived from your activity data
        </p>
      </div>

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
    </GlassCard>
  );
}

export default InsightsCard;