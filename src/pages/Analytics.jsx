import PageHeader from "../components/ui/PageHeader";

function Analytics() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Track productivity trends and insights."
      />

      <div
        className="
          grid gap-6
          lg:grid-cols-2
        "
      >
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              rounded-2xl border border-zinc-800
              bg-zinc-900/60 p-6
            "
          >
            <div className="h-5 w-40 rounded bg-zinc-800" />

            <div
              className="
                mt-6 flex h-64 items-center
                justify-center rounded-xl
                border border-dashed border-zinc-700
              "
            >
              <p className="text-zinc-500">
                Analytics chart placeholder
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;