import { create } from "zustand";

const WORK_DURATION  = 25 * 60; // seconds
const BREAK_DURATION = 5  * 60;

export const useFocusStore = create((set, get) => ({
  activeTask:    null,
  mode:          "work",   // "work" | "break"
  timeLeft:      WORK_DURATION,
  isRunning:     false,
  cycleCount:    0,         // completed work sessions

  startSession: (task) =>
    set({
      activeTask: task,
      mode:       "work",
      timeLeft:   WORK_DURATION,
      isRunning:  true,
    }),

  pause:  () => set({ isRunning: false }),
  resume: () => set({ isRunning: true }),

  tick: () => {
    const { timeLeft, isRunning } = get();
    if (!isRunning) return;
    if (timeLeft <= 1) {
      get().completeSegment();
      return;
    }
    set({ timeLeft: timeLeft - 1 });
  },

  completeSegment: () => {
    const { mode, cycleCount } = get();
    if (mode === "work") {
      set({
        mode:       "break",
        timeLeft:   BREAK_DURATION,
        isRunning:  true,
        cycleCount: cycleCount + 1,
      });
    } else {
      set({
        mode:      "work",
        timeLeft:  WORK_DURATION,
        isRunning: true,
      });
    }
  },

  skipSegment: () => get().completeSegment(),

  endSession: () =>
    set({
      activeTask: null,
      mode:       "work",
      timeLeft:   WORK_DURATION,
      isRunning:  false,
      cycleCount: 0,
    }),
}));