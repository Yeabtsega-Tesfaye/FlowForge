import { motion } from "framer-motion";

function Dot({ delay }) {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay,
      }}
      className="
        h-2 w-2 rounded-full
        bg-zinc-400
      "
    />
  );
}

function AITypingIndicator() {
  return (
    <div className="flex">
      <div
        className="
          flex items-center gap-2

          rounded-3xl border
          border-white/10

          bg-white/[0.04]

          px-4 py-3

          backdrop-blur-xl
        "
      >
        <Dot delay={0} />
        <Dot delay={0.15} />
        <Dot delay={0.3} />
      </div>
    </div>
  );
}

export default AITypingIndicator;