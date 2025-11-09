"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import PowerOffIcon from "@/components/icons/PowerOff";
import { DataTable } from "@/components/reusable/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from '@/components/ui/select';
import Link from "next/link";

interface UserDetail {
  id: number;
  name: string;
  email: string;
  Subscription: string;
  created_at: string;
  status: string;
}

export default function UserManagementTable() {
  const [userDetails, setUserDetails] = useState<UserDetail[]>([
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
      name: "Jane Smith",
      email: "jane@example.com",
      Subscription: "Premium",
      created_at: "2021-02-15",
      status: "active",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@example.com",
      Subscription: "Standard",
      created_at: "2021-03-10",
      status: "inactive",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      Subscription: "Most Popular",
      created_at: "2021-04-05",
      status: "active",
    },
    {
      id: 5,
      name: "John Doe",
      email: "john@example.com",
      Subscription: "Most Popular",
      created_at: "2021-01-01",
      status: "active",
    },
    {
      id: 6,
      name: "Jane Smith",
      email: "jane@example.com",
      Subscription: "Premium",
      created_at: "2021-02-15",
      status: "active",
    },
    {
      id: 7,
      name: "Alex Johnson",
      email: "alex@example.com",
      Subscription: "Standard",
      created_at: "2021-03-10",
      status: "inactive",
    },
    {
      id: 8,
      name: "Emily Brown",
      email: "emily@example.com",
      Subscription: "Most Popular",
      created_at: "2021-04-05",
      status: "active",
    },
    {
      id: 9,
      name: "John Doe",
      email: "john@example.com",
      Subscription: "Most Popular",
      created_at: "2021-01-01",
      status: "active",
    },
    {
      id: 10,
      name: "Jane Smith",
      email: "jane@example.com",
      Subscription: "Premium",
      created_at: "2021-02-15",
      status: "active",
    },
    {
      id: 11,
      name: "Alex Johnson",
      email: "alex@example.com",
      Subscription: "Standard",
      created_at: "2021-03-10",
      status: "inactive",
    },
    {
      id: 12,
      name: "Emily Brown",
      email: "emily@example.com",
      Subscription: "Most Popular",
      created_at: "2021-04-05",
      status: "active",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all"); // all means no filter

  const handleDeleteLocation = (id: number) => {
    const updatedList = userDetails.filter((item) => item.id !== id);
    setUserDetails(updatedList);
    console.log("Deleted id:", id);
  };

  const filteredData = filterStatus === "all"
    ? userDetails
    : userDetails.filter((user) => user.status === filterStatus);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = filteredData.length;
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const columns: ColumnDef<UserDetail>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const serialNumber = (page - 1) * pageSize + (row.index + 1);
        return <span className="">{serialNumber.toString().padStart(2, "0")}</span>;
      },
    },
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
      accessorKey: "Subscription",
      header: "Subscription",
      cell: ({ row }) => <span>{row.original.Subscription}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.status === "active" ? (
          <span>{row.original.status}</span>
        ) : (
          <span className="text-[#e70d0d]">{row.original.status}</span>
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Link href={`/dashboard/users/${row.original.id}`}>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => console.log("View", row.original.id)}
              className="bg-[#E7F7EF] rounded-full"
            >
              <EyeIcon className="text-[#0CAF60]" />
            </Button></Link>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => console.log("Power Off", row.original.id)}
            className="bg-[#FFECD2] rounded-full"
          >
            <PowerOffIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => console.log("Edit", row.original.id)}
            className="bg-[#D8F4F7] hover:bg-0 rounded-full"
          >
            <EditIcon className="text-[#51CEDA]" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleDeleteLocation(row.original.id)}
            className="bg-[#FFE6E6] rounded-full"
          >
            <DeleteIcon className="text-[#E70D0D]" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="py-8 px-5">

        <button className="flex gap-2 bg-[#2D9DFF] text-white font-roboto text-[16px] font-normal leading-[150%] px-5 py-[10px] rounded-md">
          <PlusIcon className="mt-1" /> Add New User
        </button>
      </div>
      <div className="bg-[#131824]">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-base font-medium">User Details</h1>

          {/* Filter Dropdown */}
          <Select
            value={filterStatus}
            onValueChange={(value) => {
              setFilterStatus(value);
              setPage(1); // Reset page to 1 on filter change
            }}
            aria-label="Filter by status"
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white ">
              <SelectItem className=" focus:bg-[#2473BB]" value="all">All</SelectItem>
              <SelectItem className=" focus:bg-[#2473BB]" value="active">Active</SelectItem>
              <SelectItem className=" focus:bg-[#2473BB]" value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
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
