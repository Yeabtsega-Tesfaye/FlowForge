import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Sparkles,
  Settings,
  Plus,
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
    title: "Open Analytics",
    path: "/analytics",
    icon: BarChart3,
    category: "Navigation",
  },

  {
    id: 4,
    title: "AI Assistant",
    path: "/ai-assistant",
    icon: Sparkles,
    category: "Navigation",
  },

  {
    id: 5,
    title: "Settings",
    path: "/settings",
    icon: Settings,
    category: "Navigation",
  },

  {
    id: 6,
    title: "Create New Task",
    path: "/tasks",
    icon: Plus,
    category: "Quick Actions",
  },
];