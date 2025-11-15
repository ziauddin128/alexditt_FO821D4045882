"use client";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
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
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import DeleteContent from "./DeleteContent";
import Link from "next/link";

interface VideoDetail {
  id: number;
  thumbnail: string; 
  title: string;
  genre: string;
  category: string;
  type: string;
  duration: string;
  status: string;
  uploaded: string;
  views: string;
}

interface Content {
  id: string | number;
  title: string;
  genre: string;
  category: string;
  type: string;
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
  name: string;
}

// fetch content
/* const fetchContent = async () => {
  const res = await privateAxios.get("/contents/allContents");
  return res.data;
}; */

export default function ContentTable() {
  /* const { data, isLoading, error } = useQuery({
    queryKey: ["contents"],
    queryFn: fetchContent,
  });
 */
  // console.log(data);

  const videoDetailsList: Content[] = [
    {
      id: 1,
      title: "Close Encounters of the Third Kind",
      genre: "Action",
      category: "Web series",
      type: "HD",
      duration: "2h 28m",
      status: "Published",
      uploaded: "20-04-25",
      thumbnail: "/images/thumbnail.jpeg",
    },
    {
      id: 2,
      title: "Close Encounters of the Third Kind",
      genre: "Action",
      category: "Web series",
      type: "HD",
      duration: "2h 28m",
      status: "Published",
      uploaded: "20-04-25",
      thumbnail: "/images/thumbnail.jpeg",
    },
    {
      id: 3,
      title: "Close Encounters of the Third Kind",
      genre: "Action",
      category: "Web series",
      type: "HD",
      duration: "2h 28m",
      status: "Published",
      uploaded: "20-04-25",
      thumbnail: "/images/thumbnail.jpeg",
    },
    {
      id: 4,
      title: "Close Encounters of the Third Kind",
      genre: "Action",
      category: "Web series",
      type: "HD",
      duration: "2h 28m",
      status: "Published",
      uploaded: "20-04-25",
      thumbnail: "/images/thumbnail.jpeg",
    },
    {
      id: 5,
      title: "Close Encounters of the Third Kind",
      genre: "Action",
      category: "Web series",
      type: "HD",
      duration: "2h 28m",
      status: "Published",
      uploaded: "20-04-25",
      thumbnail: "/images/thumbnail.jpeg",
    },
    {
      id: 6,
      title: "Close Encounters of the Third Kind",
      genre: "Action",
      category: "Web series",
      type: "HD",
      duration: "2h 28m",
      status: "Published",
      uploaded: "20-04-25",
      thumbnail: "/images/thumbnail.jpeg",
    },
    {
      id: 7,
      title: "Close Encounters of the Third Kind",
      genre: "Action",
      category: "Web series",
      type: "HD",
      duration: "2h 28m",
      status: "Published",
      uploaded: "20-04-25",
      thumbnail: "/images/thumbnail.jpeg",
    },
  ];

  const isLoading = false;
  const error = false;

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
      // cell: ({ row }) => <span className="">{row.original.category.name}</span>,
      cell: ({ row }) => <span className="">{row.original.category}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span className="">{row.original.type}</span>,
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
      cell: ({ row }) => <span className="">{row.original.uploaded}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Link
            href="#"
            className="h-6 w-6 bg-[#111] hover:bg-primary-color flex items-center justify-center rounded-[2px]"
          >
            <EditIcon className="text-white h-4 w-4" />
          </Link>
          <DeleteContent categoryId={row.original.id} />
        </div>
      ),
    },
  ];

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const total = videoDetailsList?.length;
  const paginatedData = videoDetailsList?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /*   const total = data?.length;
  const paginatedData = data?.slice((page - 1) * pageSize, page * pageSize); */

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <>
      {/* filter */}
      <div className="mb-4 flex flex-wrap gap-4">
        <Select>
          <SelectTrigger className="flex items-center gap-2 rounded border border-gray-black-50 bg-dark-bg px-5 py-2.5 !text-white cursor-pointer outline-none shadow-none focus-visible:ring-0 focus-visible:border-border-gray-black-50">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent className="border border-gray-black-50 bg-dark-bg rounded">
            <SelectGroup className="space-y-2">
              <SelectItem className="selectOption" value="Action">
                Action
              </SelectItem>
              <SelectItem className="selectOption" value="Comedy">
                Comedy
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* 2nd */}
        <Select>
          <SelectTrigger className="flex items-center gap-2 rounded border border-gray-black-50 bg-dark-bg px-5 py-2.5 !text-white cursor-pointer outline-none shadow-none focus-visible:ring-0 focus-visible:border-border-gray-black-50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="border border-gray-black-50 bg-dark-bg rounded">
            <SelectGroup className="space-y-2 ">
              <SelectItem className="selectOption" value="action">
                Action
              </SelectItem>
              <SelectItem className="selectOption" value="comedy">
                Comedy
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* 3rd */}
        <Select>
          <SelectTrigger className="flex items-center gap-2 rounded border border-gray-black-50 bg-dark-bg px-5 py-2.5 !text-white cursor-pointer outline-none shadow-none focus-visible:ring-0 focus-visible:border-border-gray-black-50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="border border-gray-black-50 bg-dark-bg rounded">
            <SelectGroup className="space-y-2">
              <SelectItem className="selectOption" value="published">
                Published
              </SelectItem>
              <SelectItem className="selectOption" value="live">
                Live
              </SelectItem>
              <SelectItem className="selectOption" value="draft">
                Draft
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* table */}
      <div>
        <DataTable
          columns={columns}
          data={paginatedData}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
