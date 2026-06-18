import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/ui/PageHeader";
import SettingsNav from "../components/settings/SettingsNav";
import ProfileSection from "../components/settings/ProfileSection";
import NotificationsSection from "../components/settings/NotificationsSection";
import IntegrationsSection from "../components/settings/IntegrationsSection";
import DangerSection from "../components/settings/DangerSection";

const SECTIONS = {
  profile:       { title: "Profile",       sub: "Manage your personal information and public profile.", component: ProfileSection       },
  notifications: { title: "Notifications", sub: "Control what you get notified about and how.",         component: NotificationsSection },
  integrations:  { title: "Integrations",  sub: "Connect FlowForge with your favourite tools.",         component: IntegrationsSection  },
  danger:        { title: "Danger zone",   sub: "These actions are permanent and cannot be undone.",    component: DangerSection        },
};

function Settings() {
  const [active, setActive] = useState("profile");
  const { title, sub, component: Section } = SECTIONS[active];

  return (
    <div className="relative pb-10">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-0 h-96 w-96 rounded-full bg-blue-500/[0.04] blur-3xl" />
        <div className="absolute -right-8 top-40 h-96 w-96 rounded-full bg-purple-500/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10">
        <PageHeader
          title="Settings"
          description="Manage preferences and account settings."
        />

        <div className="mt-8 grid grid-cols-[200px_1fr] gap-8">

          {/* Left Nav */}
          <SettingsNav active={active} onChange={setActive} />

          {/* Right Content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white">{title}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{sub}</p>
                </div>
                <Section />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;