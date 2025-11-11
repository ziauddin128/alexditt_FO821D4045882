"use client";

import React from "react";
import Image from "next/image";
import { Paginations } from "@/components/reusable/pagination";

// Type for each video item
interface VideoItem {
    id: number;
    vedio: string;
    pfofile: string;
    title: string;
    flower: string;
}

//  Sample data
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
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    }, {
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
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
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
        id: 26,
        vedio: "/dashboard/livetv/BradleyLawlor.png",
        pfofile: "/dashboard/livetv/bradleyProfile.png",
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
    {
        id: 20,
        vedio: "/dashboard/livetv/BradleyLawlor.png",
        pfofile: "/dashboard/livetv/bradleyProfile.png",
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },
    {
        id: 22,
        vedio: "/dashboard/livetv/BradleyLawlor.png",
        pfofile: "/dashboard/livetv/bradleyProfile.png",
        title: "Bradley Lawlor",
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
        title: "Bradley Lawlor",
        flower: "12k Followers",
    },


    // ... repeat or map dynamically
];

//  Props for pagination (example)
interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

export default function Upcoming() {
    //  Example pagination handlers
    const [page, setPage] = React.useState<number>(1);
    const pageSize = 16;
    const total = vedio.length;

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            {/* vedio grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-[15px]">
                {vedio
                    .slice((page - 1) * pageSize, page * pageSize) //  pagination fix
                    .map((item, index) => (
                        <div key={index} className="w-full">
                            <Image
                                src={item.vedio}
                                alt="vedio"
                                height={172}
                                width={172}
                                className="h-[172px] w-full object-cover rounded-md"
                            />
                            <div className="flex mt-2 gap-2">
                                <div>
                                    <Image
                                        src={item.pfofile}
                                        alt="profile"
                                        height={36}
                                        width={36}
                                        className="h-8 w-8 rounded-full object-cover"
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



            {/* Pagination outside map (not inside each card) */}
            <div className="mt-6 flex justify-center ">
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
