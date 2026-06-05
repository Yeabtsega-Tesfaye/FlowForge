import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Sparkles,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "AI Assistant",
    path: "/ai-assistant",
    icon: Sparkles,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];