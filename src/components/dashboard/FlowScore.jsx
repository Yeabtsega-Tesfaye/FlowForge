import { motion } from "framer-motion";

function FlowScore({ score, level }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        mt-6 mb-6
        rounded-3xl border border-white/10
        bg-white/[0.03]
        p-6 backdrop-blur-xl
        text-center
      "
    >
      <p className="text-sm text-zinc-400">
        Flow Score
      </p>

      <h1 className="mt-3 text-5xl font-bold text-white">
        {score}
      </h1>

      <p className="mt-2 text-lg text-emerald-400">
        {level}
      </p>
    </motion.div>
  );
}

export default FlowScore;