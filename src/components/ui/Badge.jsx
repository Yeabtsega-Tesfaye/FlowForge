function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default: `
      border border-white/5

      bg-white/[0.04]

      text-zinc-300
    `,

    success: `
      border border-emerald-500/10

      bg-emerald-500/10

      text-emerald-300
    `,

    warning: `
      border border-yellow-500/10

      bg-yellow-500/10

      text-yellow-300
    `,

    danger: `
      border border-red-500/10

      bg-red-500/10

      text-red-300
    `,

    info: `
      border border-blue-500/10

      bg-blue-500/10

      text-blue-300
    `,
  };

  return (
    <span
      className={`
        inline-flex items-center

        rounded-full

        px-3 py-1.5

        text-[11px]
        font-medium

        tracking-wide

        backdrop-blur-xl

        transition-all duration-300

        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;