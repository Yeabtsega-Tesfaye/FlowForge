import PageHeader from "../components/ui/PageHeader";

import StatCard from "../components/dashboard/StatCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import ChartCard from "../components/dashboard/ChartCard";

import {
  productivityData,
  activityData,
  statsData,
} from "../data/analytics";

function Dashboard() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title="Dashboard"
        description="Overview of your productivity and activity."
      />

      {/* Stats */}
      <div
        className="
          grid gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {statsData.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </div>

      {/* Main Grid */}
      <div
        className="
          mt-6 grid gap-6
          xl:grid-cols-3
        "
      >
        {/* Chart */}
        <div className="xl:col-span-2">
          <ChartCard
            data={productivityData}
          />
        </div>

        {/* Activity */}
        <ActivityFeed
          activities={activityData}
        />
      </div>
    </div>
  );
}

export default Dashboard;