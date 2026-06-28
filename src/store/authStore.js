import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNotificationStore } from "./notificationStore";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user:  null,
      token: null,

      setAuth: async (user, token) => {
        localStorage.setItem("flowforge-token", token);
        set({ user, token });
        useNotificationStore.getState().loadNotifications();
      },

      clearAuth: () => {
        localStorage.removeItem("flowforge-token");
        set({ user: null, token: null });
        useNotificationStore.getState().resetStore();
      },

      setUser: (user) => set({ user }),

      // Called on app load to rehydrate user from API
      loadUser: async () => {
        const token = get().token;
        if (!token) return;
        try {
          const { getMe } = await import("../services/authService.js");
          const user = await getMe();
          set({ user });

        await useNotificationStore.getState().loadNotifications();
        } catch {
          // Token expired or invalid — clear everything
          get().clearAuth();
        }
      },
    }),
    {
      name: "flowforge-auth",
      // Persist both token and user so page refresh doesn't wipe user
      partialize: (s) => ({ token: s.token, user: s.user }),
    }
  )
);