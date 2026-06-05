import { Sparkles } from "lucide-react";

import PageHeader from "../components/ui/PageHeader";

function AIAssistant() {
  return (
    <div>
      <PageHeader
        title="AI Assistant"
        description="Boost productivity with AI-powered assistance."
      />

      <div
        className="
          rounded-2xl border border-zinc-800
          bg-zinc-900/60 p-6
        "
      >
        <div
          className="
            flex min-h-[500px]
            flex-col items-center
            justify-center text-center
          "
        >
          <div
            className="
              mb-6 flex h-20 w-20
              items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-500/20 to-purple-500/20
            "
          >
            <Sparkles size={36} className="text-blue-400" />
          </div>

          <h2 className="text-2xl font-semibold text-white">
            AI Workspace
          </h2>

          <p
            className="
              mt-3 max-w-lg
              text-zinc-400
            "
          >
            AI-powered productivity tools, proposal generation,
            and workflow assistance will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;