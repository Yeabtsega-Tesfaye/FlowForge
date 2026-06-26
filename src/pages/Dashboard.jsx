import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import ChartCard from "../components/dashboard/ChartCard";
import TodayFocus from "../components/dashboard/TodayFocus";
import QuickActions from "../components/dashboard/QuickActions";
import FlowScore from "../components/dashboard/FlowScore";

import { getAnalyticsData } from "../services/analyticsService";
import { getActivityData } from "../services/activityService";

import { useTaskStore } from "../store/taskStore";
import { useTaskUIStore } from "../store/taskModalStore";

function Dashboard() {
  const loadTasks = useTaskStore((state) => state.loadTasks);
  const tasks = useTaskStore((state) => state.tasks);

  const openTask = useTaskUIStore((s) => s.openTask);

  const [data, setData] = useState({
    statsData: [],
    productivityData: [],
  });

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    loadTasks();

    getAnalyticsData()
      .then((res) => setData((prev) => ({ ...prev, ...res })))
      .catch(console.error);

    getActivityData()
      .then(setActivity)
      .catch(console.error);
  }, []);

  const openRandomTask = () => {
    if (!tasks.length) return;

    const random =
      tasks[Math.floor(Math.random() * tasks.length)];

    openTask(random, "details");
  };

  return (
    <div className="relative pb-10">
      <div className="relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <PageHeader
            title="Dashboard"
            description="Overview of your productivity, workflow, and activity insights."
          />
        </motion.div>

        {/* STATS */}
        <motion.div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.statsData.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </motion.div>

        {/* QUICK */}
        <motion.div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <TodayFocus tasks={tasks} />
          <FlowScore score={data.flowScore} level={data.flowLevel}/>

          <QuickActions
            onNewTask={() => openTask(null, "create")}
            onRandomTask={openRandomTask}
          />
        </motion.div>

        {/* MAIN */}
        <motion.div className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ChartCard data={data.productivityData} />
          </div>

          <div className="space-y-6">
            <ActivityFeed activities={activity} />
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;