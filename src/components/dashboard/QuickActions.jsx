import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Plus, Timer, Shuffle } from "lucide-react";

function QuickActions({ onNewTask, onRandomTask }) {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Task",
      icon: Plus,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      onClick: onNewTask,
    },
    {
      title: "Focus",
      icon: Timer,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      onClick: () => {
        navigate("/focus");
      },
    },
    {
      title: "Random Task",
      icon: Shuffle,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      onClick: onRandomTask,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-5
        relative
        overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br from-purple-500/[0.06] to-blue-500/[0.04]
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100
          pointer-events-none
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
          Actions
        </div>
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">
          Quick Actions
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                onClick={action.onClick}
                className="
                  group
                  transition-all rounded-xl
                  duration-200
                  hover:bg-white/[0.05]
                "
              >
                <div
                  className={`
                    flex items-center gap-1
                    rounded-xl border
                    pl-3 py-2 
                    ${action.bg}
                    ${action.border}
                    ${action.color}
                  `}
                >
                  <div className="rounded-lg bg-white/5">
                    <Icon size={16} />
                  </div>
                  <p className="text-sm font-medium text-white">
                    {action.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default QuickActions;
