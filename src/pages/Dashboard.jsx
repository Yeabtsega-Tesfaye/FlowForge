import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import ChartCard from "../components/dashboard/ChartCard";
import TodayFocus from "../components/dashboard/TodayFocus";
import QuickActions from "../components/dashboard/QuickActions";
import TaskModal from "../components/tasks/TaskModal";
import TaskDetailsModal from "../components/tasks/TaskDetailsModal";

import { getAnalyticsData } from "../services/analyticsService";
import { getActivityData } from "../services/activityService";
import { useTaskStore } from "../store/taskStore";



function Dashboard() {
  const loadTasks = useTaskStore((state) => state.loadTasks);

useEffect(() => {
  loadTasks();
}, [loadTasks]);


  const tasks = useTaskStore((state) => state.tasks);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [data, setData] = useState({
    statsData: [],
    productivityData: [],
  });

  const openRandomTask = () => {
  if (!tasks.length) return;

  const randomTask =
    tasks[Math.floor(Math.random() * tasks.length)];

  setSelectedTaskDetails(randomTask);
  setDetailsOpen(true);
};

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    getAnalyticsData()
      .then((res) => setData((prev) => ({ ...prev, ...res })))
      .catch(console.error);

    getActivityData().then(setActivity).catch(console.error);
  }, []);

  return (
    <div className="relative pb-10">
      <div className="relative z-10">
        {/* Header */}
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
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              badge={stat.badge}
              badgeColor={stat.badgeColor}
              subtitle={stat.subtitle}
            />
          ))}
        </motion.div>

        <TaskModal
          open={openTaskModal}
          onClose={() => setOpenTaskModal(false)}
        />

        {/* MAIN SECTION */}
        <motion.div className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ChartCard data={data.productivityData} />
          </div>

          <div className="space-y-6">
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <TodayFocus tasks={tasks} />
              <QuickActions 
                    onNewTask={() => setOpenTaskModal(true)}
                    onRandomTask={openRandomTask}
                />
            </div>
            <ActivityFeed activities={activity} />
          </div>
          <TaskDetailsModal
  open={detailsOpen}
  task={selectedTaskDetails}
  onClose={() => {
    setDetailsOpen(false);
    setSelectedTaskDetails(null);
  }}
/>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
