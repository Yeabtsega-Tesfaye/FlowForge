import prisma from "../lib/prisma.js";

const formatTime = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1)   return "Just now";
  if (diffMins < 60)  return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

const actionLabel = {
  created:       (title) => `Created "${title}"`,
  "in-progress": (title) => `Started "${title}"`,
  completed:     (title) => `Completed "${title}"`,
};

export const getActivity = async (req, res, next) => {
  try {
    const logs = await prisma.activityLog.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const activity = logs.map((log) => ({
      id:     log.id,
      action: (actionLabel[log.type] ?? actionLabel.created)(log.taskTitle),
      time:   formatTime(log.createdAt),
      type:   log.type,
    }));

    res.json(activity);
  } catch (err) {
    next(err);
  }
};