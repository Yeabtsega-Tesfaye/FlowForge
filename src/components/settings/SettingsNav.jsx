import { User, Bell, Plug, AlertTriangle } from "lucide-react";

const sections = [
  {
    group: "Account",
    items: [
      { id: "profile",       label: "Profile",       icon: User },
      { id: "notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    group: "Workspace",
    items: [
      { id: "integrations", label: "Integrations", icon: Plug },
    ],
  },
  {
    group: "Danger",
    items: [
      { id: "danger", label: "Danger zone", icon: AlertTriangle, danger: true },
    ],
  },
];

function SettingsNav({ active, onChange }) {
  return (
    <nav className="flex flex-col gap-0.5 py-6 pr-2">
      {sections.map((section) => (
        <div key={section.group}>
          <p className="
            mb-2 mt-4 px-3 text-xs font-medium
            uppercase tracking-widest text-zinc-600
            first:mt-0
          ">
            {section.group}
          </p>
          {section.items.map(({ id, label, icon: Icon, danger }) => (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`
                flex w-full items-center gap-2.5
                rounded-xl px-3 py-2.5
                text-sm font-medium
                transition-all duration-200
                border
                ${active === id
                  ? "border-white/[0.08] bg-white/[0.06] text-white"
                  : danger
                    ? "border-transparent text-red-400 hover:border-red-500/10 hover:bg-red-500/[0.06]"
                    : "border-transparent text-zinc-400 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-white"
                }
              `}
            >
              <Icon size={16} className="flex-shrink-0" />
              {label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

export default SettingsNav;