import api from "../lib/api.js";

export const notificationService = {
  getNotifications: () => api("/notifications"),

  markAsRead: (id) =>
    api(`/notifications/${id}/read`, { method: "PUT" }),

  markAllAsRead: () =>
    api("/notifications/read-all", { method: "PUT" }),

  clearNotifications: () =>
    api("/notifications", { method: "DELETE" }),
};