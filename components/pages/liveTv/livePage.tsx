"use client";

import React from "react";
import Image from "next/image";
import { Paginations } from "@/components/reusable/pagination";

// ✅ Type for each video item
interface VideoItem {
    id: number;
    vedio: string;
    pfofile: string;
    title: string;
    flower: string;
}

// ✅ Sample data
const vedio: VideoItem[] = [
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },

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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    }, {
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },

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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
    // ... repeat or map dynamically
];

// ✅ Props for pagination (example)
interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

export default function Upcoming() {
    // ✅ Example pagination handlers
    const [page, setPage] = React.useState<number>(1);
    const pageSize = 10;
    const total = vedio.length;

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            {/* vedio grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 w-full mt-4 space-y-4 gap-4">
                {vedio.map((item) => (
                    <div key={item.id} className="w-full">
                        <Image
                            src={item.vedio}
                            alt="vedio"
                            height={172}
                            width={172}
                            className="h-[172px] w-[185px] md:w-[172px] object-cover"
                        />
                        <div className="flex mt-2 gap-2">
                            <div>
                                <Image
                                    src={item.pfofile}
                                    alt="profile"
                                    height={100}
                                    width={100}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                            </div>
                            <div className="flex justify-center items-center">
                                <div>
                                    <p className="text-white font-inter text-[14px] font-medium leading-[16px]">
                                        {item.title}
                                    </p>
                                    <p className="mt-1 text-white/60 font-inter text-[12px] font-light leading-[16px]">
                                        {item.flower}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Pagination outside map (not inside each card) */}
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
