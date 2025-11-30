"use client";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import DeleteContent from "./DeleteContent";
import Link from "next/link";
import LoadingSpinner from "@/app/(dashboard)/loading";
import convertDateStr from "@/hooks/convertDateStr";

interface Content {
  id: string | number;
  type: string;
  title: string;
  genre: string;
  category: string;
  duration: string;
  status: string;
  uploaded: string;
  category_id?: string;
  content_status?: string;
  created_at?: string;
  view_count?: number;
  video?: string;
  thumbnail?: string;
}

interface Category {
  id: string;
  category_name: string;
}

export default function ContentTable() {
  // Filter State
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // All Content
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "contents",
      page,
      pageSize,
      selectedGenre,
      selectedCategory,
      selectedStatus,
    ],
    queryFn: async () => {
      const response = await privateAxios.get("/dashborad/content-list", {
        params: {
          page,
          perPage: pageSize,
          ...(selectedGenre && { genres: selectedGenre }),
          ...(selectedCategory && { category: selectedCategory }),
          ...(selectedStatus !== "ALL" && { status: selectedStatus }),
        },
      });
      return response.data;
    },
    placeholderData: (prev) => prev,
  });

  const videoDetailsList = data?.data || [];

  const columns: ColumnDef<Content>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <img
          src={row.original.thumbnail}
          alt="Thumbnail"
          className="rounded-[2px] w-[57px] h-10 object-cover"
        />
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span className="">{row.original.type}</span>,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <span className="">{row.original.title}</span>,
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: ({ row }) => <span className="">{row.original.genre}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span className="">{row.original.category}</span>,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => <span className="">{row.original.duration}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span className="">{row.original.status}</span>,
    },
    {
      accessorKey: "uploaded",
      header: "Uploaded",
      cell: ({ row }) => (
        <span className="">{convertDateStr(row.original.uploaded)}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          {row.original.type === "Movie" ? (
            <Link
              href={`/dashboard/film-management/movie/${row.original.id}`}
              className="h-6 w-6 bg-[#111] hover:bg-primary-color flex items-center justify-center rounded-[2px]"
            >
              <EditIcon className="text-white h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/dashboard/film-management/series/${row.original.id}`}
              className="h-6 w-6 bg-[#111] hover:bg-primary-color flex items-center justify-center rounded-[2px]"
            >
              <EditIcon className="text-white h-4 w-4" />
            </Link>
          )}

          <DeleteContent categoryId={row.original.id} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (data?.pagination) {
      setPage(data.pagination.page);
      setPageSize(data.pagination.perPage);
    }
  }, [data]);

  const total = data?.pagination?.totalItems;

  // Genre
  const { data: genre, isLoading: isGenreLoading } = useQuery({
    queryKey: ["genre"],
    queryFn: async () => {
      const response = await privateAxios.get("/dashborad/genre-list");
      return response.data;
    },
  });

  // Category
  const { data: category, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await privateAxios.get("/dashborad/category-list");
      return response.data;
    },
  });

  return (
    <>
      {/* Filter */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Genre */}
        <Select
          value={selectedGenre}
          onValueChange={(value) => setSelectedGenre(value)}
        >
          <SelectTrigger className="flex items-center gap-2 rounded border border-gray-black-50 bg-dark-bg px-5 py-2.5 !text-white cursor-pointer outline-none shadow-none focus-visible:ring-0 focus-visible:border-border-gray-black-50">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent className="border border-gray3-bg bg-dark-bg rounded">
            <SelectGroup className="space-y-2">
              {genre?.data.map((item: string, idx: number) => (
                <SelectItem key={idx} className="selectOption" value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Category */}
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <SelectTrigger className="flex items-center gap-2 rounded border border-gray-black-50 bg-dark-bg px-5 py-2.5 !text-white cursor-pointer outline-none shadow-none focus-visible:ring-0 focus-visible:border-border-gray-black-50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="border border-gray3-bg bg-dark-bg rounded">
            <SelectGroup className="space-y-2 ">
              {category?.data?.map((item: Category, idx: number) => (
                <SelectItem key={idx} className="selectOption" value={item?.id}>
                  {item?.category_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value)}
        >
          <SelectTrigger className="flex items-center gap-2 rounded border border-gray-black-50 bg-dark-bg px-5 py-2.5 !text-white cursor-pointer outline-none shadow-none focus-visible:ring-0 focus-visible:border-border-gray-black-50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="border border-gray3-bg bg-dark-bg rounded">
            <SelectGroup className="space-y-2">
              <SelectItem className="selectOption" value="ALL">
                All
              </SelectItem>
              <SelectItem className="selectOption" value="LIVE">
                Live
              </SelectItem>
              <SelectItem className="selectOption" value="PUBLISHED">
                Published
              </SelectItem>
              <SelectItem className="selectOption" value="UNPUBLISHED">
                Unpublished
              </SelectItem>
              <SelectItem className="selectOption" value="DRAFT">
                Draft
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* table */}
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <DataTable
              columns={columns}
              data={videoDetailsList}
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
            />
          </div>
        )}
      </>
    </>
  );
}
