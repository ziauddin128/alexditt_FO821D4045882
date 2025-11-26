"use client";
import React from "react";
import StatsCard from "./StatsCard";
import UsersTable from "./UsersTable";
import { RevenueChart } from "./TotalRevenueChart";
import { SubscriptionGrowthChart } from "./SubscriptionChart";
import LatestUploadsTable from "./LatestUploadsTable";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import LoadingSpinner from "@/app/(dashboard)/loading";

export default function DashboardContent() {
  // get data
  const {
    data: dashboardData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const res = await privateAxios.get("/dashborad/deatils");
      return res.data;
    },
  });

  const statsData = {
    totalUser: dashboardData?.data?.total_users,
    totalVideos: dashboardData?.data?.total_videos,
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          <StatsCard statsData={statsData} />

          {/* <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[63%]">
          <RevenueChart />
        </div>
        <div className="w-full md:w-[37%]">
          <SubscriptionGrowthChart />
          <LatestUploadsTable />
        </div>
      </div> */}

          <UsersTable user_details={dashboardData?.data?.user_details} />
        </div>
      )}
    </>
  );
}
