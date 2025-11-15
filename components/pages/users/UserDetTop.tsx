"use client";

import { useState } from "react";
import Calendar from "@/components/icons/Calendar";
import EditIcons from "@/components/icons/EditIcons";
import IdCard from "@/components/icons/IdCard";
import Image from "next/image";
import SuspendUser from "./SuspendUser";
import convertDateStr from "@/hooks/convertDateStr";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mt-6 mb-4">
        <h1 className="text-base font-medium">Personal Info</h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              className="w-11 h-6 cursor-pointer
            data-[state=checked]:bg-primary-color 
            [&>span]:h-5 
            [&>span]:w-5 
            [&>span]:translate-x-0 
            data-[state=checked]:[&>span]:translate-x-[22px]"
              title="Active/Deactive"
              defaultChecked={true}
            />
          </div>

          <Link href={`/dashboard/users/edit/${id}`}>
            <button className="cursor-pointer flex items-center gap-2 px-[14px] py-[7px] bg-primary-color text-white rounded">
              <EditIcons />
              <span className="text-base font-normal">Edit</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Profile Area */}
      <div className="bg-[#131824] rounded-sm p-6 flex flex-wrap sm:flex-nowrap items-center gap-6">
        <div>
          <Image
            src="/images/profiles.png"
            height={300}
            width={300}
            alt="User Profile"
            className="h-[100px] min-w-[100px] w-[100px] rounded-full border-1 border-[#2D9DFF]"
          />
        </div>

        <div className="flex-col space-y-2">
          <h3 className="text-white font-roboto text-[18px] font-normal leading-[1.6]">
            John Doe
          </h3>
          <p className="text-[color:var(--Gray-Black-50,#E9E9EA)] font-roboto text-[14px] font-normal leading-[1.5]">
            @Wade Warren
          </p>
        </div>
        {/* <div>
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
        </div> */}
      </div>
    </>
  );
}
