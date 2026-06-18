const styles = {
  blue:   "border-blue-500/15 bg-blue-500/10 text-blue-300",
  teal:   "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  purple: "border-purple-500/20 bg-purple-500/10 text-purple-300",
  amber:  "border-amber-500/20 bg-amber-500/10 text-amber-300",
};

function Pill({ color = "blue", children }) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full border
        px-3 py-0.5 text-xs font-medium
        ${styles[color]}
      `}
    >
      {children}
    </span>
  );
}

export default Pill;