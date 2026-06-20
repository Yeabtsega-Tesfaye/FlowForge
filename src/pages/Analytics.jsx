import { motion } from "framer-motion";
import PageHeader from "../components/ui/PageHeader";
import AnalyticsStatCard from "../components/analytics/AnalyticsStatCard";
import AreaChartCard from "../components/analytics/AreaChartCard";
import BarChartCard from "../components/analytics/BarChartCard";
import DonutChartCard from "../components/analytics/DonutChartCard";
import InsightsCard from "../components/analytics/InsightsCard";
import { productivityData } from "../data/analytics";

const derivedStats = [
  {
    label: "Completion rate",
    value: "75%",
    sub: "+5% vs last week",
    subColor: "text-emerald-400",
    glow: "from-emerald-500/[0.08]",
  },
  {
    label: "Daily average",
    value: "6.0",
    sub: "tasks per day",
    subColor: "text-blue-400",
    glow: "from-blue-500/[0.08]",
  },
  {
    label: "Best day",
    value: "Thu",
    sub: "9 tasks completed",
    subColor: "text-purple-400",
    glow: "from-purple-500/[0.08]",
  },
  {
    label: "Focus efficiency",
    value: "2.4×",
    sub: "tasks per focus hour",
    subColor: "text-amber-400",
    glow: "from-amber-500/[0.08]",
  },
];

function Analytics() {
  return (
    <div className="relative pb-10">
      <div className="relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PageHeader
            title="Analytics"
            description="Trends, breakdowns, and insights across your workflow."
          />
        </motion.div>

        {/* Stat Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4"
        >
          {derivedStats.map((s) => (
            <AnalyticsStatCard key={s.label} {...s} />
          ))}
        </motion.div>

{/* Area Chart + Donut side by side on xl */}
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1, duration: 0.45 }}
  className="mt-6 grid gap-6 xl:grid-cols-3"
>
  <div className="xl:col-span-2">
    <AreaChartCard data={productivityData} />
  </div>
  <div className="xl:col-span-1">
    <DonutChartCard />
  </div>
</motion.div>

{/* Bar Chart + Insights side by side on xl */}
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15, duration: 0.45 }}
  className="mt-6 grid gap-6 xl:grid-cols-2"
>
  <BarChartCard data={productivityData} />
  <InsightsCard />
</motion.div>

      </div>
    </div>
  );
}

export default Analytics;