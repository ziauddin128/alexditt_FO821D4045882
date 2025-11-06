"use client";

import Tabs from "@/components/pages/setting/Tabs";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import useGetDifference from "@/hooks/useGetDifference";
import { useState } from "react";
import { Paginations } from "@/components/reusable/pagination";


export default function Notification() {

    // get notification data
    const { isLoading, error, data: notifications = [] } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            const res = await privateAxios.get("/users/getAllNotifications");
            return res.data.data;
        }
    })

    const [page, setPage] = useState(1);
    const pageSize = 10; // Number of items per page
    const total = notifications.length;
    const paginatedData = notifications.slice(
        (page - 1) * pageSize,
        page * pageSize
    );


    if (isLoading) return null;
    if (error) return null;


    return (
        <>
            {/* Tabs */}
            <Tabs />

            {/* Notifications */}
            <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>
                {paginatedData.map((notification: any) => (
                    <div
                        key={notification.id}
                        className="py-4 my-4 flex flex-col sm:flex-row md:flex-nowrap items-start sm:items-center sm:justify-between gap-3 border-b border-[#1F2430]"
                    >
                        <div>
                            <p className="text-sm font-normal">{notification.text}</p>
                        </div>
                        <div>
                            <p className="text-xs font-normal whitespace-nowrap">{useGetDifference(notification.created_at)}</p>
                        </div>
                    </div>
                ))}

            </div>

            <div className="flex justify-end">
                <div className="my-6">
                    <Paginations
                        page={page}
                        pageSize={pageSize}
                        total={total}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </>
    )
}
