import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { useTaskStore } from "../../store/taskStore";

const PRIORITY_STYLES = {
  high:   "border-red-500/20 bg-red-500/10 text-red-400",
  medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  low:    "border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
};

function TaskPicker({ onSelect }) {
  const tasks = useTaskStore((s) => s.tasks);
  const incomplete = tasks.filter((t) => t.status !== "completed");

  return (
    <div className="flex w-full max-w-lg flex-col items-center">
      <p className="mb-1 text-xs uppercase tracking-widest text-zinc-600">
        Focus mode
      </p>
      <h1 className="mb-8 text-2xl font-medium text-white">
        What are you focusing on?
      </h1>

      {incomplete.length === 0 ? (
        <div className="
          flex flex-col items-center gap-2 rounded-2xl
          border border-white/[0.06] bg-white/[0.03] p-8
        ">
          <CheckCircle2 size={28} className="text-emerald-400" />
          <p className="text-sm text-zinc-400">
            All tasks completed. Nothing to focus on.
          </p>
        </div>
      ) : (
        <div className="w-full space-y-2">
          {incomplete.map((task, i) => (
            <motion.button
              key={task.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(task)}
              className="
                group flex w-full items-center gap-3
                rounded-2xl border border-white/[0.06]
                bg-white/[0.03] px-4 py-3.5
                text-left transition-all duration-200
                hover:border-white/[0.12] hover:bg-white/[0.05]
              "
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-200 group-hover:text-white">
                  {task.title}
                </p>
                {task.dueDate && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-zinc-600">
                    <Clock size={11} />
                    {task.dueDate}
                  </p>
                )}
              </div>
              <span className={`
                flex-shrink-0 rounded-md border px-2 py-0.5
                text-[10px] font-medium
                ${PRIORITY_STYLES[task.priority]}
              `}>
                {task.priority}
              </span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskPicker;