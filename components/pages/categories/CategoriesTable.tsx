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
import { useMemo, useState } from "react";
import AddCategories from "./AddCategories";
import DeleteCategory from "./DeleteCategory";
import FilterIcon from "@/components/icons/FilterIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Category = {
  // created_at: string;
  // deleted_at: string | null;
  id: string | number;
  // name: string;
  // slug: string;

  // updated_at: string;
  status: number;
  categoryName: string;
  description: string;
  content: number;
};

const fakeCategories: Category[] = [
  {
    id: 1,
    categoryName: "Action",
    description: "Movies with a lot of action and stunts",
    content: 248,
    status: 0,
  },
  {
    id: 2,
    categoryName: "Comedy",
    description: "Funny movies to make you laugh",
    content: 176,
    status: 0,
  },
  {
    id: 3,
    categoryName: "Drama",
    description: "Movies with a lot of action and stunts",
    content: 215,
    status: 1,
  },
];

const columns: ColumnDef<Category>[] = [
  // {
  //   accessorKey: "id",
  //   header: "Category Id",
  //   cell: ({ row }) => (
  //     <span className="hover:cursor-pointer" title={row.original.id}>
  //       {String(row.original.id).slice(0, 6)}...
  //     </span>
  //   ),
  // },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <span className="">{row.original.categoryName}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span className="">{row.original.description}</span>,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => <span className="">{row.original.content}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status === 1
            ? "text-success-color"
            : "text-secondary-color"
        }
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
          <AddCategories category={row.original} />
          <DeleteCategory categoryId={String(row.original.id)} />
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
  // const {
  //   data: categories,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: async () => {
  //     const response = await privateAxios.get("/admin/categories/categories");
  //     return response.data.data;
  //   },
  //   // queryFn: () => privateAxios.get("/admin/categories/categories")
  // });

  // datafiltering

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<number | string | "">("");

  const total = fakeCategories.length;

  // Filtering
  const filteredData = useMemo(() => {
    return fakeCategories
      .filter((item) => {
        const matchesSearch = item.categoryName
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          filterStatus === "" ? true : item.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .slice((page - 1) * pageSize, page * pageSize);
  }, [search, filterStatus, page, pageSize]);

  // dtafilter end
  const isLoading = false;

  // const [page, setPage] = useState(1);
  // const pageSize = 5;

  // const total = fakeCategories?.length;
  // const paginatedData = fakeCategories?.slice(
  //   (page - 1) * pageSize,
  //   page * pageSize
  // );

  if (isLoading) return <div>Loading...</div>;

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  console.log("Category", fakeCategories);
  return (
    <div>
      {/* Categories title */}
      <div className="flex items-center  justify-between mb-4">
        <h2 className="text-lg font-medium text-white mb-4">Categories</h2>
        <AddCategories category={null} />
      </div>

      {/* Categories table */}
      <div>
        <DataTable
          columns={columns}
          data={filteredData}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        >
          <div>
            <h2 className="text-white text-lg font-medium mb-[18px]">
              All Categories
            </h2>

            <div className="flex gap-4">
              <Input
                className="h-[45px] flex justify-between items-center flex-[1_0_0] rounded border border-gray3-bg px-4 py-2.5 outline-none focus-visible:ring-0 focus-visible:border-primary-color text-white placeholder:text-white"
                placeholder="Search categories..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div>
                <Select
                  value={filterStatus === "all" ? "" : String(filterStatus)}
                  onValueChange={(value) =>
                    setFilterStatus(value === "all" ? "" : Number(value))
                  }
                >
                  <SelectTrigger className="!h-[45px] w-[180px] px-4 py-2.5 text-base border border-gray3-bg bg-[#131824] !text-white rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color cursor-pointer">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent className="border border-gray3-bg bg-dark-bg rounded">
                    <SelectGroup className="space-y-2">
                      <SelectItem
                        className="selectOption !bg-transparent text-white hover:!bg-primary-color hover:!text-white focus:!text-white"
                        value="all"
                      >
                        All
                      </SelectItem>
                      <SelectItem
                        className="selectOption !bg-transparent text-white hover:!bg-primary-color hover:!text-white focus:!text-white"
                        value="1"
                      >
                        Active
                      </SelectItem>
                      <SelectItem
                        className="selectOption !bg-transparent text-white hover:!bg-primary-color hover:!text-white focus:!text-white"
                        value="0"
                      >
                        Deactive
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="h-[45px] border border-gray3-bg px-5 py-[10px] rounded">
                <FilterIcon />
              </div>
            </div>
          </div>
        </DataTable>
      </div>
    </div>
  );
}
