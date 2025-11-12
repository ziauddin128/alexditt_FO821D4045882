"use client";

import React from "react";
import Image from "next/image";
import { Paginations } from "@/components/reusable/pagination";

interface VideoItem {
  id: number;
  vedio: string;
  profile: string;
  title: string;
  flower: string;
}

const vedio: VideoItem[] = [
  {
    id: 1,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 2,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 3,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 4,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 5,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 6,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 7,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 8,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 9,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 10,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 11,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 12,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 13,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 13,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 14,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 15,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 16,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 17,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 18,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 19,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 20,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 21,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 22,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 23,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 24,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 25,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 26,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 27,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 28,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },
  {
    id: 29,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 30,
    vedio: "/dashboard/livetv/LorriWarf.png",
    profile: "/dashboard/livetv/lorriProfile.png",
    title: "Lorri Warf",
    flower: "12k Followers",
  },
  {
    id: 31,
    vedio: "/dashboard/livetv/BradleyLawlor.png",
    profile: "/dashboard/livetv/bradleyProfile.png",
    title: "Bradley Lawlor",
    flower: "12k Followers",
  },



];

// Fix duplicate ids by assigning new unique ids
const fixedVideo = vedio.map((item, index) => ({
  ...item,
  id: index + 1,
}));

export default function Upcoming() {
  const [page, setPage] = React.useState<number>(1);
  const pageSize = 16;
  const total = fixedVideo.length;

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const currentPageData = fixedVideo.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-[15px]">
        {currentPageData.map((item) => (
          <div key={item.id} className="w-full">
            <Image
              src={item.vedio}
              alt="video"
              height={172}
              width={172}
              className="h-[172px] w-full object-cover rounded-md"
            />

            <div className="flex mt-2 gap-2">
              <Image
                src={item.profile}
                alt="profile"
                height={36}
                width={36}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="text-white font-inter text-[14px] font-medium leading-[16px]">
                  {item.title}
                </p>
                <p className="mt-1 text-white/60 font-inter text-[12px] font-light leading-[16px]">
                  {item.flower}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Paginations
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
