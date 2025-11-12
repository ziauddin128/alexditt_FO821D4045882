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
    lastActivity: "2 min ago",
    action: "Details",
  },
  {
    id: 3,
    name: "Mark Lee",
    email: "mark@example.com",
    joinDate: "Apr 12, 2025",
    status: "Active",
    lastActivity: "2 min ago",
    action: "Details",
  },
  {
    id: 4,
    name: "Mark Lee",
    email: "mark@example.com",
    joinDate: "Apr 12, 2025",
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
    cell: ({ row }) => <span className="">{row.original.status}</span>,
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
