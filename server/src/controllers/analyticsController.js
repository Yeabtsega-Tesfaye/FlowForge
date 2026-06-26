import prisma from "../lib/prisma.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get all user tasks
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    const total     = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;

    const createdThisWeek = tasks.filter((task) => {
  const created = new Date(task.createdAt);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return created >= weekAgo;
}).length;

    // Completion rate
    const completionRate = total === 0
      ? 0
      : Math.round((completed / total) * 100);

    // Tasks per day of the week (last 7 days)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now  = new Date();

    const productivityData = days.map((name, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (now.getDay() - i));
      date.setHours(0, 0, 0, 0);

      const next = new Date(date);
      next.setDate(date.getDate() + 1);

      const count = tasks.filter((t) => {
        const created = new Date(t.createdAt);
        return created >= date && created < next;
      }).length;

      return { name, completed: count };
    });

    // Best day
    const bestDay = productivityData.reduce((best, day) =>
      day.completed > best.completed ? day : best,
      productivityData[0]
    );

    // Daily average
    const activeDays = productivityData.filter((d) => d.completed > 0).length;
    const dailyAverage = activeDays === 0
      ? 0
      : (total / activeDays).toFixed(1);


      const getFlowLevel = (score) => {
  if (score >= 90) return "Elite";
  if (score >= 75) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Focus";
};

const consistency =
  Math.round((activeDays / 7) * 100);

const taskVolume =
  Math.min(completed * 5, 100);

const flowScore = Math.round(
  completionRate * 0.5 +
  consistency * 0.3 +
  taskVolume * 0.2
);

const flowLevel = getFlowLevel(flowScore);

console.log({
  total,
  completed,
  completionRate,
  consistency,
  taskVolume,
  flowScore,
});

    // Stats cards data
let productivityBadge = "Needs Focus";

if (completionRate >= 90) {
  productivityBadge = "Excellent";
} else if (completionRate >= 75) {
  productivityBadge = "Good";
} else if (completionRate >= 50) {
  productivityBadge = "Average";
}

const statsData = [
  {
    title: "Total Tasks",
    value: String(total),
    badge: `${total} Total`,
    badgeColor: "blue",
    subtitle: `+ ${createdThisWeek} added this week`,
  },

  {
    title: "Completed",
    value: String(completed),
    badge: `${completionRate}%`,
    badgeColor: "emerald",
    subtitle: "Completion rate",
  },

  {
    title: "Productivity",
    value: `${completionRate}%`,
    badge: productivityBadge,
    badgeColor: "purple",
    subtitle: `${completed} of ${total} completed`,
  },

  {
    title: "In Progress",
    value: String(inProgress),
    badge: inProgress > 0 ? "Active" : "Idle",
    badgeColor: "amber",
    subtitle: "Tasks currently in progress",
  },
];

    // Derived insights
    const weekendDays   = ["Sat", "Sun"];
    const weekdayAvg   = productivityData
      .filter((d) => !weekendDays.includes(d.name))
      .reduce((sum, d) => sum + d.completed, 0) / 5;

    const satCount      = productivityData.find((d) => d.name === "Sat")?.completed ?? 0;
    const weekendDrop   = weekdayAvg === 0
      ? "N/A"
      : `−${Math.round(((weekdayAvg - satCount) / weekdayAvg) * 100)}%`;

    const insights = [
      {
        label: "Weekend drop-off",
        value: weekendDrop,
        sub:   "Sat vs weekday avg",
      },
      {
        label: "Mid-week peak",
        value: bestDay.name,
        sub:   `${bestDay.completed} tasks completed`,
      },
      {
        label: "Task streak",
        value: `${activeDays} days`,
        sub:   "Active days this week",
      },
    ];

    // Derived stats for analytics page
    const derivedStats = [
      {
        label:    "Completion rate",
        value:    `${completionRate}%`,
        sub:      "+5% vs last week",
        subColor: "text-emerald-400",
        glow:     "from-emerald-500/[0.08]",
      },
      {
        label:    "Daily average",
        value:    String(dailyAverage),
        sub:      "tasks per day",
        subColor: "text-blue-400",
        glow:     "from-blue-500/[0.08]",
      },
      {
        label:    "Best day",
        value:    bestDay.name,
        sub:      `${bestDay.completed} tasks completed`,
        subColor: "text-purple-400",
        glow:     "from-purple-500/[0.08]",
      },
      {
        label:    "In progress",
        value:    String(inProgress),
        sub:      "tasks active now",
        subColor: "text-amber-400",
        glow:     "from-amber-500/[0.08]",
      },
    ];

    res.json({
      statsData,
      derivedStats,
      productivityData,
      insights,
      flowScore,
      flowLevel,
    });
  } catch (err) {
    next(err);
  }
  
};
