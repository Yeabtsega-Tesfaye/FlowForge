import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Pause, Play, SkipForward, Check } from "lucide-react";
import { useFocusStore } from "../../store/focusStore";
import { useTaskStore } from "../../store/taskStore";

const WORK_DURATION = 25 * 60;
const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function FocusTimer({ onExit }) {
  const {
    activeTask, mode, timeLeft, isRunning, cycleCount,
    tick, pause, resume, skipSegment, endSession,
  } = useFocusStore();

  const toggleTaskStatus = useTaskStore((s) => s.toggleTaskStatus);

  // Tick every second
  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const total    = mode === "work" ? WORK_DURATION : 5 * 60;
  const progress = 1 - timeLeft / total;
  const offset   = CIRCUMFERENCE * (1 - progress);

  const handleComplete = () => {
    if (activeTask) toggleTaskStatus(activeTask.id);
    endSession();
    onExit();
  };

  const handleExit = () => {
    endSession();
    onExit();
  };

  return (
    <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <button
        onClick={handleExit}
        className="
            fixed right-8 top-8 z-50
            flex h-8 w-8 items-center justify-center
            rounded-xl border border-white/10
            bg-white/[0.03] text-zinc-500
            transition hover:text-white
        "
        >
        <X size={16} />
        </button>

      <p className="mb-3 text-xs uppercase tracking-widest text-zinc-600">
        {mode === "work" ? "Currently focusing on" : "Take a break"}
      </p>

      <h1 className="mb-8 max-w-sm text-2xl font-medium leading-snug text-white">
        {mode === "work" ? activeTask?.title : "Step away for a few minutes"}
      </h1>

      <div className="relative mb-2 flex h-40 w-40 items-center justify-center">
        <svg width="160" height="160" className="absolute inset-0 -rotate-90">
          <circle
            cx="80" cy="80" r={RADIUS}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"
          />
          <circle
            cx="80" cy="80" r={RADIUS}
            fill="none"
            stroke="url(#timerGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
          <defs>
            <linearGradient id="timerGrad" x1="0" y1="0" x2="160" y2="160">
              <stop offset="0%"   stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-5xl font-light tabular-nums text-white">
          {formatTime(timeLeft)}
        </span>
      </div>

      <p className="mb-9 text-xs text-zinc-600">
        {mode === "work" ? "Focus session — 25 min" : "Break — 5 min"}
      </p>

      <div className="flex items-center gap-3.5">
        <button
          onClick={skipSegment}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full border border-white/10
            bg-white/[0.04] text-zinc-400
            transition hover:scale-105 hover:text-white
          "
        >
          <SkipForward size={16} />
        </button>

        <button
          onClick={isRunning ? pause : resume}
          className="
            flex h-14 w-14 items-center justify-center
            rounded-full border border-white/10
            bg-white/[0.04] text-zinc-400
            transition hover:scale-105 hover:text-white
          "
        >
          {isRunning ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </button>

        {mode === "work" && (
          <button
            onClick={handleComplete}
            className="
              flex h-10 w-10 items-center justify-center
            rounded-full border border-white/10
            bg-white/[0.04] text-zinc-400
            transition hover:scale-105 hover:text-white
            "
          >
            <Check size={16} />
          </button>
        )}
      </div>

      <div className="mt-10 flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: i < cycleCount
                ? "#60a5fa"
                : "rgba(255,255,255,0.15)",
            }}
            className="h-1.5 w-1.5 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

export default FocusTimer;