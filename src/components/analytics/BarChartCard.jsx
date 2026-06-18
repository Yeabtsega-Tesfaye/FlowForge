import {
  BarChart, Bar,
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

function BarChartCard({ data }) {
  return (
    <GlassCard glow="from-emerald-500/[0.07]">
      <div className="mb-5">
        <Pill color="teal">Breakdown</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Volume by day
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Which days carry the most weight
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-sm text-zinc-500">
          <span className="inline-block h-2 w-2 rounded-sm bg-emerald-500" />
          Completed
        </span>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={28}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
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
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              formatter={(v) => [`${v} tasks`, "Completed"]}
            />
            <Bar
              dataKey="completed"
              fill="#1D9E75"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export default BarChartCard;