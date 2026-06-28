import express    from "express";
import cors       from "cors";
import dotenv     from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import analyticsRoutes from "./routes/analytics.js";
import notificationRoutes from "./routes/notifications.js";
import activityRoutes     from "./routes/activity.js";
import aiRoutes           from "./routes/ai.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app  = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT ?? 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://flow-forge-sepia.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
