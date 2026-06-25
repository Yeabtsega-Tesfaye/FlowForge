import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Clock3,
  Flag,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
} from "lucide-react";

import { useTaskStore } from "../../store/taskStore";
import Button from "../ui/Button";

function TaskDetailsModal({
  open,
  onClose,
  task,
  onEdit,
  onToggleComplete,
}) {
  if (!task) return null;

  const deleteTask = useTaskStore((state) => state.deleteTask);

  const priorityStyles = {
    low: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    high: "bg-red-500/10 text-red-300 border-red-500/20",
  };

  const statusStyles = {
    todo: "bg-zinc-500/10 text-zinc-300 border-zinc-500/20",
    "in-progress":
      "bg-blue-500/10 text-blue-300 border-blue-500/20",
    completed:
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70
            backdrop-blur-md
            p-4
          "
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.22,
            }}
            className="
              relative overflow-hidden

              w-full
              max-w-xl

              rounded-3xl
              border border-white/10

              bg-zinc-950/90

              p-7

              backdrop-blur-2xl
              shadow-2xl
            "
          >
            {/* Glow */}
            <div
              className="
                absolute inset-0

                bg-gradient-to-br
                from-blue-500/[0.05]
                to-purple-500/[0.05]
              "
            />

            <div className="noise-overlay absolute inset-0" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {task.title}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <div
                      className={`
                        rounded-full
                        border
                        px-3 py-1
                        text-xs font-medium
                        ${priorityStyles[task.priority]}
                      `}
                    >
                      <Flag size={12} className="inline mr-1" />
                      {task.priority}
                    </div>

                    <div
                      className={`
                        rounded-full
                        border
                        px-3 py-1
                        text-xs font-medium
                        ${statusStyles[task.status]}
                      `}
                    >
                      {task.status}
                    </div>
                  </div>
                </div>

                        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
              onClose();
            }}
            className="
            rounded-2xl border
            border-white/10

            bg-white/[0.03]
            p-2


            text-zinc-500

            transition-all duration-300

            hover:border-blue-500/20
            hover:bg-blue-500/10
            hover:text-blue-300
          "
          >
            <Pencil size={16} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
              onClose();
            }}
            className="
            relative z-10

            rounded-2xl border
            border-white/10

            bg-white/[0.03]
            p-2

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
              </div>

              {/* Description */}
              <div className="mt-8">
                <p className="text-sm font-medium text-zinc-400">
                  Description
                </p>

                <p className="mt-3 leading-7 text-zinc-200">
                  {task.description || "No description provided."}
                </p>
              </div>

              {/* Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Calendar size={18} className="text-blue-400" />

                  <div>
                    <p className="text-xs text-zinc-500">
                      Due Date
                    </p>

                    <p>{task.dueDate || "No due date"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-300">
                  <Clock3 size={18} className="text-purple-400" />

                  <div>
                    <p className="text-xs text-zinc-500">
                      Created
                    </p>

                    <p>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 flex justify-end gap-3">

                <Button onClick={() => onToggleComplete(task)}>
                  {task.status === "completed" ? (
                    <>
                      <Circle size={16} className="mr-2" />
                      Reopen
                    </>
                  ) : (
                    <>
                      <CheckCircle2
                        size={16}
                        className="mr-2"
                      />
                      Complete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskDetailsModal;