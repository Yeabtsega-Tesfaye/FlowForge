import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer,
} from "recharts";
import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";

const DONUT_DATA = [
  { name: "Development", value: 45 },
  { name: "Design",      value: 25 },
  { name: "Planning",    value: 20 },
  { name: "Other",       value: 10 },
];

const DONUT_COLORS = ["#3b82f6", "#1D9E75", "#7F77DD", "#52525b"];

const TOOLTIP_STYLE = {
  background: "rgba(9,9,11,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  color: "#fff",
  fontSize: "13px",
};

function DonutChartCard() {
  return (
    <GlassCard glow="from-purple-500/[0.07]">
      <div className="mb-5">
        <Pill color="purple">Distribution</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Where time goes
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Focus hours by category
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
        {DONUT_DATA.map((d, i) => (
          <span
            key={d.name}
            className="flex items-center gap-1.5 text-sm text-zinc-500"
          >
            <span
              className="inline-block h-2 w-2 rounded-sm"
              style={{ background: DONUT_COLORS[i] }}
            />
            {d.name} {d.value}%
          </span>
        ))}
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DONUT_DATA}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {DONUT_DATA.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={(v, name) => [`${v}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export default DonutChartCard;