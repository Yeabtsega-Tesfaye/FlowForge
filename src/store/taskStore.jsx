import { create } from "zustand";
import { persist } from "zustand/middleware";

import { taskService } from "../services/taskService";

import { useNotificationStore } from "./notificationStore";

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: 1,
          title: "Design landing page UI",
          description: "Create modern SaaS landing page design",
          priority: "high",
          status: "in-progress",
          dueDate: "2026-06-10",
        },
      ],

      filter: "all",
      loading: false,

      setFilter: (filter) => set({ filter }),

      loadTasks: async () => {
        set({ loading: true });

        const tasks = await taskService.getTasks(get().tasks);

        set({
          tasks,
          loading: false,
        });
      },

      addTask: (task) => {
        useNotificationStore.getState().addNotification({
          title: "Task Created",
          message: `${task.title} added successfully`,
          type: "success",
        });

        set((state) => ({
          tasks: [
            { id: Date.now(), ...task },
            ...state.tasks,
          ],
        }));
      },

      updateTask: async (updatedTask) => {
        await taskService.updateTask(updatedTask);

        useNotificationStore.getState().addNotification({
          title: "Task Updated",
          message: `${updatedTask.title} updated successfully`,
          type: "info",
        });

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        }));
      },

      deleteTask: (id) => {
        const task = get().tasks.find((task) => task.id === id);

        if (task) {
          useNotificationStore.getState().addNotification({
            title: "Task Deleted",
            message: `${task.title} removed`,
            type: "error",
          });
        }

        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      toggleTaskStatus: async (id) => {
        const task = get().tasks.find((task) => task.id === id);
        if (!task) return;

        const nextStatus =
          task.status === "todo"
            ? "in-progress"
            : task.status === "in-progress"
              ? "completed"
              : "todo";

        const updatedTask = { ...task, status: nextStatus };

        await taskService.updateTask(updatedTask);

        useNotificationStore.getState().addNotification({
          title: "Task Updated",
          message: `${task.title} → ${nextStatus}`,
          type: "info",
        });

        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? updatedTask : t
          ),
        }));
      },
    }),
    {
      name: "flowforge-tasks",
    }
  )
);