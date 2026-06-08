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

  const tasks = useTaskStore((state) => state.tasks);

  const filter = useTaskStore((state) => state.filter);

  const filteredTasks = useMemo(() => {
    if (filter === "all") {
      return tasks;
    }

    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return (
    <div className="relative pb-10">

    {/* Ambient Background */}
        <div
        className="
            pointer-events-none absolute
            inset-0 overflow-hidden
        "
        >
        {/* Blue Glow */}
        <div
            className="
            absolute

            left-[-15%]
            top-[-10%]

            h-[40rem]
            w-[40rem]

            rounded-full

            bg-blue-500/[0.03]

            blur-[140px]
            "
        />

        {/* Purple Glow */}
        <div
            className="
            absolute

            right-[-10%]
            top-[20%]

            h-[38rem]
            w-[38rem]

            rounded-full

            bg-purple-500/[0.03]

            blur-[140px]
            "
        />

        {/* Center Glow */}
        <div
            className="
            absolute

            left-1/2 top-1/2

            h-[30rem]
            w-[30rem]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-cyan-500/[0.02]

            blur-[120px]
            "
        />
        </div>

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

          <Button icon={Plus} onClick={() => setOpen(true)}>
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
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div
            className="
    relative mt-10 overflow-hidden

    rounded-3xl border
    border-dashed border-white/10

    bg-zinc-900/70

    p-14 text-center

    backdrop-blur-xl shadow-2xl shadow-black/20
  "
          >
            <div className="noise-overlay absolute inset-0" />

            <div className="relative">
              <div
                className="
        mx-auto flex h-16 w-16
        items-center justify-center

        rounded-3xl

        bg-gradient-to-br
        from-blue-500/20
        to-purple-500/20

        text-2xl
      "
              >
                ✨
              </div>

              <h3
                className="
        mt-6 text-2xl
        font-semibold tracking-tight
        text-white
      "
              >
                No Tasks Found
              </h3>

              <p
                className="
        mx-auto mt-3 max-w-md
        text-sm leading-relaxed
        text-zinc-300/80
      "
              >
                Try changing filters or create a new task to start organizing
                your workflow.
              </p>
            </div>
          </div>
        )}

        {/* Modal */}
        <TaskModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Tasks;
