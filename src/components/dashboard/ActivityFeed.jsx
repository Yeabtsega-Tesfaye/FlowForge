import { motion } from "framer-motion";

function ActivityFeed({ activities }) {
  return (
    <div
      className="
        group relative overflow-hidden

        rounded-3xl border border-white/8

        bg-white/[0.03]
        p-6

        backdrop-blur-xl
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-purple-500/[0.06]
          to-blue-500/[0.04]

          opacity-0 transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />

      <div className="noise-overlay absolute inset-0" />

      {/* Header */}
      <div className="relative">
        <div
          className="
            inline-flex items-center
            rounded-full

            border border-purple-500/10
            bg-purple-500/10

            px-3 py-1

            text-xs font-medium
            text-purple-300
          "
        >
          Activity
        </div>

        <h2
          className="
            mt-4 text-xl
            font-semibold tracking-tight
            text-white
          "
        >
          Recent Activity
        </h2>
      </div>

      {/* Activity Items */}
      <div className="relative mt-8 space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.05,
            }}
            className="
              group/item relative

              flex items-start gap-4

              overflow-hidden
              rounded-2xl

              border border-white/5
              bg-white/[0.03]

              p-4

              transition-all duration-300

              hover:border-white/10
              hover:bg-white/[0.05]
            "
          >
            {/* Hover Glow */}
            <div
              className="
                absolute inset-0

                bg-gradient-to-r
                from-blue-500/[0.05]
                to-purple-500/[0.05]

                opacity-0 transition-opacity
                duration-300

                group-hover/item:opacity-100
              "
            />

            {/* Timeline Dot */}
            <div className="relative mt-1 flex flex-col items-center">
              <div
                className="
                  h-3 w-3 rounded-full
                  bg-blue-400

                  shadow-[0_0_12px_rgba(96,165,250,0.8)]
                "
              />

              {index !== activities.length - 1 && (
                <div
                  className="
                    mt-2 h-12 w-px
                    bg-gradient-to-b
                    from-blue-500/30
                    to-transparent
                  "
                />
              )}
            </div>

            {/* Content */}
            <div className="relative flex-1">
              <p
                className="
                  text-sm font-medium
                  leading-relaxed text-white
                "
              >
                {activity.action}
              </p>

              <p
                className="
                  mt-2 text-xs
                  tracking-tight
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