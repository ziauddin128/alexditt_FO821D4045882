"use client";

import React, { useState } from "react";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// ✅ Define type for table data
interface UserDetail {
    id: number;
    name: string;
    schedule: string;
    host: string;
    category: string;
    status: string;
}

// ✅ Component
export default function UpcomingTable() {
    const [userDetails, setUserDetails] = useState<UserDetail[]>([
        {
            id: 1,
            name: "World Cup Final",
            schedule: "Tomorrow, 3:00 PM",
            host: "Sports Network",
            category: "Sports",
            status: "Upcoming",
        },
        {
            id: 2,
            name: "Music Night Live",
            schedule: "Friday, 7:30 PM",
            host: "City Radio",
            category: "Music",
            status: "Upcoming",
        },
        {
            id: 3,
            name: "Tech Expo 2025",
            schedule: "Next Monday, 10:00 AM",
            host: "Tech World",
            category: "Technology",
            status: "Upcoming",
        },
        {
            id: 1,
            name: "World Cup Final",
            schedule: "Tomorrow, 3:00 PM",
            host: "Sports Network",
            category: "Sports",
            status: "Upcoming",
        },
        {
            id: 1,
            name: "World Cup Final",
            schedule: "Tomorrow, 3:00 PM",
            host: "Sports Network",
            category: "Sports",
            status: "Upcoming",
        },
    ]);

    // ✅ Delete handler
    const handleDeleteLocation = (id: number) => {
        const updatedList = userDetails.filter((item) => item.id !== id);
        setUserDetails(updatedList);
        console.log("Deleted id:", id);
    };

    const [page, setPage] = useState<number>(1);
    const pageSize = 5;
    const total = userDetails.length;

    // ✅ Simple pagination logic
    const paginatedData = userDetails.slice((page - 1) * pageSize, page * pageSize);

    const columns: ColumnDef<UserDetail>[] = [
        {
            accessorKey: "name",
            header: "Event Name",
            cell: ({ row }) => <span className="">{row.original.name}</span>,
        },
        {
            accessorKey: "schedule",
            header: "Scheduled Time",
            cell: ({ row }) => <span className="">{row.original.schedule}</span>,
        },
        {
            accessorKey: "host",
            header: "Host",
            cell: ({ row }) => <span>{row.original.host}</span>,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <span>{row.original.category}</span>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <span>{row.original.status}</span>,
        },
        {
            id: "action",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => console.log("Edit", row.original.id)}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteLocation(row.original.id)}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <DataTable
                tableTitle="Locations Manangement"
                data={paginatedData}
                columns={columns}
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
            >
                <h2 className="self-stretch text-[color:var(--W,#FFF)] text-base font-medium leading-[160%]">
                    User Details
                </h2>
            </DataTable>
        </div>
    );
}
