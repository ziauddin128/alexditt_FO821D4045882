"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import StatsCard from "@/components/reusable/StatsCard";
import { useQuery } from "@tanstack/react-query";
import Tabcreate from "./tabcreate";

const vedio = [
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 3,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 4,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 5,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 6,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 7,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 8,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 9,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 10,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 11,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 12,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 13,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 14,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 15,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 16,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 17,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 18,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 19,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 20,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 21,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 22,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 23,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 24,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
];

export default function LiveTvPage() {
  // total subscriber
  const { data: totalSubscriber } = useQuery({
    queryKey: ["totalSubscriber"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/totalSubscribers");
      return res.data;
    },
  });

  // active subscription
  const { data: totalActiveSubscription } = useQuery({
    queryKey: ["totalActiveSubscription"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/totalActiveSubscribers");
      return res.data;
    },
  });

  // monthly revenue
  const { data: monthlyRevenue } = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/totalMonthlyRevenue");
      return res.data;
    },
  });

  // average subscription value
  const { data: totalAvgSubValue } = useQuery({
    queryKey: ["totalAvgSubValue"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/totalAvgSubValue");
      return res.data;
    },
  });

  return (
    <>
      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 mt-4">
        <StatsCard
          title="Active Streams"
          count="8"
          description="+2 from yesterday"
        />
        <StatsCard
          title="Current Viewers"
          count="3,421"
          description="Peak: 5,200"
        />
        <StatsCard
          title="Avg. Watch Time"
          count="32 min"
          description="Engagement: 68%"
        />
        <StatsCard
          title="Scheduled Events"
          count="5"
          description="Next: Movie Premiere"
        />
      </section>

      <div>
        <Tabcreate />
      </div>
    </>
  );
}
