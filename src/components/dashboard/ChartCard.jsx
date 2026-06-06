import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

function ChartCard({ data }) {
  return (
    <div
      className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/60 p-6
      "
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Weekly Productivity
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Tasks completed this week
        </p>
      </div>

      <div className="h-80">
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
                  offset="5%"
                  stopColor="#3b82f6"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              stroke="#71717a"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="completed"
              stroke="#3b82f6"
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