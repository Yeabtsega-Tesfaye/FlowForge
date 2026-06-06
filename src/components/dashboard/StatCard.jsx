import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  change,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="
        rounded-2xl border border-zinc-800
        bg-zinc-900/60 p-6
        backdrop-blur-sm
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h3
            className="
              mt-3 text-3xl
              font-bold tracking-tight
              text-white
            "
          >
            {value}
          </h3>
        </div>

        <div
          className="
            rounded-full bg-emerald-500/15
            px-3 py-1 text-xs
            font-medium text-emerald-400
          "
        >
          {change}
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;