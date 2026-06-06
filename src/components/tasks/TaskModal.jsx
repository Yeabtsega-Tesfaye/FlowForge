import { useState } from "react";
import { X } from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { useTaskStore } from "../../store/taskStore";

function TaskModal({ open, onClose }) {
  const addTask = useTaskStore(
    (state) => state.addTask
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      ...formData,
      status: "todo",
    });

    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });

    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60 p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full max-w-lg
          rounded-2xl border
          border-zinc-800
          bg-zinc-900 p-6
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Create Task
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <Input
            label="Task Title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />

          <Input
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          {/* Priority */}
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
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
                w-full rounded-xl
                border border-zinc-800
                bg-zinc-900 px-4 py-3
                text-sm text-white
                outline-none
              "
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>
          </div>

          {/* Date */}
          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                dueDate: e.target.value,
              })
            }
          />

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;