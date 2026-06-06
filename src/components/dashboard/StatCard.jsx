import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  change,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="
        group relative overflow-hidden

        rounded-3xl border border-white/8

        bg-white/[0.03]
        p-6

        backdrop-blur-xl

        card-hover
      "
    >
      {/* Ambient Glow */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-blue-500/[0.08]
          via-transparent
          to-purple-500/[0.06]

          opacity-0
          transition-opacity duration-500

          group-hover:opacity-100
        "
      />

      {/* Noise Texture */}
      <div className="noise-overlay absolute inset-0" />

      <div className="relative flex items-start justify-between">
        <div>
          <p
            className="
              text-sm font-medium
              tracking-tight text-zinc-400
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-4 text-4xl
              font-semibold tracking-tight
              text-white
            "
          >
            {value}
          </h3>
        </div>

        {/* Change Badge */}
        <div
          className="
            rounded-full border
            border-emerald-500/10

            bg-emerald-500/10

            px-3 py-1.5

            text-xs font-semibold
            tracking-tight

            text-emerald-300

            shadow-lg
            shadow-emerald-500/10
          "
        >
          {change}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="
          absolute bottom-0 left-0

          h-px w-full

          bg-gradient-to-r
          from-blue-500/0
          via-blue-500/40
          to-purple-500/0
        "
      />
    </motion.div>
  );
}

export default StatCard;