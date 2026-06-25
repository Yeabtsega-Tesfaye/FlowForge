import { motion } from "framer-motion";

function StatCard({ title, value, badge, badgeColor, subtitle, icon: Icon }) {
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
<div className="flex items-center gap-3 mb-3">
  {Icon && (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
      <Icon size={18} className="text-zinc-300" />
    </div>
  )}

  <p className="text-sm font-medium tracking-tight text-zinc-400 leading-none flex items-center">
    {title}
  </p>
</div>

          <h3
            className="
              mt-4 text-4xl
              font-semibold tracking-tight
              text-white
            "
          >
            {value}
          </h3>

          <p
            className="
    mt-2
    text-sm
    text-zinc-500
  "
          >
            {subtitle}
          </p>
        </div>

        {/* Change Badge */}
        <div
          className={`
    rounded-full border px-3 py-1.5
    text-xs font-semibold tracking-tight

    ${
      badgeColor === "blue"
        ? "border-blue-500/10 bg-blue-500/10 text-blue-300 shadow-blue-500/10"
        : badgeColor === "emerald"
          ? "border-emerald-500/10 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/10"
          : badgeColor === "purple"
            ? "border-purple-500/10 bg-purple-500/10 text-purple-300 shadow-purple-500/10"
            : "border-amber-500/10 bg-amber-500/10 text-amber-300 shadow-amber-500/10"
    }

    shadow-lg
  `}
        >
          {badge}
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
