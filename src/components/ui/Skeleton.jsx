function Skeleton({
  className = "",
}) {
  return (
    <div
      className={`
        animate-pulse rounded-xl
        bg-zinc-800

        ${className}
      `}
    />
  );
}

export default Skeleton;