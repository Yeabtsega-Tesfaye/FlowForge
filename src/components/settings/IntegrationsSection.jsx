import { useState } from "react";

import { FaGoogle, FaGithub, FaSlack } from "react-icons/fa";
import { SiNotion, SiAsana, SiLinear } from "react-icons/si";

const INTEGRATIONS = [
  {
    id: "google",
    name: "Google Calendar",
    icon: FaGoogle,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    connected: true,
  },
  {
    id: "slack",
    name: "Slack",
    icon: FaSlack,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    connected: false,
  },
  {
    id: "github",
    name: "GitHub",
    icon: FaGithub,
    color: "text-zinc-300",
    bg: "bg-white/[0.05]",
    connected: true,
  },
  {
    id: "notion",
    name: "Notion",
    icon: SiNotion,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    connected: false,
  },
  {
    id: "asana",
    name: "Asana",
    icon: SiAsana,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    connected: false,
  },
  {
    id: "linear",
    name: "Linear",
    icon: SiLinear,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    connected: false,
  },
];

function IntegrationsSection() {
  const [states, setStates] = useState(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.connected]))
  );

  const toggle = (id) =>
    setStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
        Connected apps
      </p>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {INTEGRATIONS.map(({ id, name, icon: Icon, color, bg }) => (
          <div
            key={id}
            className="
              flex items-center gap-3 rounded-xl
              border border-white/[0.05]
              bg-white/[0.02] p-3
              transition-all duration-200
              hover:border-white/[0.08]
            "
          >
            <div
              className={`
                flex h-9 w-9 flex-shrink-0
                items-center justify-center
                rounded-xl ${bg}
              `}
            >
              <Icon size={18} className={color} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-200">
                {name}
              </p>

              <p
                className={`mt-0.5 text-xs ${
                  states[id]
                    ? "text-emerald-400"
                    : "text-zinc-600"
                }`}
              >
                {states[id] ? "Connected" : "Not connected"}
              </p>
            </div>

            <button
              onClick={() => toggle(id)}
              className={`
                flex-shrink-0 rounded-lg px-2.5 py-1.5
                text-xs font-medium
                border transition-all duration-200
                ${
                  states[id]
                    ? "border-red-500/20 bg-red-500/[0.08] text-red-400 hover:bg-red-500/[0.12]"
                    : "border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-white/[0.12] hover:text-white"
                }
              `}
            >
              {states[id] ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntegrationsSection;