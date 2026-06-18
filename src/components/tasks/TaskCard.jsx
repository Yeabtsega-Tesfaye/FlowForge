import {
  Trash2,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

import { motion } from "framer-motion";

import Badge from "../ui/Badge";
import Button from "../ui/Button";

import { useTaskStore } from "../../store/taskStore";

function TaskCard({ task }) {
  const deleteTask = useTaskStore(
    (state) => state.deleteTask
  );

  const toggleTaskStatus = useTaskStore(
    (state) => state.toggleTaskStatus
  );

  const priorityVariant =
    task.priority === "high"
      ? "danger"
      : task.priority === "medium"
      ? "warning"
      : "success";

  const statusVariant =
    task.status === "completed"
      ? "success"
      : task.status === "in-progress"
      ? "info"
      : "default";

  const buttonText =
  task.status === "todo"
    ? "Start Task"
    : task.status === "in-progress"
    ? "Finish Task"
    : "Reset";

const buttonVariant =
  task.status === "completed"
    ? "secondary"
    : "primary";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="
        group relative overflow-hidden

        rounded-3xl border border-white/8

        bg-white/[0.03]
        p-6

        backdrop-blur-xl

        transition-all duration-300

        hover:border-white/10
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-blue-500/[0.05]
          to-purple-500/[0.05]

          opacity-0 transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />

      <div className="noise-overlay absolute inset-0" />

      {/* Top Accent */}
      <div
        className="
          absolute left-0 top-0
          h-px w-full

          bg-gradient-to-r
          from-blue-500/0
          via-blue-500/40
          to-purple-500/0
        "
      />

      {/* Header */}
      <div
        className="
          relative flex items-start
          justify-between gap-4
        "
      >
        <div className="flex-1">
          <div
            className="
              inline-flex items-center
              rounded-full

              border border-white/5
              bg-white/[0.03]

              px-2.5 py-1

              text-[11px]
              font-medium
              uppercase tracking-[0.12em]

              text-zinc-500
            "
          >
            Task
          </div>

          <h3
            className="
              mt-4 text-xl
              font-semibold
              tracking-tight text-white
            "
          >
            {task.title}
          </h3>

          <p
            className="
              mt-3 text-sm
              leading-relaxed
              text-zinc-400
            "
          >
            {task.description}
          </p>
        </div>

        {/* Delete */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => deleteTask(task.id)}
          className="
            relative z-10

            rounded-2xl border
            border-white/5

            bg-white/[0.03]
            p-2.5

            text-zinc-500

            transition-all duration-300

            hover:border-red-500/20
            hover:bg-red-500/10
            hover:text-red-300
          "
        >
          <Trash2 size={16} />
        </motion.button>
      </div>

      {/* Badges */}
      <div className="relative mt-6 flex flex-wrap gap-2">
        <Badge variant={priorityVariant}>
          {task.priority}
        </Badge>

        <Badge variant={statusVariant}>
          {task.status}
        </Badge>

        <div
          className="
            inline-flex items-center gap-2

            rounded-full border
            border-white/5

            bg-white/[0.03]

            px-3 py-1.5

            text-xs text-zinc-400
          "
        >
          <CalendarDays size={13} />

          {task.dueDate}
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          relative mt-8
          flex items-center
          justify-between
        "
      >
        <div
          className="
            text-xs tracking-tight
            text-zinc-500
          "
        >
          FlowForge Task
        </div>

<Button
  size="sm"
  variant={buttonVariant}
  icon={CheckCircle2}
onClick={() => {
  toggleTaskStatus(task.id);
}}
>
  {buttonText}
</Button>
      </div>
    </motion.div>
  );
}

export default TaskCard;