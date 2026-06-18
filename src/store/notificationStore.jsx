import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],

      addNotification: ({
        title,
        message,
        type = "info",
      }) =>
        set((state) => ({
          notifications: [
            {
              id: Date.now(),
              title,
              message,
              type,
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...state.notifications,
          ],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map(
            (notification) =>
              notification.id === id
                ? {
                    ...notification,
                    read: true,
                  }
                : notification
          ),
        })),
      deleteNotification: (id) =>
  set((state) => ({
    notifications:
      state.notifications.filter(
        (notification) =>
          notification.id !== id
      ),
  })),

      clearNotifications: () =>
        set({
          notifications: [],
        }),
    }),
    {
      name: "flowforge-notifications",
    }
  )
);