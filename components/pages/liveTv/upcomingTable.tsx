"use client";

import React, { useState } from "react";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

//  Define type for table data
interface UserDetail {
<<<<<<< HEAD
    id: number;
    name: string;
    schedule: string;
    host: string;
    category: string;
    status: string;
}

// Component
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

    //  Delete handler
    const handleDeleteLocation = (id: number) => {
        const updatedList = userDetails.filter((item) => item.id !== id);
        setUserDetails(updatedList);
        console.log("Deleted id:", id);
    };

    const [page, setPage] = useState<number>(1);
    const pageSize = 5;
    const total = userDetails.length;

    //  Simple pagination logic
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
=======
  id: number;
  name: string;
  email: string;
  subscription: string;
  transactionId: string;
  joinDate: string;
  status: string;
  lastActivity: string;
  action: string;
}

const userDetails: UserDetail[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subscription: "Most Popular",
    transactionId: "#12548796",
    joinDate: "Apr 12, 2025",
    status: "Active",
    lastActivity: "2 min ago",
    action: "Details",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subscription: "Family",
    transactionId: "#12548796",
    joinDate: "Apr 12, 2025",
    status: "Active",
    lastActivity: "2 min ago",
    action: "Details",
  },
  {
    id: 3,
    name: "Mark Lee",
    email: "mark@example.com",
    subscription: "Basic",
    transactionId: "#12548796",
    joinDate: "Apr 12, 2025",
    status: "Active",
    lastActivity: "2 min ago",
    action: "Details",
  },
  {
    id: 4,
    name: "Mark Lee",
    email: "mark@example.com",
    subscription: "Basic",
    transactionId: "#12548796",
    joinDate: "Apr 12, 2025",
    status: "Active",
    lastActivity: "2 min ago",
    action: "Details",
  },
];

const handleDeleteLocation = (id: number) => {
  console.log("Deleting location with id:", id);
  // Add your actual delete logic here (API call, etc.)
};

// Table columns
const columns: ColumnDef<UserDetail>[] = [
  {
    accessorKey: "event Name",
    header: "Event Name",
    cell: ({ row }) => <span className="">{row.original.name}</span>,
  },
  {
    accessorKey: "scheduled Time",
    header: "Scheduled Time",
    cell: ({ row }) => <span className="">{row.original.email}</span>,
  },
  {
    accessorKey: "host",
    header: "Host",
    cell: ({ row }) => <span className="">{row.original.subscription}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span className="">{row.original.transactionId}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="">{row.original.joinDate}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="">{row.original.status}</span>,
  },
  // {
  //     accessorKey: "lastActivity",
  //     header: "Last Activity",
  //     cell: ({ row }) => <span className="">{row.original.lastActivity}</span>,
  // },
  {
    id: "action",
    header: "Actions",
    cell: () => (
      <div>
        <Button size="icon" variant="ghost">
          <ShowerHead />
        </Button>
        <Button size="icon" variant="ghost">
          <Edit />
        </Button>
        <Button
          className="text-destructive hover:text-destructive"
          size="icon"
          variant="ghost"
        >
          <DeleteIcon />
        </Button>
      </div>
    ),
    // cell: ({ row }) => (
    //     <div className="flex gap-4">
    //         <>Details</>
    //         {/* You can add actions here like delete or edit */}
    //         {/* <EditLocationModal item={row.original} id={row.original.id} />
    //         <DeleteModal
    //             item={row.original}
    //             onDelete={handleDeleteLocation}
    //             id={row.original.id}
    //         /> */}
    //     </div>
    // ),
  },
];

export default function UpcomingTable() {
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const total = userDetails.length;
  const paginatedData = userDetails.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  return (
    <div>
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
          <h2 className="self-stretch text-[color:var(--W,#FFF)]  text-base font-medium leading-[160%]">
            User Details
          </h2>
        </DataTable>
      </div>
    </div>
  );
>>>>>>> ca2152f14d6c120a2487b25fb37e633045ac2d6a
}
