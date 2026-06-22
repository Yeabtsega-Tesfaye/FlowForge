import { create } from "zustand";
import { notificationService } from "../services/notificationService";

export const useNotificationStore = create((set) => ({
  notifications: [],
  loading: false,

  setNotifications: (notifications) =>
    set({ notifications }),

  resetStore: () =>
    set({ notifications: [], loading: false }),

  loadNotifications: async () => {
    set({ loading: true });

    try {
      const notifications =
        await notificationService.getNotifications();

      set({
        notifications,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  addNotification: async ({ title, message, type = "info" }) => {
    const temp = {
      id: `temp-${Date.now()}`,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      notifications: [temp, ...state.notifications],
    }));
  },

  markAsRead: async (id) => {
    try {
      await notificationService.markAsRead(id);

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationService.markAllAsRead();

      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          read: true,
        })),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  clearNotifications: async () => {
    try {
      await notificationService.clearNotifications();
      set({ notifications: [] });
    } catch (err) {
      console.error(err);
    }
  },
}));