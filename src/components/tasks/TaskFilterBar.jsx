import { motion } from "framer-motion";

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
        relative overflow-hidden

        rounded-3xl border border-white/8

        bg-white/[0.03]
        p-3

        backdrop-blur-xl
      "
    >
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const active = filter === item;

          return (
            <motion.button
              key={item}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(item)}
              className={`
                relative overflow-hidden

                rounded-2xl px-5 py-3

                text-sm font-medium
                tracking-tight

                transition-all duration-300

                ${
                  active
                    ? `
                      border border-blue-500/10

                      bg-gradient-to-r
                      from-blue-500/20
                      to-purple-500/20

                      text-white

                      shadow-lg
                      shadow-blue-500/10
                    `
                    : `
                      border border-transparent

                      text-zinc-400

                      hover:border-white/5
                      hover:bg-white/[0.04]
                      hover:text-white
                    `
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="task-filter-active"
                  className="
                    absolute inset-0

                    bg-gradient-to-r
                    from-blue-500/10
                    to-purple-500/10
                  "
                />
              )}

              <span className="relative z-10 capitalize">
                {item}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default TaskFilterBar;