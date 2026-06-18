function AnalyticsStatCard({ label, value, sub, subColor, glow }) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/[0.06] bg-white/[0.03]
        p-5 backdrop-blur-xl
        transition-all duration-300 hover:border-white/10
      "
    >
      <div
        className={`
          pointer-events-none absolute inset-0
          opacity-0 transition-opacity duration-500
          group-hover:opacity-100
          bg-gradient-to-br ${glow} to-transparent
        `}
      />
      <div className="relative">
        <p className="text-sm text-zinc-500">{label}</p>
        <p className="mt-2.5 text-2xl font-medium text-white">{value}</p>
        <p className={`mt-2 text-sm ${subColor}`}>{sub}</p>
      </div>
    </div>
  );
}

export default AnalyticsStatCard;