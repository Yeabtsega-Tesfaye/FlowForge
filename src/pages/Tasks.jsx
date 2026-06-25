import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Zap } from "lucide-react";

import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import TaskCard from "../components/tasks/TaskCard";
import TaskFilterBar from "../components/tasks/TaskFilterBar";
import TaskModal from "../components/tasks/TaskModal";
import TaskDetailsModal from "../components/tasks/TaskDetailsModal";

import { useTaskStore } from "../store/taskStore";

function Tasks() {
  const navigate = useNavigate();

  // Create / Edit Modal
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Details Modal
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsTask, setDetailsTask] = useState(null);

  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const loading = useTaskStore((state) => state.loading);
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const openTaskDetails = (task) => {
    setDetailsTask(task);
    setDetailsOpen(true);
  };

  const closeTaskDetails = () => {
    setDetailsOpen(false);
    setDetailsTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
    setDetailsOpen(false); // IMPORTANT: close details modal
  };

  const closeTaskModal = () => {
    setTaskModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="relative pb-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Tasks"
          description="Manage your workflow and productivity."
        />

        <Button
          icon={Plus}
          onClick={() => {
            setEditingTask(null);
            setTaskModalOpen(true);
          }}
        >
          Deploy Task
        </Button>
      </div>

      {/* Filters */}
      <TaskFilterBar />

      {/* Loading */}
      {loading && (
        <div className="mt-10 text-center text-sm text-zinc-500">
          Loading tasks...
        </div>
      )}

      {/* Tasks */}
      {!loading && (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => openTaskDetails(task)}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && filteredTasks.length === 0 && (
        <div
          className="
            relative mt-10 overflow-hidden
            rounded-3xl border border-dashed border-white/10
            bg-zinc-900/70 p-14 text-center
            backdrop-blur-xl shadow-2xl shadow-black/20
          "
        >
          <div className="noise-overlay absolute inset-0" />

          <div className="relative">
            <div
              className="
                mx-auto flex h-16 w-16 items-center justify-center
                rounded-3xl
                bg-gradient-to-br
                from-blue-500/20
                to-purple-500/20
                text-2xl
              "
            >
              ✨
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
              The Board is Clear. Victory?
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-300/80">
              You've either crushed every single objective on your plate, or you're hiding from your responsibilities. If it's the second one... 
              <br />
              Click deploy task to get back on track.
            </p>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      <TaskModal
        open={taskModalOpen}
        editingTask={editingTask}
        onClose={closeTaskModal}
      />

      {/* Task Details */}
      <TaskDetailsModal
        open={detailsOpen}
        task={detailsTask}
        onClose={closeTaskDetails}
        onEdit={handleEditTask} // Pass the handleEditTask function to TaskDetailsModal
      />

      {/* Focus Button */}
      <button
        onClick={() => navigate("/focus")}
        className="
          fixed bottom-8 right-8 z-40
          flex items-center gap-2
          rounded-2xl
          border border-blue-500/20
          bg-blue-500/10
          px-4 py-2.5
          text-sm font-medium
          text-blue-300
          backdrop-blur-xl
          shadow-lg shadow-blue-500/10
          transition
          hover:bg-blue-500/15
        "
      >
        <Zap size={15} />
        Focus Mode
      </button>
    </div>
  );
}

export default Tasks;
