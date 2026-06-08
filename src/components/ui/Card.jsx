import { motion } from "framer-motion";

function Card({
  children,
  className = "",
  hover = false,
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`
        relative overflow-hidden

        rounded-3xl

        border border-white/8

        bg-zinc-900/70

        p-6

        shadow-2xl
        shadow-black/10

        backdrop-blur-xl

        transition-all duration-300

        hover:border-white/10

        ${className}
      `}
    >
      {/* Ambient Overlay */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-white/[0.03]
          to-transparent
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default Card;