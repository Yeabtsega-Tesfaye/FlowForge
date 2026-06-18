import { Download, RotateCcw, Trash2 } from "lucide-react";
import Button from "../ui/Button";

const ACTIONS = [
  {
    icon: Download,
    title: "Export all data",
    sub: "Download a full copy of your tasks, analytics, and settings",
    label: "Export",
    variant: "secondary",
  },
  {
    icon: RotateCcw,
    title: "Reset workspace",
    sub: "Clears all tasks and analytics — your account stays active",
    label: "Reset",
    variant: "danger",
  },
  {
    icon: Trash2,
    title: "Delete account",
    sub: "Permanently deletes your account and all associated data",
    label: "Delete account",
    variant: "danger",
  },
];

function Button2({ variant, children, icon: Icon }) {
  const styles = {
    secondary: "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.07] hover:text-white",
    danger:    "border-red-500/20 bg-red-500/[0.08] text-red-400 hover:bg-red-500/[0.12]",
  };
  return (
    <button className={`
      flex items-center gap-2 rounded-xl border
      px-4 py-2 text-sm font-medium
      transition-all duration-200 flex-shrink-0
      ${styles[variant]}
    `}>
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

function DangerSection() {
  return (
    <div className="rounded-2xl border border-red-500/[0.12] bg-white/[0.02] p-5">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-red-500/60">
        Permanent actions
      </p>
      <div className="space-y-0">
        {ACTIONS.map(({ icon: Icon, title, sub, label, variant }, i) => (
          <div
            key={title}
            className={`
              flex items-center justify-between gap-4 py-4
              ${i !== ACTIONS.length - 1 ? "border-b border-white/[0.04]" : ""}
            `}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 text-zinc-500">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">{title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>
              </div>
            </div>
            <Button2 variant={variant} icon={undefined}>
              {label}
            </Button2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DangerSection;