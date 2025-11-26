"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { DataTable } from "@/components/reusable/data-table";
import convertDate from "@/hooks/convertDate";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, ToggleRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EyeIcon from "@/components/icons/EyeIcon";
import EditIcon from "@/components/icons/EditIcon";
import DeleteUser from "./DeleteUser";

interface UserDetail {
  id: number;
  name: string;
  email: string;
  created_at: string;
  status: string;
}

export default function UserTable() {
  const [filter, setFilter] = useState<string>("all");

  // get data
  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await privateAxios.get("/admin/user/:status");
      return res.data;
    },
  });

  console.log("User Data---", userData);

  return;

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
      accessorKey: "created_date",
      header: "Create Date",
      cell: ({ row }) => (
        <span className="">{convertDate(row.original.created_at)}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        {
          return row.original.status == "ACTIVE" ? (
            <span className="text-success-color">
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
        <div className="flex gap-3">
          <Link
            href={`/dashboard/users/${row.original.id}`}
            className="bg-[#E7F7EF] rounded-full h-9 w-9 flex items-center justify-center"
            title="View"
          >
            <EyeIcon className="text-[#0CAF60] h-5 w-5" />
          </Link>

          <Link
            href="#"
            className="bg-[#FFECD2] rounded-full h-9 w-9 flex items-center justify-center"
            title="Active/Deactive"
          >
            <ToggleRight className="text-[#FFA21D] h-5 w-5" />
          </Link>

          <Link
            href={`/dashboard/users/edit/${row.original.id}`}
            className="bg-[#D8F4F7] rounded-full h-9 w-9 flex items-center justify-center"
            title="Edit"
          >
            <EditIcon className="text-[#51CEDA] h-5 w-5" />
          </Link>

          <DeleteUser id={row.original.id} />
        </div>
      ),
    },
  ];

  const [page, setPage] = useState(1);
  const pageSize = 10;

  /*  const filteredData =
    filter === "all"
      ? userData
      : userData.filter((user) => user.status === filter); */

  const filteredData =
    filter === "all"
      ? userData
      : userData.data.filter((user) => user.status === filter);

  const total = filteredData?.length;
  const paginatedData = filteredData?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (isLoading) return null;
  if (error) return null;

  return (
    <div>
      <Link href={"users/create-user"}>
        <button className="text-base font-medium text-white flex justify-center items-center gap-1 bg-primary-color px-5 py-2.5 rounded-lg cursor-pointer">
          <Plus className="h-5 w-5" />
          <span>Add New User</span>
        </button>
      </Link>

      <div className="bg-secondary-bg mt-6">
        <div className="px-8 py-4 flex justify-between">
          <h1 className="text-base font-medium">User Details</h1>

          <Select
            value={filter}
            onValueChange={(value) => {
              setFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="flex items-center gap-2 rounded border border-gray-black-50 bg-dark-bg px-5 py-3 !text-white cursor-pointer outline-none shadow-none focus-visible:ring-0 focus-visible:border-border-gray-black-50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="border border-gray3-bg bg-dark-bg rounded">
              <SelectGroup className="space-y-2">
                <SelectItem className="selectOption" value="all">
                  All
                </SelectItem>
                <SelectItem className="selectOption" value="active">
                  Active
                </SelectItem>
                <SelectItem className="selectOption" value="deactive">
                  Deactive
                </SelectItem>
              </SelectGroup>
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
