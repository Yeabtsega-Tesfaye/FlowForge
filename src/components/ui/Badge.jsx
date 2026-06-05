function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default:
      "bg-zinc-800 text-zinc-300",

    success:
      "bg-emerald-500/15 text-emerald-400",

    warning:
      "bg-yellow-500/15 text-yellow-400",

    danger:
      "bg-red-500/15 text-red-400",

    info:
      "bg-blue-500/15 text-blue-400",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full px-3 py-1
        text-xs font-medium

        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;