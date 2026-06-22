import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Zap } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import TaskCard from "../components/tasks/TaskCard";
import TaskFilterBar from "../components/tasks/TaskFilterBar";
import TaskModal from "../components/tasks/TaskModal";
import { useTaskStore } from "../store/taskStore";

function Tasks() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks      = useTaskStore((state) => state.tasks);
  const filter     = useTaskStore((state) => state.filter);
  const loading    = useTaskStore((state) => state.loading);
  const loadTasks  = useTaskStore((state) => state.loadTasks);

  // Load real tasks from API on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return (
    <div className="relative pb-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Tasks"
          description="Manage your workflow and productivity."
        />
        <Button icon={Plus} onClick={() => setOpen(true)}>
          New Task
        </Button>
      </div>

      {/* Filters */}
      <TaskFilterBar />

      {/* Loading state */}
      {loading && (
        <div className="mt-10 text-center text-sm text-zinc-500">
          Loading tasks...
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(task) => {
                setSelectedTask(task);
                setOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTasks.length === 0 && (
        <div className="
          relative mt-10 overflow-hidden
          rounded-3xl border border-dashed border-white/10
          bg-zinc-900/70 p-14 text-center
          backdrop-blur-xl shadow-2xl shadow-black/20
        ">
          <div className="noise-overlay absolute inset-0" />
          <div className="relative">
            <div className="
              mx-auto flex h-16 w-16 items-center justify-center
              rounded-3xl bg-gradient-to-br
              from-blue-500/20 to-purple-500/20 text-2xl
            ">
              ✨
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
              No Tasks Found
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-300/80">
              Try changing filters or create a new task to start organizing your workflow.
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      <TaskModal
        open={open}
        editingTask={selectedTask}
        onClose={() => {
          setOpen(false);
          setSelectedTask(null);
        }}
      />

      {/* Focus Button */}
      <button
        onClick={() => navigate("/focus")}
        className="
          fixed bottom-8 right-8 z-40
          flex items-center gap-2 rounded-2xl
          border border-blue-500/20 bg-blue-500/10
          px-4 py-2.5 text-sm font-medium text-blue-300
          backdrop-blur-xl shadow-lg shadow-blue-500/10
          transition hover:bg-blue-500/15
        "
      >
        <Zap size={15} />
        Focus mode
      </button>
    </div>
  );
}

export default Tasks;