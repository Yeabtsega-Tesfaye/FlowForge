import prisma from "../lib/prisma.js";
import { createNotification } from "./notificationController.js";

// ── helper ──────────────────────────────────────────────
const logActivity = (userId, taskId, taskTitle, type) =>
  prisma.activityLog.create({
    data: { userId, taskId, taskTitle, type },
  });

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = await prisma.task.create({
      data: {
        title,
        description: description ?? null,
        priority: priority ?? "medium",
        status: status ?? "todo",
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.user.id,
      },
    });

    // log creation
    await logActivity(req.user.id, task.id, task.title, "created");

    await createNotification(req.user.id, {
      title: "Task Created",
      message: `${task.title} added successfully`,
      type: "success",
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.task.findUnique({ where: { id } });

    if (!existing) return res.status(404).json({ error: "Task not found" });
    if (existing.userId !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    const { title, description, priority, status, dueDate } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status }),
        ...(dueDate !== undefined && {
          dueDate: dueDate ? new Date(dueDate) : null,
        }),
      },
    });

    // log status change only when status actually changed
    if (status !== undefined && status !== existing.status) {
      const validTypes = ["in-progress", "completed"];
      if (validTypes.includes(status)) {
        await logActivity(req.user.id, task.id, task.title, status);
      }
    }

    await createNotification(req.user.id, {
      title: "Task Updated",
      message: `${task.title} updated successfully`,
      type: "info",
    });

    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.task.findUnique({ where: { id } });

    if (!existing) return res.status(404).json({ error: "Task not found" });
    if (existing.userId !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    await prisma.task.delete({ where: { id } });

    await createNotification(req.user.id, {
      title: "Task Deleted",
      message: `${existing.title} removed`,
      type: "error",
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};