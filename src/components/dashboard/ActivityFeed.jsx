import { motion } from "framer-motion";

function ActivityFeed({ activities }) {
  return (
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
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.05,
            }}
            className="
              flex items-start gap-3
              rounded-xl border
              border-zinc-800
              bg-zinc-950/40 p-4
            "
          >
            <div
              className="
                mt-1 h-2.5 w-2.5
                rounded-full bg-blue-500
              "
            />

            <div>
              <p className="text-sm text-white">
                {activity.action}
              </p>

              <p
                className="
                  mt-1 text-xs
                  text-zinc-500
                "
              >
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;