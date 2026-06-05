import { motion } from "framer-motion";

import PageHeader from "../components/ui/PageHeader";

function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your productivity and activity."
      />

      <div
        className="
          grid gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            whileHover={{ y: -4 }}
            className="
              rounded-2xl border border-zinc-800
              bg-zinc-900/60 p-6
              backdrop-blur-sm
            "
          >
            <div
              className="
                mb-4 h-12 w-12 rounded-xl
                bg-gradient-to-br
                from-blue-500/20 to-purple-500/20
              "
            />

            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-zinc-800" />
              <div className="h-8 w-16 rounded bg-zinc-700" />
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="
          mt-6 grid gap-6
          xl:grid-cols-3
        "
      >
        <div
          className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/60 p-6
            xl:col-span-2
          "
        >
          <h2 className="text-lg font-semibold text-white">
            Analytics Preview
          </h2>

          <div
            className="
              mt-6 flex h-80 items-center
              justify-center rounded-xl
              border border-dashed border-zinc-700
            "
          >
            <p className="text-zinc-500">
              Charts will appear here
            </p>
          </div>
        </div>

        <div
          className="
            rounded-2xl border border-zinc-800
            bg-zinc-900/60 p-6
          "
        >
          <h2 className="text-lg font-semibold text-white">
            Recent Activity
          </h2>

          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  rounded-xl border border-zinc-800
                  bg-zinc-950/50 p-4
                "
              >
                <div className="h-4 w-32 rounded bg-zinc-800" />

                <div className="mt-3 h-3 w-20 rounded bg-zinc-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;