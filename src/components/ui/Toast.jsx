import { motion, AnimatePresence } from "framer-motion";

function Toast({
  show,
  message,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          className="
            fixed bottom-6 right-6 z-[100]
            rounded-xl border border-zinc-800
            bg-zinc-900 px-5 py-3
            text-sm text-white
            shadow-2xl
          "
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;