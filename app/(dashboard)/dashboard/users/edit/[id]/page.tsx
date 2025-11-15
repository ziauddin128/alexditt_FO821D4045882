"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tabs from "@/components/pages/setting/Tabs";
import { useAuth } from "@/provider/AuthProvider";

import { Controller, useForm } from "react-hook-form";
import { privateAxios } from "@/components/axiosInstance/axios";
import { toast } from "sonner";
import Calendar from "@/components/icons/Calendar";

interface FormData {
  name: string;
  email: string;
  date_of_birth: string;
  Address: string;
  phone_number: string;
  country: string | null;
  postal_code: string;
  description: string;
  gender: string;
}

export default function EditUser({ params }: { params: any }) {
  const { user } = useAuth();

  const [image, setImage] = useState<File | undefined>();
  // Image Preview Show
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle file selection and show the image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      // Read the file as a data URL (base64 string)
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
        profilePicture: image,
      };

      try {
        const response = await privateAxios.put("/users/update-image", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data) {
          toast.success("Image updated successfully", {
            position: "top-right",
            style: {
              backgroundColor: "#4CAF50",
              color: "#fff",
            },
          });
        }
      } catch (errorData: any) {
        toast.error("Image updated failed", {
          position: "top-right",
          style: {
            backgroundColor: "#f44336",
            color: "#fff",
          },
        });
      }
    };

    if (image) {
      updateImage();
    }
  }, [image]);

  // Handle delete action (reset the image preview)
  /*  const handleDelete = () => {
     setImagePreview(null);  // Reset the preview image
     setImage(undefined);
   }; */

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const date_of_birth = new Date(data.date_of_birth).toISOString();
      data.date_of_birth = date_of_birth;

      const response = await privateAxios.put(
        "/users/update-user-details",
        data
      );
      if (response.data) {
        toast.success("Data updated successfully", {
          position: "top-right",
          style: {
            backgroundColor: "#4CAF50",
            color: "#fff",
          },
        });
      }
    } catch (errorData: any) {
      toast.error("Data updated failed", {
        position: "top-right",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        },
      });
    }
  };

  // Convert dob in normal
  const formattedDate = user?.date_of_birth
    ? new Date(user.date_of_birth).toLocaleDateString("en-CA")
    : "";

  return (
    <>
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
            ) : user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="Admin"
                className="h-[100px] w-[100px]"
                width={100}
                height={100}
              />
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
        {/* Personal Details Form */}
        <div className="bg-[#131824] p-4 rounded-[8px] mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Name</Label>
              <Input
                defaultValue={user?.name}
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
                defaultValue={user?.email}
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

            {/* Date of Birth */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Date of Birth</Label>
              <div className="relative">
                <Input
                  {...register("date_of_birth")}
                  type="text"
                  placeholder="1 Feb, 1990"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  defaultValue={formattedDate}
                  className="custom-input"
                  id="datepicker"
                />

                {/* Calendar Icon */}
                <Calendar className="absolute right-3 top-1/4  w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Gender */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Date of Birth</Label>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) => value !== "" || "Gender is required",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="custom-input cursor-pointer">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="error-msg">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {/* address */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Address</Label>
              <Input
                {...register("Address")}
                defaultValue={user?.Address}
                className="custom-input"
                placeholder="Address"
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <Label className="custom-label mb-3">Phone</Label>
              <Input
                {...register("phone_number")}
                defaultValue={user?.phone_number}
                className="custom-input"
                placeholder="(704) 555-0127"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 mb-6">
            <Label className="custom-label mb-3">Description</Label>
            <Textarea
              {...register("description")}
              defaultValue={user?.bio}
              className="!h-[100px] custom-input"
              placeholder="Description"
            />
          </div>

          <button
            type="submit"
            className="bg-primary-color rounded-full text-white py-[14px] max-w-[400px] w-full text-base font-medium cursor-pointer block mx-auto border border-white"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
