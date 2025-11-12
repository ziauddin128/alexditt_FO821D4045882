"use client";
import React from "react";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface VideoDetails {
  id: number;
  type: string;
  uploadDate: string;
  duration: string;
  views: string;
}

const videoData: VideoDetails[] = [
  {
    id: 1,
    type: "Movie",
    uploadDate: "Apr 18, 2025",
    duration: "1h 45m",
    views: "1.2M",
  },
  {
    id: 2,
    type: "Series",
    uploadDate: "Apr 17, 2025",
    duration: "1h 25m",
    views: "830K",
  },
  {
    id: 3,
    type: "Series",
    uploadDate: "Apr 16, 2025",
    duration: "1h 55m",
    views: "25K",
  },
  {
    id: 4,
    type: "Series",
    uploadDate: "Apr 16, 2025",
    duration: "1h 55m",
    views: "25K",
  },
];

const columns: ColumnDef<VideoDetails>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span className="">{row.original.type}</span>,
  },
  {
    accessorKey: "uploadDate",
    header: "Upload Date",
    cell: ({ row }) => <span className="">{row.original.uploadDate}</span>,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <span className="">{row.original.duration}</span>,
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => <span className="">{row.original.views}</span>,
  },
];

export default function LatestUploadsTable() {
  return (
    <div className="rounded-lg mt-4 ">
      <DataTable columns={columns} data={videoData}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium leading-[160%]">
            Latest Uploads
          </h2>

          <button className="border border-[#181818] p-1 text-xs font-medium leading-[100%] cursor-pointer">
            View All
          </button>
        </div>
      </DataTable>
    </div>
  );
}
