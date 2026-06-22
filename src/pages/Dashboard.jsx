import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import ChartCard from "../components/dashboard/ChartCard";
import { getAnalyticsData } from "../services/analyticsService";
import { getActivityData } from "../services/activityService";

function Dashboard() {
  const [data, setData] = useState({
    statsData:        [],
    productivityData: [],
  });
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    getAnalyticsData()
      .then((res) => setData((prev) => ({ ...prev, ...res })))
      .catch(console.error);

    getActivityData()
      .then(setActivity)
      .catch(console.error);
  }, []);

  return (
    <div className="relative pb-10">
      <div className="relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PageHeader
            title="Dashboard"
            description="Overview of your productivity, workflow, and activity insights."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {data.statsData.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-8 grid gap-6 xl:grid-cols-3"
        >
          <div className="xl:col-span-2">
            <ChartCard data={data.productivityData} />
          </div>
          <ActivityFeed activities={activity} />
        </motion.div>

      </div>
    </div>
  );
}

export default Dashboard;