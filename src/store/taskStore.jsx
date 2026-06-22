import { create } from "zustand";
import { taskService } from "../services/taskService";
import { useNotificationStore } from "./notificationStore";

export const useTaskStore = create((set, get) => ({
  tasks:   [],
  filter:  "all",
  loading: false,
  error:   null,

  setFilter: (filter) => set({ filter }),

  loadTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await taskService.getTasks();
      set({ tasks, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addTask: async (task) => {
    try {
      const newTask = await taskService.createTask(task);
      set((state) => ({ tasks: [newTask, ...state.tasks] }));
      useNotificationStore.getState().addNotification({
        title:   "Task Created",
        message: `${newTask.title} added successfully`,
        type:    "success",
      });
    } catch (err) {
      useNotificationStore.getState().addNotification({
        title:   "Error",
        message: err.message,
        type:    "error",
      });
    }
  },

  updateTask: async (updatedTask) => {
    try {
      const task = await taskService.updateTask(updatedTask);
      set((state) => ({
        tasks: state.tasks.map((t) => t.id === task.id ? task : t),
      }));
      useNotificationStore.getState().addNotification({
        title:   "Task Updated",
        message: `${task.title} updated successfully`,
        type:    "info",
      });
    } catch (err) {
      useNotificationStore.getState().addNotification({
        title:   "Error",
        message: err.message,
        type:    "error",
      });
    }
  },

  deleteTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    try {
      await taskService.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
      if (task) {
        useNotificationStore.getState().addNotification({
          title:   "Task Deleted",
          message: `${task.title} removed`,
          type:    "error",
        });
      }
    } catch (err) {
      useNotificationStore.getState().addNotification({
        title:   "Error",
        message: err.message,
        type:    "error",
      });
    }
  },

  toggleTaskStatus: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    const nextStatus =
      task.status === "todo"        ? "in-progress" :
      task.status === "in-progress" ? "completed"   : "todo";

    try {
      const updated = await taskService.updateTask({
        ...task,
        status: nextStatus,
      });
      set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? updated : t),
      }));
      useNotificationStore.getState().addNotification({
        title:   "Task Updated",
        message: `${task.title} → ${nextStatus}`,
        type:    "info",
      });
    } catch (err) {
      useNotificationStore.getState().addNotification({
        title:   "Error",
        message: err.message,
        type:    "error",
      });
    }
  },
}));