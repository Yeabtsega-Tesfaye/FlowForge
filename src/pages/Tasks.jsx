import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";

import TaskCard from "../components/tasks/TaskCard";
import TaskFilterBar from "../components/tasks/TaskFilterBar";
import TaskModal from "../components/tasks/TaskModal";

import { useTaskStore } from "../store/taskStore";

function Tasks() {
  const [open, setOpen] = useState(false);

  const tasks = useTaskStore(
    (state) => state.tasks
  );

  const filter = useTaskStore(
    (state) => state.filter
  );

  const filteredTasks = useMemo(() => {
    if (filter === "all") {
      return tasks;
    }

    return tasks.filter(
      (task) => task.status === filter
    );
  }, [tasks, filter]);

  return (
    <div>
      {/* Header */}
      <div
        className="
          mb-6 flex flex-col gap-4
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        <PageHeader
          title="Tasks"
          description="Manage your workflow and productivity."
        />

        <Button
          icon={Plus}
          onClick={() => setOpen(true)}
        >
          New Task
        </Button>
      </div>

      {/* Filters */}
      <TaskFilterBar />

      {/* Grid */}
      <div
        className="
          mt-6 grid gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div
          className="
            mt-10 rounded-2xl
            border border-dashed
            border-zinc-800 p-12
            text-center
          "
        >
          <h3 className="text-lg font-semibold text-white">
            No Tasks Found
          </h3>

          <p className="mt-2 text-zinc-500">
            Try changing filters or create a task.
          </p>
        </div>
      )}

      {/* Modal */}
      <TaskModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default Tasks;