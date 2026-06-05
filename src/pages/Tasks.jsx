import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import PageHeader from "../components/ui/PageHeader";

function Tasks() {
  return (
    <div>
      <div
        className="
          mb-8 flex flex-col gap-4
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        <PageHeader
          title="Tasks"
          description="Manage your workflow and productivity."
        />

        <button
          className="
            inline-flex items-center gap-2
            rounded-xl bg-blue-600
            px-4 py-2.5 text-sm
            font-medium text-white
            transition hover:bg-blue-500
          "
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          rounded-2xl border border-zinc-800
          bg-zinc-900/60 p-6
        "
      >
        <div
          className="
            flex h-[500px] flex-col
            items-center justify-center
            rounded-xl border border-dashed
            border-zinc-700
          "
        >
          <h3 className="text-lg font-semibold text-white">
            No Tasks Yet
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Task management features will appear here.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Tasks;