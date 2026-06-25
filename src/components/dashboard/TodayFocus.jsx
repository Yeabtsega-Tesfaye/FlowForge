import { motion } from "framer-motion";
import { CheckSquare, AlertTriangle, Clock } from "lucide-react";

function TodayFocus({ tasks = [] }) {
  const today = new Date().toDateString();

  const todayTasks = tasks.filter(
    (t) => new Date(t.dueDate).toDateString() === today
  );

  const highPriority = todayTasks.filter(
    (t) => t.priority === "high"
  );

  const estimatedMinutes = todayTasks.length * 30; // simple V1 estimation

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className=" group
        relative overflow-hidden
        rounded-3xl border border-white/8
        bg-white/[0.03]
        p-5 backdrop-blur-xl
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br from-purple-500/[0.06] to-blue-500/[0.04]
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative">
                <div
          className="
            inline-flex items-center rounded-full
            border border-purple-500/10 bg-purple-500/10
            px-3 py-1 text-xs font-medium text-blue-300
          "
        >
          Daily
        </div>
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">
          Today's Focus
        </h2>

        <div className="mt-4 space-y-3">

          {/* Due today */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-zinc-400">
              <CheckSquare size={16} />
              <span>Due today</span>
            </div>
            <span className="text-white font-medium">
              {todayTasks.length}
            </span>
          </div>

          {/* High priority */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle size={16} />
              <span>High priority</span>
            </div>
            <span className="text-zinc-400 font-medium">
              {highPriority.length}
            </span>
          </div>

          {/* workload */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-blue-400">
              <Clock size={16} />
              <span>Estimated workload</span>
            </div>
            <span className="text-zinc-400 font-medium">
              {estimatedMinutes} min
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default TodayFocus;