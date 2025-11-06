"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import React from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Tabs from "@/components/pages/setting/Tabs";
import { useAuth } from "@/provider/AuthProvider";

import { useForm } from "react-hook-form";
import { privateAxios } from "@/components/axiosInstance/axios";
import { toast } from "sonner";
import Calendar from "@/components/icons/Calendar";

interface CityData {
  label: string,
  value: string
}

interface LanguegeData {
  label: string,
  value: string
}

interface StateData {
  label: string,
  value: string
}

interface FormData {
  name: string,
  email: string,
  date_of_birth: string,
  language: string,
  Address: string;
  phone_number: string,
  country: string | null,
  state: string | null,
  city: string | null,
  postal_code: string,
  bio: string
}

export default function Setting() {

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
        setImagePreview(reader.result as string);  // Update image preview state
      };
      if (file) {
        reader.readAsDataURL(file);  // Convert the file to a data URL
      }

      setImage(file);
    }
  };

  // Update Image
  useEffect(() => {
    const updateImage = async () => {
      const data = {
        profilePicture: image
      };

      try {
        const response = await privateAxios.put("/users/update-image", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
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

  // City
  const citis: CityData[] = [
    {
      label: "Dhaka",
      value: "Dhaka"
    },
    {
      label: "Chittagong",
      value: "Chittagong",
    },
    {
      label: "Feni",
      value: "Feni",
    },
  ]

  // Country
  const languege: LanguegeData[] = [
    {
      label: "English",
      value: "engalish"
    },
    {
      label: "Usa",
      value: "usa"
    },

  ]

  // State
  const states: StateData[] = [
    {
      label: "8080 Railroad St.",
      value: "8080 Railroad St."
    },
    {
      label: "States 2",
      value: "States 2",
    },
  ]

  //console.log(user);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {

      const date_of_birth = new Date(data.date_of_birth).toISOString();
      data.date_of_birth = date_of_birth;

      const response = await privateAxios.put("/users/update-user-details", data);
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
  }

  // convert dob in normal
  const formattedDate = user?.date_of_birth
    ? new Date(user.date_of_birth).toLocaleDateString('en-CA')
    : '';

  return (
    <>
      {/* Tabs */}
      <Tabs />

      {/* Image Upload */}
      <div className='flex flex-wrap items-center gap-2 sm:gap-5 '>
        <div>
          <div className="h-[100px] w-[100px]">
            {imagePreview ? (
              <Image src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-full" width={100} height={100} />
            ) : (
              user?.imageUrl ?
                <Image src={user.imageUrl} alt="Admin" className="h-[100px] w-[100px]" width={100} height={100} /> :
                <Image src="/images/user.svg" alt="Admin" className="h-[100px] w-[100px]" width={100} height={100} />
            )}
          </div>
        </div>
        <label htmlFor="profileImage" className='cursor-pointer py-[14px] px-5 border border-white rounded-[100px]'>
          <input type="file" hidden id="profileImage" accept="image/*" onChange={handleImageChange} />
          <span className='text-sm font-medium'>Upload New Picture</span>
        </label>
        {/* <button type="button" onClick={handleDelete} className='text-sm font-medium px-5 py-[14px] rounded-[100px] bg-btn-secondary-bg cursor-pointer'>Delete</button> */}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Details Form */}
        <div className='bg-[#131824] p-4 rounded-[8px] mt-4'>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="mb-4">
              <Label className="text-base font-mediumd mb-3">Name</Label>
              <Input defaultValue={user?.name} {...register("name", { required: "Name is required" })} className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Cameron Williamson" />

              {errors.name && (
                <p className="error-msg">{errors.name.message}</p>
              )}
            </div>
            {/* Date of Birth */}
            <div>
              <Label className="text-base font-medium mb-3">Date of Birth</Label>
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
                  className="block h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color appearance-none"
                  id="datepicker"
                />

                {/* Calendar Icon */}
                <Calendar className="absolute right-3 top-1/4  w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>


          </div>
          {/* Email */}
          <div>
            <Label className="text-base font-mediumd mb-3">Email</Label>
            <Input defaultValue={user?.email} {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" } })} className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="cameron.graham@example.com" />

            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
          </div>


          <div className="grid sm:grid-cols-2 gap-5 mt-4">

            {/* address */}
            <div>
              <Label className="text-base font-mediumd mb-3">Address</Label>
              <Input {...register("Address")} defaultValue={user?.Address} className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486  " />
            </div>

            {/* Phone */}
            <div>
              <Label className="text-base font-mediumd mb-3">Phone</Label>
              <Input {...register("phone_number")} defaultValue={user?.phone_number} className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="(704) 555-0127" />
            </div>
          </div>

          {/* Country */}

          {/* 
            {/* States */}
          {/* <div>
              <Label className="text-base font-mediumd mb-3">State</Label>

              <Select
                value={user?.state}
                onValueChange={(val) => setValue("state", val)}
                {...register("state")}
              >
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                  {
                    states.map((state, idx) => {
                      return (
                        <SelectItem key={idx} value={state.value} className="cursor-pointer">{state.label}</SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </div>

            City
            <div>
              <Label className="text-base font-mediumd mb-3">City</Label>

              <Select
                value={user?.city}
                onValueChange={(val) => setValue("city", val)}
                {...register("city")}
              >
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                  {
                    citis.map((city, idx) => {
                      return (
                        <SelectItem key={idx} value={city.value} className="cursor-pointer">{city.label}</SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </div> */}

          {/* Postal Code */}
          {/* <div>
              <Label className="text-base font-mediumd mb-3">Postal Code</Label>
              <Input {...register("postal_code")} defaultValue={user?.postal_code} className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter postal code" />
            </div> */}


          {/* Bio */}
          <div className="mt-4 mb-6">
            <Label className="text-base font-mediumd mb-3">Bio</Label>
            <Textarea {...register("bio")} defaultValue={user?.bio} className="h-[100px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="write your Bio" />
          </div>

          <div className="">
            <button type="submit" className="bg-[#2D9DFF] rounded-full   text-white px-[150px] md:px-[206px] py-[14px]  text-sm font-normal cursor-pointer flex justify-center items-center mx-auto ">Save</button>
          </div>

        </div>
      </form>

    </>
  )
}
