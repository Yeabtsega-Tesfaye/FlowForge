import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { X, Sparkles } from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { useTaskStore } from "../../store/taskStore";
import { useToastStore } from "../../store/toastStore";

const CATEGORIES = [
  "work",
  "personal",
  "health",
  "learning",
  "finance",
  "creative",
  "errands",
  "other",
];

function TaskModal({ open, onClose, editingTask = null }) {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const addToast = useToastStore((state) => state.addToast);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    catagory: "other",
    dueDate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        category: editingTask.category,
        dueDate: editingTask.dueDate.split("T")[0],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    }
  }, [editingTask, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: "",
      description: "",
      dueDate: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Please choose a due date.";
    }

    if (formData.dueDate && formData.dueDate < new Date().toISOString().split("T")[0]) {
      newErrors.dueDate = "Due date cannot be in the past.";
    }

    setErrors(newErrors);

    if (newErrors.title || newErrors.description || newErrors.dueDate) {
      return;
    }

    if (editingTask) {
      updateTask({
        ...editingTask,
        ...formData,
      });

      addToast({
        title: "Task Updated",
        message: "Task updated successfully.",
        type: "info",
      });
    } else {
      await addTask({
        ...formData,
        status: "todo",
      });

      addToast({
        title: "Task Created",
        message: "Your new task has been added successfully.",
        type: "success",
      });
    }

    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });

    setErrors({
      title: "",
      description: "",
      dueDate: "",
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="
            fixed inset-0 z-50

            flex items-center
            justify-center

            bg-black/70
            p-4

            backdrop-blur-md
          "
        >
          <motion.div
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
              duration: 0.25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative overflow-hidden

              w-full max-w-xl

              rounded-3xl
              border border-white/10

              bg-zinc-950/90
              p-7

              shadow-2xl
              backdrop-blur-2xl
            "
          >
            {/* Glow */}
            <div
              className="
                absolute inset-0

                bg-gradient-to-br
                from-blue-500/[0.06]
                to-purple-500/[0.06]
              "
            />

            <div className="noise-overlay absolute inset-0" />

            {/* Header */}
            <div
              className="
                relative flex items-start
                justify-between gap-4
              "
            >
              <div>
                <div
                  className="
                    inline-flex items-center gap-2

                    rounded-full
                    border border-blue-500/10

                    bg-blue-500/10

                    px-3 py-1

                    text-xs font-medium
                    text-blue-300
                  "
                >
                  <Sparkles size={13} />
                  Productivity
                </div>

                <h2
                  className="
                    mt-4 text-2xl
                    font-semibold tracking-tight
                    text-white
                  "
                >
                  {editingTask ? "Edit Task" : "Create New Task"}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  Organize your workflow and track productivity efficiently.
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  rounded-2xl border
                  border-white/5

                  bg-white/[0.03]
                  p-2.5

                  text-zinc-500

                  transition-all duration-300

                  hover:border-white/10
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="
                relative mt-8
                space-y-5
              "
            >
              <Input
                label="Task Title"
                placeholder="Design dashboard UI..."
                value={formData.title}
                error={errors.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />

              <Input
                label="Description"
                placeholder="Describe your task objectives..."
                value={formData.description}
                error={errors.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="
                    w-full rounded-2xl
                    border border-white/5
                    bg-white/[0.03]
                    px-4 py-3
                    text-sm text-white
                    outline-none
                    transition-all duration-300
                    hover:border-white/10
                    focus:border-blue-500/20
                    focus:bg-white/[0.05]
                    capitalize
                  "
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label
                  className="
                    mb-2 block text-sm
                    font-medium text-zinc-300
                  "
                >
                  Priority
                </label>

                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value,
                    })
                  }
                  className="
                    w-full rounded-2xl

                    border border-white/5
                    bg-white/[0.03]

                    px-4 py-3

                    text-sm text-white

                    outline-none

                    transition-all duration-300

                    hover:border-white/10

                    focus:border-blue-500/20
                    focus:bg-white/[0.05]
                  "
                >
                  <option value="low">Low</option>

                  <option value="medium">Medium</option>

                  <option value="high">High</option>
                </select>
              </div>

              {/* Date */}
              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                error={errors.dueDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dueDate: e.target.value,
                  })
                }
              />

              {/* Footer */}
              <div
                className="
                  flex justify-end
                  gap-3 pt-4
                "
              >
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>

                <Button type="submit">
                  {editingTask ? "Save Changes" : "Save Task"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskModal;
