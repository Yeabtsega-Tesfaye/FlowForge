import { Trash2, CheckCircle2 } from "lucide-react";
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

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/60 p-5
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {task.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            {task.description}
          </p>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="
            text-zinc-500 transition
            hover:text-red-400
          "
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Badges */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant={priorityVariant}>
          {task.priority}
        </Badge>

        <Badge variant={statusVariant}>
          {task.status}
        </Badge>

        <Badge>
          {task.dueDate}
        </Badge>
      </div>

      {/* Actions */}
      <div className="mt-6">
        <Button
          size="sm"
          variant={
            task.status === "completed"
              ? "secondary"
              : "primary"
          }
          icon={CheckCircle2}
          onClick={() =>
            toggleTaskStatus(task.id)
          }
        >
          {task.status === "completed"
            ? "Mark Todo"
            : "Complete"}
        </Button>
      </div>
    </motion.div>
  );
}

export default TaskCard;