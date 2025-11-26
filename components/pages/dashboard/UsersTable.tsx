"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import convertDateStr from "@/hooks/convertDateStr";

interface UserDetail {
  id: string;
  name: string;
  email: string;
  created_at: string;
  status: string;
}

// Table columns
const columns: ColumnDef<UserDetail>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => <span>{convertDateStr(row.original.created_at)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return row.original.status == "ACTIVE" ? (
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

export default function UsersTable({
  user_details,
}: {
  user_details: UserDetail[];
}) {
  console.log("My Data", user_details.length);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = user_details?.length;
  const paginatedData = user_details?.slice(
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
