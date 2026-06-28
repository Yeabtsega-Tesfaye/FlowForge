import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/ui/PageHeader";
import AnalyticsStatCard from "../components/analytics/AnalyticsStatCard";
import AreaChartCard from "../components/analytics/AreaChartCard";
import BarChartCard from "../components/analytics/BarChartCard";
import DonutChartCard from "../components/analytics/DonutChartCard";
import InsightsCard from "../components/analytics/InsightsCard";
import { getAnalyticsData } from "../services/analyticsService";
import ProgressRingCard from "../components/analytics/ProgressRingCard";
import PriorityBreakdownCard from "../components/analytics/PriorityBreakdownCard";
import UpcomingDeadlinesCard from "../components/analytics/UpcomingDeadlinesCard";

const DONUT_COLORS = ["#3b82f6", "#1D9E75", "#7F77DD", "#52525b"];

const FALLBACK = {
  statsData: [],
  derivedStats: [],
  productivityData: [],
  insights: [],
};

function Analytics() {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-zinc-500">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="relative pb-10">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-0 h-96 w-96 rounded-full bg-blue-500/[0.05] blur-3xl" />
        <div className="absolute -right-8 top-40 h-[28rem] w-[28rem] rounded-full bg-purple-500/[0.05] blur-3xl" />
      </div>

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
          {data.derivedStats.map((s) => (
            <AnalyticsStatCard key={s.label} {...s} />
          ))}
        </motion.div>

        {/* Area Chart + Donut */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-6 grid gap-6 xl:grid-cols-3"
        >
          <div className="xl:col-span-2">
            <AreaChartCard data={data.productivityData} />
          </div>
          <div className="xl:col-span-1">
            <DonutChartCard colors={DONUT_COLORS} />
          </div>
        </motion.div>

        {/* Bar Chart + Insights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-6 grid gap-6 xl:grid-cols-2"
        >
          <BarChartCard data={data.productivityData} />
          <InsightsCard insights={data.insights} />
        </motion.div>
        {/* Progress Ring + Priority + Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-6 grid gap-6 xl:grid-cols-3"
        >
          <ProgressRingCard />
          <PriorityBreakdownCard />
          <UpcomingDeadlinesCard />
        </motion.div>
      </div>
    </div>
  );
}

export default Analytics;
