import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Sparkles,
  Settings,
  Plus,
  Zap,
  BadgeCheck,
  Eraser,
} from "lucide-react";

export const commandItems = [
  {
    id: 1,
    title: "Go to Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    category: "Navigation",
  },

  {
    id: 2,
    title: "Open Tasks",
    path: "/tasks",
    icon: CheckSquare,
    category: "Navigation",
  },

  {
    id: 3,
    title: "Create New Task",
    action: ({ openTask }) => openTask(null, "create"),
    icon: Plus,
    category: "Quick Actions",
  },

    {
    id: 4,
    title: "Lock in",
    path: "/focus",
    icon: Zap,
    category: "Quick Actions",
  },

  {
    id: 5,
    title: "Open Analytics",
    path: "/analytics",
    icon: BarChart3,
    category: "Navigation",
  },

  {
    id: 6,
    title: "AI Assistant",
    path: "/ai-assistant",
    icon: Sparkles,
    category: "Navigation",
  },

  {
    id: 7,
    title: "Settings",
    path: "/settings",
    icon: Settings,
    category: "Navigation",
  },

  {
    id: 8,
    title: "Mark All Notifications as Read",
    action: ({ markAllAsRead }) => markAllAsRead(),
    icon: BadgeCheck,
    category: "Quick Actions",
  },

  {
    id: 9,
    title: "Clear All Notifications",
    action: ({ clearNotifications }) => clearNotifications(),
    icon: Eraser,
    category: "Quick Actions",
  },
];