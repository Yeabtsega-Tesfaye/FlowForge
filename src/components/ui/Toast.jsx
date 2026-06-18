import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

function Toast({
  show,
  message,
  type = "info",
}) {
  const styles = {
    success: {
      icon: CheckCircle2,
      color:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    },

    error: {
      icon: AlertCircle,
      color:
        "border-red-500/20 bg-red-500/10 text-red-300",
    },

    warning: {
      icon: AlertTriangle,
      color:
        "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
    },

    info: {
      icon: Info,
      color:
        "border-blue-500/20 bg-blue-500/10 text-blue-300",
    },
  };

  const Icon = styles[type].icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.96,
          }}
          className={`
            fixed bottom-6 right-6 z-[100]

            flex items-center gap-3

            rounded-2xl border
            px-5 py-4

            shadow-2xl
            backdrop-blur-xl

            ${styles[type].color}
          `}
        >
          <Icon size={18} />

          <p className="text-sm font-medium">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;