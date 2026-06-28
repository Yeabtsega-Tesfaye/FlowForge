import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";
import { useTaskStore } from "../../store/taskStore";

const CATEGORY_COLORS = {
  work:     "#3b82f6",
  personal: "#1D9E75",
  health:   "#f43f5e",
  learning: "#7F77DD",
  finance:  "#f59e0b",
  creative: "#ec4899",
  errands:  "#14b8a6",
  other:    "#52525b",
};

const TOOLTIP_STYLE = {
  background: "rgba(9,9,11,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  color: "#fff",
  fontSize: "13px",
};

function DonutChartCard() {
  const tasks = useTaskStore((s) => s.tasks);

  // count tasks per category
  const counts = tasks.reduce((acc, task) => {
    const cat = task.category ?? "other";
    acc[cat] = (acc[cat] ?? 0) + 1;
    return acc;
  }, {});

  const total = tasks.length;

  const data = Object.entries(counts)
    .map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: total > 0 ? Math.round((count / total) * 100) : 0,
      color: CATEGORY_COLORS[name] ?? CATEGORY_COLORS.other,
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <GlassCard glow="from-purple-500/[0.07]">
      <div className="mb-5">
        <Pill color="purple">Distribution</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Where tasks go
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Task count by category
        </p>
      </div>

      {total === 0 ? (
        <div className="flex h-52 items-center justify-center text-sm text-zinc-600">
          No tasks yet.
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
            {data.map((d) => (
              <span
                key={d.name}
                className="flex items-center gap-1.5 text-sm text-zinc-500"
              >
                <span
                  className="inline-block h-2 w-2 rounded-sm"
                  style={{ background: d.color }}
                />
                {d.name} {d.value}%
              </span>
            ))}
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v, name) => [`${v}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </GlassCard>
  );
}

export default DonutChartCard;