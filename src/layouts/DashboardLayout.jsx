import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useSidebarStore } from "../store/sidebarStore";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { collapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={`
        transition-all duration-300 ease-in-out
        ${collapsed ? "lg:pl-20" : "lg:pl-72"}
      `}>
        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;