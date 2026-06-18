import { SendHorizonal } from "lucide-react";

import { motion } from "framer-motion";

function AIChatInput({
  input,
  setInput,
  onSend,
}) {
  return (
    <div
      className="
        sticky bottom-0
        mt-6
      "
    >
      <div
        className="
          relative overflow-hidden

          rounded-[2rem]

          border border-white/10

          bg-zinc-900/80

          p-3

          shadow-2xl
          shadow-black/30

          backdrop-blur-2xl
        "
      >
        <div
          className="
            pointer-events-none
            absolute inset-0

            bg-gradient-to-br
            from-blue-500/[0.04]
            to-purple-500/[0.04]
          "
        />

        <div className="relative flex items-end gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Ask FlowForge AI anything..."
            className="
              max-h-40 min-h-[52px]
              w-full resize-none

              bg-transparent

              px-3 py-3

              text-sm leading-6
              text-white

              outline-none

              placeholder:text-zinc-500
            "
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onSend}
            className="
              flex h-11 w-11
              items-center justify-center

              rounded-2xl

              bg-blue-500

              text-white

              transition-all duration-200

              hover:bg-blue-400
            "
          >
            <SendHorizonal size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default AIChatInput;