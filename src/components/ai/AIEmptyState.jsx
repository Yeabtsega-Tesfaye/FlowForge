import { Sparkles } from "lucide-react";

function AIEmptyState() {
  return (
    <div
      className="
        flex flex-1
        flex-col items-center
        justify-center

        px-6 text-center
      "
    >
      <div
        className="
          flex h-20 w-20
          items-center justify-center

          rounded-[2rem]

          border border-white/10

          bg-gradient-to-br
          from-blue-500/20
          to-purple-500/20

          backdrop-blur-xl
        "
      >
        <Sparkles
          size={32}
          className="text-white"
        />
      </div>

      <h1
        className="
          mt-8 text-4xl
          font-semibold
          tracking-tight
          text-white
        "
      >
        AI Assistant
      </h1>

      <p
        className="
          mt-4 max-w-xl
          text-sm leading-7
          text-zinc-400
        "
      >
        Ask FlowForge AI to help organize
        tasks, improve productivity,
        brainstorm ideas, and accelerate
        your workflow.
      </p>
    </div>
  );
}

export default AIEmptyState;