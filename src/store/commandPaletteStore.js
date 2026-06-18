import { create } from "zustand";

export const useCommandPaletteStore = create((set) => ({
  open: false,
  openPalette:  () => set({ open: true  }),
  closePalette: () => set({ open: false }),
}));