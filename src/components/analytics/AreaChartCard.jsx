import {
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";

const TOOLTIP_STYLE = {
  background: "rgba(9,9,11,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  color: "#fff",
  fontSize: "13px",
};

function AreaChartCard({ data }) {
  return (
    <GlassCard glow="from-blue-500/[0.06]">
      <div className="mb-5">
        <Pill color="blue">Productivity</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Daily output this week
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Tasks completed per day — area shows momentum
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-sm text-zinc-500">
          <span className="inline-block h-2 w-2 rounded-sm bg-blue-400" />
          Completed
        </span>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#52525b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#52525b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              cursor={{ stroke: "rgba(59,130,246,0.2)", strokeWidth: 1 }}
              formatter={(v) => [`${v} tasks`, "Completed"]}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#60a5fa"
              strokeWidth={2.5}
              fill="url(#areaGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export default AreaChartCard;