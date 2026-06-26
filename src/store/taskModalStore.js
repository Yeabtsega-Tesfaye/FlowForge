import { create } from "zustand";

export const useTaskUIStore = create((set) => ({
  selectedTaskId: null,
  mode: null,

  openTask: (task, mode = "details") =>
    set({
      selectedTaskId: task?.id ?? null,
      mode,
    }),

  closeTask: () =>
    set({
      selectedTaskId: null,
      mode: null,
    }),
}));