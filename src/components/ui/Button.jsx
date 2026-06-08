import { motion } from "framer-motion";

function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  className = "",
  ...props
}) {
  const variants = {
    primary: `
      border border-blue-500/20

      bg-gradient-to-b
      from-blue-500
      to-blue-600

      text-white

      shadow-lg
      shadow-blue-500/20

      hover:from-blue-400
      hover:to-blue-500

      hover:shadow-blue-500/30
    `,

    secondary: `
      border border-white/10

      bg-white/[0.04]

      text-white

      hover:bg-white/[0.07]
      hover:border-white/15
    `,

    ghost: `
      border border-transparent

      bg-transparent

      text-zinc-300

      hover:bg-white/[0.05]
      hover:text-white
    `,
  };

  const sizes = {
    sm: `
      h-10 px-4 text-sm
      rounded-xl
    `,

    md: `
      h-11 px-5 text-sm
      rounded-2xl
    `,

    lg: `
      h-12 px-6 text-base
      rounded-2xl
    `,
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      className={`
        relative inline-flex
        items-center justify-center
        gap-2 overflow-hidden

        font-medium tracking-tight

        backdrop-blur-xl

        transition-all duration-300

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {/* Shine */}
      <div
        className="
          absolute inset-0

          opacity-0 transition-opacity
          duration-500

          hover:opacity-100

          bg-gradient-to-r
          from-white/0
          via-white/10
          to-white/0
        "
      />

      <span
        className="
          relative z-10
          inline-flex items-center gap-2
        "
      >
        {loading ? (
          <div
            className="
              h-4 w-4 animate-spin
              rounded-full

              border-2
              border-white/30
              border-t-white
            "
          />
        ) : (
          Icon && <Icon size={18} />
        )}

        {children}
      </span>
    </motion.button>
  );
}

export default Button;