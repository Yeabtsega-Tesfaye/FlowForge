import { useTaskStore } from "../../store/taskStore";

function TaskFilterBar() {
  const { filter, setFilter } = useTaskStore();

  const filters = [
    "all",
    "todo",
    "in-progress",
    "completed",
  ];

  return (
    <div
      className="
        flex flex-wrap gap-2
        rounded-2xl border
        border-zinc-800
        bg-zinc-900/60 p-4
      "
    >
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`
            rounded-xl px-4 py-2
            text-sm font-medium
            transition-all duration-200

            ${
              filter === item
                ? `
                  bg-blue-600 text-white
                `
                : `
                  text-zinc-400
                  hover:bg-zinc-800
                  hover:text-white
                `
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default TaskFilterBar;