"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Controller, useForm } from "react-hook-form";
import { privateAxios } from "@/components/axiosInstance/axios";
import { toast } from "sonner";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlash from "@/components/icons/EyeSlash";

interface FormData {
  name: string;
  email: string;
  phone_number: string;
  description: string;
  gender: string;
  password: string;
}

export default function CreateUser() {
  const [type, setType] = React.useState<"password" | "text">("password");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await privateAxios.post("/auth/register", data);
      if (response.data) {
        toast.success(response?.data?.message);
      }
      reset();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <h4 className="text-xl md:text-2xl font-medium mb-4">
        Creating a new user
      </h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#131824] p-4 rounded-[8px] mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                className="custom-input"
                placeholder="Cameron Williamson"
              />

              {errors.name && (
                <p className="error-msg">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="custom-input "
                placeholder="cameron.graham@example.com"
              />

              {errors.email && (
                <p className="error-msg">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-3 sm:col-span-2">
              <Label className="custom-label mb-3">Phone</Label>
              <Input
                {...register("phone_number")}
                className="custom-input"
                placeholder="(704) 555-0127"
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Gender</Label>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="custom-input cursor-pointer">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray3-bg bg-dark-bg rounded">
                      <SelectGroup className="space-y-2">
                        <SelectItem
                          value="Male"
                          className="selectOption !justify-start"
                        >
                          Male
                        </SelectItem>
                        <SelectItem
                          value="Female"
                          className="selectOption !justify-start"
                        >
                          Female
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Description</Label>
              <Input
                {...register("description")}
                className="custom-input"
                placeholder="Description"
              />
            </div>

            {/* Password */}
            <div className="mb-6 sm:col-span-2">
              <Label className="custom-label mb-3">Password</Label>
              <div className="relative">
                <Input
                  type={type}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be at least 8 characters",
                    },
                  })}
                  className="custom-input"
                  placeholder="Password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setType(type === "password" ? "text" : "password")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {type === "password" ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="error-msg">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary-color rounded-full text-white py-[14px] max-w-[400px] w-full text-base font-medium cursor-pointer block mx-auto border border-white"
          >
            Creating a new user
          </button>
        </div>
      </form>
    </>
  );
}
