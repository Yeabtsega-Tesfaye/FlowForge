import { motion } from "framer-motion";

function AIMessageBubble({
  role,
  content,
}) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        flex w-full

        ${
          isUser
            ? "justify-end"
            : "justify-start"
        }
      `}
    >
      <div
        className={`
          relative max-w-3xl
          overflow-hidden

          rounded-3xl px-5 py-4

          text-sm leading-7

          backdrop-blur-xl

          ${
            isUser
              ? `
                border border-blue-500/20

                bg-gradient-to-br
                from-blue-500/20
                to-blue-500/5

                text-white
              `
              : `
                border border-white/10

                bg-white/[0.04]

                text-zinc-200
              `
          }
        `}
      >
        {!isUser && (
          <div
            className="
              absolute inset-0

              bg-gradient-to-br
              from-purple-500/[0.03]
              to-blue-500/[0.03]
            "
          />
        )}

        <div className="relative">
          {content}
        </div>
      </div>
    </motion.div>
  );
}

export default AIMessageBubble;