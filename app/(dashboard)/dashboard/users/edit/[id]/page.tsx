"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
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
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/app/(dashboard)/loading";

interface FormData {
  name: string;
  email: string;
  phone_number: string;
  description: string;
  gender: string;
}

export default function EditUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const router = useRouter();

  // Fetch Data
  const { data: userDet, isLoading } = useQuery({
    queryKey: ["userDet", id],
    queryFn: async () => {
      const res = await privateAxios.get(`/admin/user/user-view/${id}`);
      return res.data;
    },
  });

  if (userDet?.data === null) {
    router.push("/dashboard/users");
  }

  const userDetails = userDet?.data || [];

  // Image Preview Show
  const [image, setImage] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle file selection and show the image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Update image preview state
      };
      if (file) {
        reader.readAsDataURL(file); // Convert the file to a data URL
      }

      setImage(file);
    }
  };

  // Update Image
  useEffect(() => {
    const updateImage = async () => {
      const data = {
        avater: image,
      };

      try {
        const response = await privateAxios.patch(`/admin/user/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data) {
          toast.success(response?.data?.message);
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message?.message;
        toast.error(errorMessage);
      }
    };

    if (image) {
      updateImage();
    }
  }, [image]);

  // Form Submission
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await privateAxios.patch(`/admin/user/${id}`, data);
      if (response.data) {
        toast.success(response?.data?.message);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h4 className="text-xl md:text-2xl font-medium mb-4">
            Personal Info Edit
          </h4>

          {/* Image Upload */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-5 ">
            <div>
              <div className="h-[100px] w-[100px]">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-full"
                    width={100}
                    height={100}
                  />
                ) : userDetails?.avatar ? (
                  <>
                    {/* Future ey ata uncomment kore dile real image asbe */}
                    {/* <Image
                      src={userDetails.avatar}
                      alt="Admin"
                      className="h-[100px] w-[100px]"
                      width={100}
                      height={100}
                    /> */}
                    <Image
                      src="/images/user.svg"
                      alt="Admin"
                      className="h-[100px] w-[100px]"
                      width={100}
                      height={100}
                    />
                  </>
                ) : (
                  <Image
                    src="/images/user.svg"
                    alt="Admin"
                    className="h-[100px] w-[100px]"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </div>
            <label
              htmlFor="profileImage"
              className="cursor-pointer py-[14px] px-5 border border-white rounded-[100px]"
            >
              <input
                type="file"
                hidden
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="text-sm font-medium">Upload New Picture</span>
            </label>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-[#131824] p-4 rounded-[8px] mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="mb-3">
                  <Label className="custom-label mb-3">Name</Label>
                  <Input
                    defaultValue={userDetails?.name}
                    {...register("name", { required: "Name is required" })}
                    className="custom-input"
                    placeholder="Name"
                  />

                  {errors.name && (
                    <p className="error-msg">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <Label className="custom-label mb-3">Email</Label>
                  <Input
                    defaultValue={userDetails?.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className="custom-input "
                    placeholder="Email"
                  />

                  {errors.email && (
                    <p className="error-msg">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone number */}
                <div className="mb-3 sm:col-span-2">
                  <Label className="custom-label mb-3">Phone</Label>
                  <Input
                    defaultValue={userDetails?.phone_number}
                    {...register("phone_number")}
                    className="custom-input"
                    placeholder="Phone Number"
                  />
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <Label className="custom-label mb-3">Gender</Label>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={userDetails?.gender}
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
                    defaultValue={userDetails?.description}
                    className="custom-input"
                    placeholder="Description"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 bg-primary-color rounded-full text-white py-[14px] max-w-[400px] w-full text-base font-medium cursor-pointer block mx-auto border border-white"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
