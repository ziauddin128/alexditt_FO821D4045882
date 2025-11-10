"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { DataTable } from "@/components/reusable/data-table";
import convertDate from "@/hooks/convertDate";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useState } from "react";

interface UserDetail {
    id: number;
    name: string;
    email: string;
    Subscription: string;
    created_at: string;
    status: string;
}

export default function UserTable() {
    const columns: ColumnDef<UserDetail>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => {
                const serialNumber = (page - 1) * pageSize + (row.index + 1);
                return <span>{serialNumber.toString().padStart(2, "0")}</span>;
            },
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <span className="">{row.original.name}</span>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <span className="">{row.original.email}</span>,
        },
        {
            accessorKey: "subscription",
            header: "Subscription",
            cell: ({ row }) => <span className="">{row.original.Subscription}</span>,
        },
        {
            accessorKey: "joinDate",
            header: "Join Date",
            cell: ({ row }) => (
                <span className="">{convertDate(row.original.created_at)}</span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                {
                    return row.original.status == "active" ? (
                        <span className="">
                            {row.original.status.charAt(0).toUpperCase() +
                                row.original.status.slice(1)}
                        </span>
                    ) : (
                        <span className="text-[#e70d0d]">
                            {row.original.status.charAt(0).toUpperCase() +
                                row.original.status.slice(1)}
                        </span>
                    );
                }
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-4">
                    <Link
                        className="bg-primary-color text-white px-[14px] py-[7px] rounded-[2px]"
                        href={`/dashboard/users/${row.original.id}`}
                    >
                        Details
                    </Link>
                </div>
            ),
        },
    ];

    // get data
    /* const {data: userData, error,isLoading } = useQuery({
      queryKey: ['userData'],
      queryFn: async () =>
      {
        const res = await privateAxios.get("/admin/user/allusers");
        return res.data;
      }
    }) */

    const userData = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            Subscription: "Most Popular",
            created_at: "2021-01-01",
            status: "active",
        },
        {
            id: 2,
            name: "John Doe",
            email: "john@example.com",
            Subscription: "Most Popular",
            created_at: "2021-01-01",
            status: "active",
        },
        {
            id: 3,
            name: "John Doe",
            email: "john@example.com",
            Subscription: "Most Popular",
            created_at: "2021-01-01",
            status: "active",
        },
        {
            id: 4,
            name: "John Doe",
            email: "john@example.com",
            Subscription: "Most Popular",
            created_at: "2021-01-01",
            status: "active",
        },
    ];

    const isLoading = false;
    const error = false;

    const [page, setPage] = useState(1);
    const pageSize = 10;

    const total = userData?.length;
    const paginatedData = userData?.slice((page - 1) * pageSize, page * pageSize);

    if (isLoading) return null;
    if (error) return null;

    return (
        <div>
            {/* filter */}
            {/* table */}

            <div className="bg-[#131824]">
                <div className="px-8 py-4">
                    <h1 className="text-base font-medium">User Details</h1>
                </div>

                <DataTable
                    columns={columns}
                    data={paginatedData}
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}