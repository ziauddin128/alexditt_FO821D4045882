"use client";

import { privateAxios } from "@/components/axiosInstance/axios";
import { DataTable } from "@/components/reusable/data-table";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import AddCategories from "./AddCategories";
import DeleteCategory from "./DeleteCategory";
import FilterIcon from "@/components/icons/FilterIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/app/(dashboard)/loading";

export type Category = {
  id: string | number;
  category_name: string;
  category_description: string;
  category_status: string;
};

export default function CategoriesTable() {
  // Fetch Categories
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await privateAxios.get("/category");
      return response.data;
    },
  });

  const categoriesData = categories?.data ?? [];

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "category_name",
      header: "Category Name",
      cell: ({ row }) => <span>{row.original.category_name}</span>,
    },
    {
      accessorKey: "category_description",
      header: "Description",
      cell: ({ row }) => (
        <span className="md:whitespace-normal">
          {row.original.category_description}
        </span>
      ),
    },
    {
      accessorKey: "category_status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={
            row.original.category_status === "ACTIVE"
              ? "text-success-color"
              : "text-secondary-color"
          }
        >
          {row.original.category_status}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <span className="">
          <div className="flex gap-3.5">
            <AddCategories category={row.original} refetch={refetch} />
            <DeleteCategory
              categoryId={String(row.original.id)}
              refetch={refetch}
            />
          </div>
        </span>
      ),
    },
  ];

  // Data filtering
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | "">("");
  const total = categoriesData?.length;

  // Filtering
  const filteredData = useMemo(() => {
    return categoriesData
      ?.filter((item: { category_name: string; category_status: string }) => {
        const matchesSearch = item.category_name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          filterStatus === "" ? true : item.category_status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .slice((page - 1) * pageSize, page * pageSize);
  }, [categoriesData, search, filterStatus, page, pageSize]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {/* Title */}
          <div className="flex items-center  justify-between mb-4">
            <h2 className="text-lg font-medium text-white mb-4">Categories</h2>
            <AddCategories category={null} refetch={refetch} />
          </div>

          {/* Table */}
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
                        setFilterStatus(value === "all" ? "" : value)
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
                            value="ACTIVE"
                          >
                            Active
                          </SelectItem>
                          <SelectItem
                            className="selectOption !bg-transparent text-white hover:!bg-primary-color hover:!text-white focus:!text-white"
                            value="INACTIVE"
                          >
                            Inactive
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
      )}
    </div>
  );
}
