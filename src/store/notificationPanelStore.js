import { create } from "zustand";

export const useNotificationPanelStore = create((set) => ({
  open: false,
  openPanel:  () => set({ open: true  }),
  closePanel: () => set({ open: false }),
  togglePanel: () => set((s) => ({ open: !s.open })),
}));