import { create } from "zustand";

export const useSearchModalStore = create((set) => ({
  open: false,

  openSearch: () => set({ open: true }),

  closeSearch: () => set({ open: false }),

  toggleSearch: () =>
    set((state) => ({ open: !state.open })),
}));