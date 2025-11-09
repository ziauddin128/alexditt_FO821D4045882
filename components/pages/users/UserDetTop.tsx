"use client";

import { useState } from "react";
import Calendar from "@/components/icons/Calendar";
import EditIcons from "@/components/icons/EditIcons";
import IdCard from "@/components/icons/IdCard";
import Image from "next/image";
import SuspendUser from "./SuspendUser";
import DeleteUser from "./DeleteUser";
import convertDateStr from "@/hooks/convertDateStr";
import EditUser from "./EditUser"; // 👈 Import EditUser component
import Link from "next/link";

interface UserDetTopProps {
  id: string | number;
  userDet: {
    id?: string | number;
    name?: string;
    status?: string | null;
    created_at?: string;
  };
}

export default function UserDetTop({ id, userDet }: UserDetTopProps) {
  const formattedStatus = userDet.status
    ? userDet.status.charAt(0).toUpperCase() + userDet.status.slice(1)
    : "Unknown";

  const isActive = userDet.status === "active";

  // 👇 State to show/hide edit form
  const [showEdit, setShowEdit] = useState(false);

  const handleToggleEdit = () => setShowEdit(!showEdit);

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <h1 className="text-base font-medium">User Details</h1>

        <div className="flex flex-wrap items-center gap-4">
          {/* ✅ Clicking this toggles edit form */}
          <Link href={`/dashboard/users/${id}/edit`}>
            <button
              className="flex items-center gap-2 px-[14px] py-[7px] bg-primary-color text-white rounded"
            >
              <EditIcons />
              <span className="text-sm font-normal">Edit</span>
            </button>
          </Link>


          {/* <SuspendUser id={String(id)} />
          <DeleteUser id={String(id)} /> */}
        </div>
      </div>

      {/* Profile Area */}
      <div className="bg-[#131824] rounded-sm p-6 flex flex-wrap sm:flex-nowrap items-center gap-6">
        <div>
          <Image
            src="/images/user-profile-2.svg"
            height={300}
            width={300}
            alt="User Profile"
            className="h-[100px] min-w-[100px] w-[100px] rounded-full"
          />
        </div>
        <div>
          <h1 className="text-base font-semibold">{userDet.name || "No Name"}</h1>
          <div className="my-4 flex items-center gap-4">
            <p className={isActive ? "text-[#2ECC71] text-xs" : "text-[#e70d0d] text-xs"}>
              {formattedStatus}
            </p>
            <span className="text-xs px-[10px] py-[5px] bg-[#1D1A33] rounded-[2px]">
              Premium Member
            </span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <IdCard className="w-6 h-6" />
              <p className="text-sm">ID: {userDet.id ?? "N/A"}</p>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <p className="text-sm">
                Joined:{" "}
                {userDet.created_at
                  ? convertDateStr(userDet.created_at)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 👇 Conditional Edit Form Rendering */}



    </>
  );
}
