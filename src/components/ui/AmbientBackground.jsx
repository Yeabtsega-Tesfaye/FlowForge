const VARIANTS = {
  default: [
    { className: "left-0 top-0 bg-blue-500/[0.14]", duration: 18 },
    { className: "right-0 top-40 bg-purple-500/[0.14]", duration: 22 },
  ],
  ai: [
    { className: "left-0 top-0 bg-violet-500/[0.16]", duration: 16 },
    { className: "right-0 top-32 bg-blue-500/[0.14]", duration: 24 },
    { className: "left-1/3 bottom-0 bg-fuchsia-500/[0.10]", duration: 20 },
  ],
  analytics: [
    { className: "left-0 top-0 bg-emerald-500/[0.12]", duration: 20 },
    { className: "right-0 top-40 bg-blue-500/[0.14]", duration: 18 },
  ],
};

function AmbientBackground({ variant = "default" }) {
  const blobs = VARIANTS[variant] ?? VARIANTS.default;

  return (
    <div
      className="
        pointer-events-none fixed inset-0 -z-10
        overflow-hidden bg-zinc-950
      "
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`
            absolute h-[34rem] w-[34rem] rounded-full
            blur-[110px] motion-safe:animate-[drift_ease-in-out_infinite]
            ${blob.className}
          `}
          style={{ animationDuration: `${blob.duration}s` }}
        />
      ))}

      {/* faint grain to break up gradient banding */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.025]">
        <filter id="ambient-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambient-noise)" />
      </svg>
    </div>
  );
}

export default AmbientBackground;