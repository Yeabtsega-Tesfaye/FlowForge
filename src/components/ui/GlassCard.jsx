function GlassCard({ children, glow = "from-white/[0.03]", className = "" }) {
  return (
    <div
      className={`
        group relative overflow-hidden
        rounded-3xl border border-white/[0.06]
        bg-white/[0.03] p-6 backdrop-blur-xl
        transition-all duration-300
        hover:border-white/10
        ${className}
      `}
    >
      <div
        className={`
          pointer-events-none absolute inset-0
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100
          bg-gradient-to-br ${glow} to-transparent
        `}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export default GlassCard;