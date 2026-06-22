import api from "../lib/api.js";

export const taskService = {
  getTasks: () => api("/tasks"),

  createTask: (task) =>
    api("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  updateTask: (task) =>
    api(`/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    }),

  deleteTask: (id) =>
    api(`/tasks/${id}`, {
      method: "DELETE",
    }),
};