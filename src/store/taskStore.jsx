import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [
        {
          id: 1,
          title: "Design landing page UI",
          description:
            "Create modern SaaS landing page design",
          priority: "high",
          status: "in-progress",
          dueDate: "2026-06-10",
        },
      ],

      filter: "all",

      setFilter: (filter) =>
        set({
          filter,
        }),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            {
              id: Date.now(),
              ...task,
            },
            ...state.tasks,
          ],
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => task.id !== id
          ),
        })),

      toggleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status:
                    task.status === "completed"
                      ? "todo"
                      : "completed",
                }
              : task
          ),
        })),
    }),
    {
      name: "flowforge-tasks",
    }
  )
);