import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNotificationStore } from "./notificationStore";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: async (user, token) => {
        localStorage.setItem("flowforge-token", token);

        set({ user, token });

        // reset old data
        useNotificationStore.getState().resetStore();

        // load fresh notifications for THIS user
        await useNotificationStore
          .getState()
          .loadNotifications();
      },

      clearAuth: () => {
        localStorage.removeItem("flowforge-token");

        set({ user: null, token: null });

        useNotificationStore.getState().resetStore();
      },
    }),
    { name: "flowforge-auth" }
  )
);