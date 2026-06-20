import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TaskPicker from "../components/focus/TaskPicker";
import FocusTimer from "../components/focus/FocusTimer";
import { useFocusStore } from "../store/focusStore";

function Focus() {
  const navigate = useNavigate();
  const startSession = useFocusStore((s) => s.startSession);
  const activeTask    = useFocusStore((s) => s.activeTask);

  const handleSelect = (task) => startSession(task);
  const handleExit    = () => navigate("/dashboard");

  return (
    <div className="
      fixed inset-0 z-[100]
      flex items-center justify-center
      overflow-hidden bg-[#050507] px-6
    ">
      {/* Breathing glow */}
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="
          pointer-events-none absolute h-[480px] w-[480px]
          rounded-full blur-[60px]
        "
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.18), rgba(124,58,237,0.10) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!activeTask ? (
            <motion.div
              key="picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TaskPicker onSelect={handleSelect} />
            </motion.div>
          ) : (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <FocusTimer onExit={handleExit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Focus;