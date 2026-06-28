import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";
import { useTaskStore } from "../../store/taskStore";

function getThisWeekTasks(tasks) {
  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

  return tasks.filter((t) => new Date(t.createdAt) >= startOfWeek);
}

function ProgressRingCard() {
  const tasks = useTaskStore((s) => s.tasks);

  const weekTasks = getThisWeekTasks(tasks);
  const total = weekTasks.length;
  const completed = weekTasks.filter((t) => t.status === "completed").length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (rate / 100) * circumference;

  return (
    <GlassCard glow="from-blue-500/[0.07]">
      <div className="mb-5">
        <Pill color="blue">Progress</Pill>
        <h2 className="mt-3 text-xl font-semibold text-white">
          This week
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Tasks completed so far
        </p>
      </div>

      {total === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-zinc-600">
          No tasks this week yet.
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <svg height={radius * 2} width={radius * 2}>
              {/* Track */}
              <circle
                stroke="rgba(255,255,255,0.06)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Progress */}
              <circle
                stroke="url(#ringGradient)"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                transform={`rotate(-90 ${radius} ${radius})`}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {/* Center text */}
              <text
                x={radius}
                y={radius - 6}
                textAnchor="middle"
                fill="white"
                fontSize="22"
                fontWeight="600"
              >
                {rate}%
              </text>
              <text
                x={radius}
                y={radius + 14}
                textAnchor="middle"
                fill="#71717a"
                fontSize="11"
              >
                complete
              </text>
            </svg>
          </div>

          <div className="flex w-full justify-between rounded-2xl border border-white/[0.05] bg-white/[0.02] px-5 py-3">
            <div className="text-center">
              <p className="text-lg font-semibold text-white">{completed}</p>
              <p className="text-xs text-zinc-500">Done</p>
            </div>
            <div className="w-px bg-white/[0.05]" />
            <div className="text-center">
              <p className="text-lg font-semibold text-white">{total - completed}</p>
              <p className="text-xs text-zinc-500">Remaining</p>
            </div>
            <div className="w-px bg-white/[0.05]" />
            <div className="text-center">
              <p className="text-lg font-semibold text-white">{total}</p>
              <p className="text-xs text-zinc-500">Total</p>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

export default ProgressRingCard;