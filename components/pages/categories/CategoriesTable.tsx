"use client";

import { privateAxios } from "@/components/axiosInstance/axios";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, Link, Trash } from "lucide-react";
import { useState } from "react";
import AddCategories from "./AddCategories";
import DeleteCategory from "./DeleteCategory";

export type Category = {
  created_at: string;
  deleted_at: string | null;
  id: string;
  name: string;
  slug: string;
  status: number;
  updated_at: string;
};

// const fakeCategories: Category[] = [
//   {
//     categoryName: "Action",
//     description: "Movies with a lot of action and stunts",
//     content: 248,
//     status: "Active",
//   },
//   {
//     categoryName: "Comedy",
//     description: "Funny movies to make you laugh",
//     content: 176,
//     status: "Active",
//   },
//   {
//     categoryName: "Drama",
//     description: "Movies with a lot of action and stunts",
//     content: 215,
//     status: "Active",
//   },
// ];

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Category Id",
    cell: ({ row }) => (
      <span className="hover:cursor-pointer" title={row.original.id}>
        {String(row.original.id).slice(0, 6)}...
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <span className="">{row.original.name}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`${row.original.status === 1 ? "text-green-500/90" : "text-red-500/90"
          } `}
      >
        {row.original.status === 1 ? "Active" : "Deactive"}
      </span>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <span className="">
        <div className="flex gap-3.5">
          {/* <EditIcon className=" cursor-pointer" /> */}
          <AddCategories category={row.original} />

          <DeleteCategory categoryId={row.original.id} />
        </div>
      </span>
    ),
  },
];

export const fetchCategoris = async () => {
  const res = await privateAxios.get("/admin/categories/categories");
  return res.data;
};

export default function CategoriesTable() {
  // fetch categories
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await privateAxios.get("/admin/categories/categories");
      return response.data.data;
    },
    // queryFn: () => privateAxios.get("/admin/categories/categories")
  });

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const total = categories?.length;
  const paginatedData = categories?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("Category", categories);
  return (
    <div>
      {/* categories title */}
      <div className="flex items-center  justify-between mb-4">
        <h2 className="text-lg font-medium leading-[160%] text-white mb-4">
          Categories Management
        </h2>

        {/* <button className="primary-btn">
          + Add category
        </button> */}
        <AddCategories category={null} />
      </div>

      {/* all categorties table */}
      <div>
        <DataTable
          columns={columns}
          data={paginatedData}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        >
          <div className="">
            <h2 className="self-stretch text-[color:var(--W,#FFF)]  text-lg font-medium leading-[160%] mb-[18px]">
              All Categories
            </h2>

            <Input
              className="flex justify-between items-center flex-[1_0_0] rounded border border-[color:var(--Line-Color,#1B202C)] px-4 py-[9px] border-solid mb-6"
              placeholder="Search categories..."
              type="text"
            />
          </div>
        </DataTable>
      </div>
    </div>
  );
}