import Avatar from "./Avatar";

const SEEDS = [
  "nova", "zara", "kai", "luna",
  "ryo", "mia", "alex", "omar",
  "sam", "eden", "jin", "ava",
];

function AvatarPicker({ current, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
      {SEEDS.map((seed) => (
        <button
          key={seed}
          onClick={() => onSelect(seed)}
          className={`
            group relative overflow-hidden
            rounded-2xl border p-1
            transition-all duration-200
            ${current === seed
              ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_0_3px_rgba(96,165,250,0.15)]"
              : "border-white/[0.06] bg-white/[0.03] hover:border-white/10"
            }
          `}
        >
          <Avatar seed={seed} size={52} className="w-full h-auto rounded-xl" />
        </button>
      ))}
    </div>
  );
}

export default AvatarPicker;