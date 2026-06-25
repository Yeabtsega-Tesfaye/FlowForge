function Avatar({ seed, size = 40, className = "" }) {
  const url = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed ?? "flowforge")}&backgroundColor=1a1a2e`;

  return (
    <img
      src={url}
      alt="avatar"
      width={size}
      height={size}
      className={`rounded-2xl object-cover ${className}`}
    />
  );
}

export default Avatar;