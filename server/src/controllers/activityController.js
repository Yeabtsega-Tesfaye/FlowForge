import prisma from "../lib/prisma.js";

export const getActivity = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Pull last 10 tasks ordered by most recently updated
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    const activity = tasks.map((task) => {
      const isCompleted = task.status === "completed";
      const isInProgress = task.status === "in-progress";

      const action = isCompleted
        ? `Completed "${task.title}"`
        : isInProgress
        ? `Started "${task.title}"`
        : `Created "${task.title}"`;

      const updatedAt = new Date(task.updatedAt);
      const now = new Date();
      const diffMs = now - updatedAt;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      const time =
        diffMins < 1   ? "Just now" :
        diffMins < 60  ? `${diffMins} minutes ago` :
        diffHours < 24 ? `${diffHours} hour${diffHours > 1 ? "s" : ""} ago` :
        diffDays === 1 ? "Yesterday" :
        `${diffDays} days ago`;

      return {
        id:     task.id,
        action,
        time,
      };
    });

    res.json(activity);
  } catch (err) {
    next(err);
  }
};
