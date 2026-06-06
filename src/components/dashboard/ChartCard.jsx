import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ChartCard({ data }) {
  return (
    <div
      className="
        group relative overflow-hidden

        rounded-3xl border border-white/8

        bg-white/[0.03]
        p-6

        backdrop-blur-xl
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-blue-500/[0.06]
          to-purple-500/[0.05]

          opacity-0 transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />

      <div className="noise-overlay absolute inset-0" />

      {/* Header */}
      <div className="relative mb-8">
        <div
          className="
            inline-flex items-center
            rounded-full

            border border-blue-500/10
            bg-blue-500/10

            px-3 py-1

            text-xs font-medium
            text-blue-300
          "
        >
          Analytics
        </div>

        <h2
          className="
            mt-4 text-xl
            font-semibold tracking-tight
            text-white
          "
        >
          Weekly Productivity
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Tasks completed throughout the week
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="colorData"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#71717a"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "rgba(24,24,27,0.95)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                color: "#fff",
                backdropFilter: "blur(12px)",
              }}
              cursor={{
                stroke: "rgba(59,130,246,0.25)",
                strokeWidth: 1,
              }}
            />

            <Area
              type="monotone"
              dataKey="completed"
              stroke="#60a5fa"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorData)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartCard;