import { motion } from "framer-motion";

function Card({
  children,
  className = "",
  hover = false,
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={`
        rounded-2xl border border-zinc-800
        bg-zinc-900/60 p-6
        backdrop-blur-sm

        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default Card;