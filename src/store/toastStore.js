import { create } from "zustand";

export const useToastStore = create(
  (set) => ({
    toasts: [],

    addToast: ({
      title,
      message,
      type = "success",
    }) => {
      const id = Date.now();

      set((state) => ({
        toasts: [
          ...state.toasts,
          {
            id,
            title,
            message,
            type,
          },
        ],
      }));

      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter(
            (toast) => toast.id !== id
          ),
        }));
      }, 3500);
    },

    removeToast: (id) =>
      set((state) => ({
        toasts: state.toasts.filter(
          (toast) => toast.id !== id
        ),
      })),
  })
);