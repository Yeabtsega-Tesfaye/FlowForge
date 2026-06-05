import { motion } from "framer-motion";

function PageHeader({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-8"
    >
      <h1
        className="
          text-3xl font-bold tracking-tight
          text-white
        "
      >
        {title}
      </h1>

      <p className="mt-2 text-zinc-400">
        {description}
      </p>
    </motion.div>
  );
}

export default PageHeader;