"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function EditUser({
  userDet,
  id,
}: PersonalInfoProps & { id: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: userDet?.name || "",
      email: userDet?.email || "",
      phone_number: userDet?.phone_number || "",
      gender: userDet?.gender || "",
      description: userDet?.description || "",
      create_date: convertDateStr(userDet?.create_date ?? ""),
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="p-2 md:p-4 rounded-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#131824] p-4 rounded-[8px] mt-4">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">
                Name
              </Label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Cameron Williamson"
                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">
                Email
              </Label>
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
                <p className="text-red-500 mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-4">
            <div>
              <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">
                Create Date
              </Label>
              <div className="relative">
                <Input
                  {...register("create_date")}
                  type="date"
                  className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color appearance-none"
                />
                <Calendar className="absolute right-3 top-1/4 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">
                Phone
              </Label>
              <Input
                {...register("phone_number")}
                placeholder="(704) 555-0127"
                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-4">
            <div>
              <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">
                Gender
              </Label>
              <Input
                {...register("gender")}
                placeholder="Male"
                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              />
            </div>

            <div>
              <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">
                Description
              </Label>
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
  );
}
