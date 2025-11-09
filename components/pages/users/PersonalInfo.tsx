"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Calendar from "@/components/icons/Calendar";
import convertDateStr from "@/hooks/convertDateStr";

interface FormData {
  name: string;
  email: string;
  address: string;
  phone_number: string;
  gender: string;
  description: string;
  create_date: string;
}

interface PersonalInfoProps {
  userDet: Partial<FormData>;
}

export default function PersonalInfo({ userDet }: PersonalInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: userDet?.name || "",
      email: userDet?.email || "",
      address: userDet?.address || "",
      phone_number: userDet?.phone_number || "",
      gender: userDet?.gender || "",
      description: userDet?.description || "",
      create_date: userDet?.create_date
        ? convertDateStr(userDet.create_date)
        : "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="bg-secondary-bg p-2 md:p-4 rounded-sm">
      <h1 className="text-base font-medium mb-4">Basic Information</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#131824] p-4 rounded-[8px] mt-4">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <Label className="text-base font-medium mb-3">Name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Cameron Williamson"
                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              />
              {errors.name && (
                <p className="error-msg text-red-500 mt-1 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label className="text-base font-medium mb-3">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="cameron.graham@example.com"
                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              />
              {errors.email && (
                <p className="error-msg text-red-500 mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-4">
            {/* create date */}
            <div>
              <Label className="text-base font-medium mb-3">Create Date</Label>
              <div className="relative">
                <Input
                  {...register("create_date")}
                  type="date"
                  className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color appearance-none"
                />
                <Calendar className="absolute right-3 top-1/4 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* Phone */}
            <div>
              <Label className="text-base font-medium mb-3">Phone</Label>
              <Input
                {...register("phone_number")}
                placeholder="(704) 555-0127"
                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-4">
            {/* Gender */}
            <div>
              <Label className="text-base font-medium mb-3">Gender</Label>
              <Input
                {...register("gender")}
                placeholder="Male "
                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              />
            </div>

            {/* Description */}
            <div className="">
              <Label className="text-base font-medium mb-3">Description</Label>
              <Input
                {...register("description")}
                placeholder="Write a description about yourself"
                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              />
            </div>

          </div>



          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-[#2D9DFF] rounded-full text-white px-[150px] md:px-[206px] py-[14px] text-sm font-normal cursor-pointer flex justify-center items-center border border-white"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>


  )
}

{/* <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <p className="text-sm">Username: <span className="font-medium">{userDet.name}</span></p>
          <p className="text-sm">Email: <span className="font-medium">{userDet.email}</span> <small className="text-[#2ECC71] text-xs">Verified</small></p>
          <p className="text-sm">Phone Number: <span className="font-medium">{userDet.phone_number}</span></p>
          <p className="text-sm">Date of Birth:
            <span className="font-medium">
              {(userDet.date_of_birth != null) ? convertDateStr(userDet.date_of_birth) : ""}
            </span>
          </p>
          <p className="text-sm">Gender: <span className="font-medium">{userDet.gender}</span></p>
          <p className="text-sm">Country: <span className="font-medium">{userDet.country}</span></p>
        </div> */}



{/* Account Security */ }
{/* <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Account Secuirity</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
         <p className="text-sm">Last Login: <span className="font-medium">Today, 10:45 AM</span></p>
         <p className="text-sm">Last Login IP: <span className="font-medium">Last Login IP: 192.168.1.45</span></p>
         <p className="text-sm">Password Last Changed: <span className="font-medium">1 month ago</span></p>
      </div>

    </div> */}

{/* Preferences */ }
{/* <div className="bg-secondary-bg p-4 rounded-sm">
      <h1 className="text-base font-medium">Preferences</h1>
      <div className="bg-gray3-bg my-4 h-[1px]"></div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
         <p className="text-sm">Language: <span className="font-medium">English (US)</span></p>
         <p className="text-sm">Content Preferences: <span className="font-medium">Action, Sci-Fi, Drama</span></p>
         <p className="text-sm">Notification Settings: <span className="font-medium">Email & Push</span></p>
         <p className="text-sm">Auto-play: <span className="font-medium">Enabled</span></p>
      </div>

    </div> */}

{/* Notes */ }
{/*  <div className="bg-secondary-bg p-4 rounded-sm">
        <h1 className="text-base font-medium mb-4">Admin Notes</h1>

        <Textarea className="h-[100px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Customer contacted support on 10/03/2025 regarding playback issues. Issue resolved by clearing cache"/>
    </div> */}

{/*  <div className="flex justify-end">
        <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Save Notes</button>
    </div> */}


