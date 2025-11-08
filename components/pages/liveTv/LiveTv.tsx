"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import StatsCard from "@/components/reusable/StatsCard";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const vedio = [
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    pfofile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    pfofile: "/dashboard/livetv/bradleyProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers"
  },


]

export default function LiveTvPage() {

  // total subscriber
  const { data: totalSubscriber } = useQuery({
    queryKey: ["totalSubscriber"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/totalSubscribers");
      return res.data;
    }
  });

  // active subscription
  const { data: totalActiveSubscription } = useQuery({
    queryKey: ["totalActiveSubscription"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/totalActiveSubscribers");
      return res.data;
    }
  });

  // monthly revenue
  const { data: monthlyRevenue } = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/totalMonthlyRevenue");
      return res.data;
    }
  });

  // average subscription value
  const { data: totalAvgSubValue } = useQuery({
    queryKey: ["totalAvgSubValue"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/totalAvgSubValue");
      return res.data;
    }
  });


  return (
    <>
      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Streams" count={totalSubscriber?.totalSubscribers.toLocaleString()} description="+2 from yesterday" />
        <StatsCard title="Current Viewers" count={totalActiveSubscription?.message} description="Peak: 5,200" />
        <StatsCard title="Avg. Watch Time" count={monthlyRevenue?.message} description="Engagement: 68%" />
        <StatsCard title="Scheduled Events" count={totalAvgSubValue?.message} description="Next: Movie Premiere" />
      </section>

      {/* vedio */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8  w-full  mt-4 space-y-4 gap-4 ">
        {
          vedio.map((index) => {
            return <div key={index.id} className="w-full  ">
              <Image src={index.vedio} alt="vedio" height={172} width={172} className="h-[172px] w-[185px] md:w-[172px]  object-cover"></Image>
              <div className="flex mt-2 gap-2 ">
                <div><Image src={index.pfofile} alt="vedio" height={100} width={100} className="h-16 w-16 rounded-full object-cover"></Image></div>
                <div className="flex justify-center items-center">
                  <div>
                    <p className="text-white font-inter text-[14px] font-medium leading-[16px]"
                    >{index.title}</p>
                    <p className="mt-1 text-white/60 font-inter text-[12px] font-light leading-[16px]">{index.flower}</p>
                  </div>

                </div>
              </div>
            </div>
          })
        }
      </div>
    </>
  )
}     
