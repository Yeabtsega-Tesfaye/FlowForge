import prisma from "../lib/prisma.js";
import { createNotification } from "./notificationController.js";

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

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

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

    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (existing.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

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

    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (existing.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

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
