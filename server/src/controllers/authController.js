import bcrypt from "bcryptjs";
import jwt    from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email },
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

const SAFE_USER_FIELDS = {
  id:          true,
  name:        true,
  email:       true,
  role:        true,
  bio:         true,
  preferences: true,
  createdAt:   true,
  avatarSeed:  true,
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const seed = `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, avatarSeed: seed },
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
        avatarSeed: user.avatarSeed,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
        avatarSeed: user.avatarSeed,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where:  { id: req.user.id },
      select: SAFE_USER_FIELDS,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, email, bio, role, password, avatarSeed } = req.body;

    // If changing email, make sure it's not taken by another user
    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== req.user.id) {
        return res.status(409).json({ error: "Email already in use" });
      }
    }

    const data = {
      ...(name     && { name }),
      ...(email    && { email }),
      ...(bio      !== undefined && { bio }),
      ...(role     && { role }),
      ...(avatarSeed && { avatarSeed }),
    };

    // Only hash and update password if provided
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      data.password = await bcrypt.hash(password, 12);
    }

    const user = await prisma.user.update({
      where:  { id: req.user.id },
      data,
      select: SAFE_USER_FIELDS,
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getPreferences = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where:  { id: req.user.id },
      select: { preferences: true },
    });

    // Return defaults if no preferences saved yet
    const defaults = {
      email: {
        taskReminders: true,
        weeklyDigest:  true,
        updates:       false,
      },
      inApp: {
        taskDone:      true,
        aiSuggestions: true,
        streakAlerts:  false,
      },
    };

    res.json(user?.preferences ?? defaults);
  } catch (err) {
    next(err);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where:  { id: req.user.id },
      data:   { preferences: req.body },
      select: { preferences: true },
    });

    res.json(user.preferences);
  } catch (err) {
    next(err);
  }
};

export const exportData = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where:  { id: req.user.id },
      select: SAFE_USER_FIELDS,
    });

    const tasks = await prisma.task.findMany({
      where:   { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    const notifications = await prisma.notification.findMany({
      where:   { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    const exportPayload = {
      exportedAt:    new Date().toISOString(),
      user,
      tasks,
      notifications,
    };

    res.setHeader("Content-Disposition", "attachment; filename=flowforge-export.json");
    res.setHeader("Content-Type", "application/json");
    res.json(exportPayload);
  } catch (err) {
    next(err);
  }
};

export const resetWorkspace = async (req, res, next) => {
  try {
    await prisma.task.deleteMany({
      where: { userId: req.user.id },
    });

    await prisma.notification.deleteMany({
      where: { userId: req.user.id },
    });

    res.json({ message: "Workspace reset successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    // Cascade in schema handles tasks and notifications automatically
    await prisma.user.delete({
      where: { id: req.user.id },
    });

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};