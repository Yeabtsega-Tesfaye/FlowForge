function Loader({
  size = "md",
  fullScreen = false,
}) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  const spinner = (
    <div
      className={`
        animate-spin rounded-full
        border-blue-500/20
        border-t-blue-500

        ${sizes[size]}
      `}
    />
  );

  if (fullScreen) {
    return (
      <div
        className="
          flex min-h-screen
          items-center justify-center
          bg-zinc-950
        "
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default Loader;