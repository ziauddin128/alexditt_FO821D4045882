import React from "react";
import ContentTable from "./ContentTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ContentManagement() {
  return (
    <div className="space-y-4">
      {/* title */}
      <div className="flex flex-wrap gap-y-2 items-center  justify-between">
        <h2 className="text-lg font-medium text-white">Film Management</h2>

        <Link href={"film-management/add-content"}>
          <button className="text-base font-medium text-white flex justify-center items-center gap-1 bg-primary-color px-5 py-2.5 rounded-lg cursor-pointer">
            <Plus className="h-5 w-5" />
            <span>Add new content</span>
          </button>
        </Link>
      </div>
      {/*  table  */}
      <div>
        <ContentTable />
      </div>
    </div>
  );
}
