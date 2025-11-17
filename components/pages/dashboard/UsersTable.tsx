"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

interface UserDetail {
  id: number;
  name: string;
  email: string;
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
    joinDate: "Apr 12, 2025",
    status: "Active",
    lastActivity: "2 min ago",
    action: "Details",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "Apr 12, 2025",
    status: "Active",
    lastActivity: "5 min ago",
    action: "Details",
  },
  {
    id: 3,
    name: "Mark Lee",
    email: "mark@example.com",
    joinDate: "Apr 12, 2025",
    status: "Active",
    lastActivity: "10 min ago",
    action: "Details",
  },
  {
    id: 4,
    name: "Emily Clark",
    email: "emily@example.com",
    joinDate: "Apr 13, 2025",
    status: "Active",
    lastActivity: "1 min ago",
    action: "Details",
  },
  {
    id: 5,
    name: "Daniel Carter",
    email: "daniel@example.com",
    joinDate: "Apr 13, 2025",
    status: "Deactive",
    lastActivity: "1 day ago",
    action: "Details",
  },
  {
    id: 6,
    name: "Sophia Wilson",
    email: "sophia@example.com",
    joinDate: "Apr 14, 2025",
    status: "Active",
    lastActivity: "3 min ago",
    action: "Details",
  },
  {
    id: 7,
    name: "Lucas Brown",
    email: "lucas@example.com",
    joinDate: "Apr 14, 2025",
    status: "Active",
    lastActivity: "30 min ago",
    action: "Details",
  },
  {
    id: 8,
    name: "Olivia Johnson",
    email: "olivia@example.com",
    joinDate: "Apr 15, 2025",
    status: "Deactive",
    lastActivity: "—",
    action: "Details",
  },
  {
    id: 9,
    name: "Ethan Miller",
    email: "ethan@example.com",
    joinDate: "Apr 15, 2025",
    status: "Active",
    lastActivity: "12 min ago",
    action: "Details",
  },
  {
    id: 10,
    name: "Ava Thompson",
    email: "ava@example.com",
    joinDate: "Apr 16, 2025",
    status: "Active",
    lastActivity: "4 min ago",
    action: "Details",
  },
  {
    id: 11,
    name: "Noah Davis",
    email: "noah@example.com",
    joinDate: "Apr 16, 2025",
    status: "Deactive",
    lastActivity: "3 days ago",
    action: "Details",
  },
  {
    id: 12,
    name: "Mia Martinez",
    email: "mia@example.com",
    joinDate: "Apr 17, 2025",
    status: "Active",
    lastActivity: "7 min ago",
    action: "Details",
  },
  {
    id: 13,
    name: "James Anderson",
    email: "james@example.com",
    joinDate: "Apr 17, 2025",
    status: "Active",
    lastActivity: "15 min ago",
    action: "Details",
  },
  {
    id: 14,
    name: "Chloe Garcia",
    email: "chloe@example.com",
    joinDate: "Apr 18, 2025",
    status: "Deactive",
    lastActivity: "—",
    action: "Details",
  },
  {
    id: 15,
    name: "Benjamin Robinson",
    email: "benjamin@example.com",
    joinDate: "Apr 18, 2025",
    status: "Active",
    lastActivity: "9 min ago",
    action: "Details",
  },
  {
    id: 16,
    name: "Harper Rodriguez",
    email: "harper@example.com",
    joinDate: "Apr 18, 2025",
    status: "Active",
    lastActivity: "20 min ago",
    action: "Details",
  },
  {
    id: 17,
    name: "William Scott",
    email: "william@example.com",
    joinDate: "Apr 19, 2025",
    status: "Deactive",
    lastActivity: "5 days ago",
    action: "Details",
  },
  {
    id: 18,
    name: "Ella Green",
    email: "ella@example.com",
    joinDate: "Apr 19, 2025",
    status: "Active",
    lastActivity: "11 min ago",
    action: "Details",
  },
  {
    id: 19,
    name: "Henry Adams",
    email: "henry@example.com",
    joinDate: "Apr 20, 2025",
    status: "Active",
    lastActivity: "6 min ago",
    action: "Details",
  },
  {
    id: 20,
    name: "Scarlett Baker",
    email: "scarlett@example.com",
    joinDate: "Apr 20, 2025",
    status: "Active",
    lastActivity: "2 min ago",
    action: "Details",
  },
];

// Table columns
const columns: ColumnDef<UserDetail>[] = [
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
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => <span className="">{row.original.joinDate}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return row.original.status == "Active" ? (
        <span className="text-success-color">{row.original.status}</span>
      ) : (
        <span className="text-secondary-color">{row.original.status}</span>
      );
    },
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Link
          href={`/dashboard/users/${row.original.id}`}
          className="py-1 px-2 rounded border-1 border-[#A5A5AB] text-white"
        >
          Details
        </Link>
      </div>
    ),
  },
];

export default function UsersTable() {
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = userDetails.length;
  const paginatedData = userDetails.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  return (
    <div>
      <div>
        <DataTable
          tableTitle=""
          data={paginatedData}
          columns={columns}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        >
          <h2 className="text-base font-medium leading-[160%]">User Details</h2>
        </DataTable>
      </div>
    </div>
  );
}
