"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Calendar from "@/components/icons/Calendar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import EditIcons from "@/components/icons/EditIcons";
import Image from "next/image";
import LoadingSpinner from "@/app/(dashboard)/loading";
import convertDateStr from "@/hooks/convertDateStr";
import { privateAxios } from "@/components/axiosInstance/axios";
import { toast } from "sonner";

interface PersonalInfoProps {
  userDet: {
    id?: string | number;
    name?: string;
    email?: string;
    phone_number?: string;
    gender?: string;
    description?: string;
    avatar?: string;
    status?: string | null;
    created_at?: string;
  };
  isLoading: boolean;
}

export default function PersonalInfo({
  userDet,
  isLoading,
}: PersonalInfoProps) {
  const [isActive, setIsActive] = useState(userDet?.status === "ACTIVE");

  useEffect(() => {
    setIsActive(userDet?.status === "ACTIVE");
  }, [userDet?.status]);

  // Handle User Status
  const handleStatus = async (value: boolean) => {
    setIsActive(value);

    const status = value ? "ACTIVE" : "INACTIVE";

    try {
      const response = await privateAxios.patch(`/admin/user/${userDet?.id}`, {
        status,
      });
      if (response.data) {
        toast.success(response?.data?.message);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
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
                  title="Active/Inactive"
                  checked={isActive}
                  onCheckedChange={(value) => handleStatus(value)}
                />
              </div>

              <Link href={`/dashboard/users/edit/${userDet?.id}`}>
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
                {userDet?.name || "Not set yet"}
              </h3>
              <p className="text-[color:var(--Gray-Black-50,#E9E9EA)] font-roboto text-[14px] font-normal leading-[1.5]">
                {userDet?.email || "Not set yet"}
              </p>
            </div>
          </div>

          <div className="bg-[#131824] p-4 rounded-[8px] mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="mb-3">
                <Label className="text-white mb-3 custom-label">Name</Label>
                <Input
                  className="custom-input"
                  value={userDet?.name}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <Label className="text-white mb-3 custom-label">Email</Label>
                <Input
                  className="custom-input"
                  value={userDet?.email}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <Label className="text-white mb-3 custom-label">
                  Create Date
                </Label>

                <div className="relative">
                  <Input
                    placeholder="Create Date"
                    type="text"
                    className="custom-input"
                    value={convertDateStr(userDet?.created_at ?? "")}
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3">
                <Label className="text-white mb-3 custom-label">Phone</Label>
                <Input
                  placeholder="Phone"
                  className="custom-input"
                  value={userDet?.phone_number}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <Label className="text-white mb-3 custom-label">Gender</Label>
                <Input
                  placeholder="Gender"
                  className="custom-input"
                  value={userDet?.gender}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <Label className="text-white mb-3 custom-label">
                  Description
                </Label>
                <Textarea
                  className="!h-[100px] custom-input"
                  placeholder="Description"
                  value={userDet?.description}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
