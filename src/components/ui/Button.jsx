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
    primary:
      "bg-blue-600 hover:bg-blue-500 text-white",

    secondary:
      `
      bg-zinc-800 text-white
      hover:bg-zinc-700
      border border-zinc-700
      `,

    ghost:
      `
      bg-transparent text-zinc-300
      hover:bg-zinc-800 hover:text-white
      `,
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-medium
        transition-all duration-200
        disabled:cursor-not-allowed
        disabled:opacity-60

        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div
          className="
            h-4 w-4 animate-spin
            rounded-full border-2
            border-white/30 border-t-white
          "
        />
      ) : (
        Icon && <Icon size={18} />
      )}

      {children}
    </motion.button>
  );
}

export default Button;