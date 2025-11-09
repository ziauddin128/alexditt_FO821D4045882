import React from "react";
import StatsCard from "./StatsCard";
import UsersTable from "./UsersTable";
import { RevenueChart } from "./TotalRevenueChart";
import { SubscriptionGrowthChart } from "./SubscriptionChart";
import LatestUploadsTable from "./LatestUploadsTable";

export default function DashboardContent() {
  return (
    <div className="space-y-4">
      <StatsCard />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[63%]">
          <RevenueChart />
        </div>
        <div className="w-full md:w-[37%]">
          <SubscriptionGrowthChart />
          <LatestUploadsTable />
        </div>
      </div>

      <UsersTable />
    </div>
  );
}
