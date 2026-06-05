import PageHeader from "../components/ui/PageHeader";

function Settings() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage preferences and account settings."
      />

      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              rounded-2xl border border-zinc-800
              bg-zinc-900/60 p-6
            "
          >
            <div className="h-5 w-40 rounded bg-zinc-800" />

            <div className="mt-6 space-y-4">
              <div className="h-12 rounded-xl bg-zinc-800/70" />
              <div className="h-12 rounded-xl bg-zinc-800/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;