import prisma from "../lib/prisma.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.notification.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ error: "Notification not found" });
    }

    if (existing.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    res.json(notification);
  } catch (err) {
    next(err);
  }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user.id, read: false },
      data: { read: true },
    });
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    next(err);
  }
};

export const clearNotifications = async (req, res, next) => {
  try {
    await prisma.notification.deleteMany({
      where: { userId: req.user.id },
    });
    res.json({ message: "All notifications cleared" });
  } catch (err) {
    next(err);
  }
};

export const createNotification = async (userId, { title, message, type = "info" }) => {
  return prisma.notification.create({
    data: { title, message, type, userId },
  });
};
