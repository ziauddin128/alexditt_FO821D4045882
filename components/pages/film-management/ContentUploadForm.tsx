"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { fetchCategoris } from "../categories/CategoriesTable";


type Inputs = {
  title: string;
  genre: string;
  description: string;
  contentCategory: string;
  contentType: string;
  file: File | null;
  thumbnailImg: File | null;
};

export function ContentUploadForm() {
  const [dragActive, setDragActive] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      genre: "comedy",
      description: "",
      contentCategory: "movie",
      contentType: "published",
      file: null,
      thumbnailImg: null,
    },
  });

  const genre = watch("genre");
  const contentCategory = watch("contentCategory");
  const contentType = watch("contentType");
  const thumbnail = watch("thumbnailImg");
  const vidFile = watch("file");

  // send to the server
  const uploadContent = useMutation({
    mutationFn: async (data: Inputs) => {
      try {
        const formData = new FormData();
        // Append file data
        if (data.file) formData.append("file", data.file);
        if (data.thumbnailImg) formData.append("thumbnail", data.thumbnailImg);

        // Append other fields as regular form data
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("genre", data.genre);
        formData.append("category_id", data.contentCategory);
        formData.append("type", data.contentType);

        console.log("FormData Contents:");
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        // You can replace this with your actual API endpoint
        const response = await privateAxios.post(`/uploads/video`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Something went wrong!";
        throw new Error(message);
      }
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    uploadContent.mutate(data, {
      onSuccess: () => {
        console.log("UPdate done")
        // toast.success("Content Updated Successfully!");
        // Optional: Reset form or redirect
      },
      onError: (error: Error) => {
        // toast.error(error.message || "Failed to upload content");
        console.log("Error form update content")
      },
    });
  };

  // Drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      setValue("thumbnailImg", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  // File picker handler
  const handleFilePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;

    setValue("thumbnailImg", file, { shouldValidate: true, shouldDirty: true });
  };
  const handleVideoPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const vidFile = e.target.files?.[0] ?? null;

    setValue("file", vidFile, { shouldValidate: true, shouldDirty: true });
  };

  const { data: categoriesList, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoris,
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 sm:h-[580px]"
      >
        {/* Upload Area */}
        <div className="space-y-6 overflow-hidden  h-76 md:h-[340px] lg:h-full">
          <div
            className={`border border-dashed flex flex-col items-center justify-between h-full rounded-lg p-8 text-center transition-colors bg-[#131824] ${
              dragActive
                ? "border-purple-500 bg-purple-500/10"
                : "border-slate-700 hover:border-slate-600"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="h-40" />

            <div className="flex flex-col items-center space-y-4">
              <div className="flex md:w-[134px] md:h-[134px] justify-center items-center gap-2.5 bg-[#0D121E] p-[35px] rounded-full">
                <Upload className="w-12 h-12 text-slate-400" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-300 font-medium">
                  Drag and drop video files to upload
                </p>
                <p className="text-[#A5A5AB] text-sm">
                  Your videos will be private until <br /> you publish them.
                </p>
              </div>

              <label className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded cursor-pointer">
                Select files
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoPick}
                  className="hidden"
                />
              </label>

              {vidFile && (
                <p className="text-xs text-slate-400">
                  Selected:{" "}
                  <span className="text-slate-200">{vidFile.name}</span>
                </p>
              )}
              {errors.file && (
                <p className="text-xs text-red-500">
                  {errors.file.message as string}
                </p>
              )}
            </div>

            <div className="text-xs text-slate-500 leading-relaxed mt-18">
              By submitting your videos to streaming app, you acknowledge that
              you agree to streaming{" "}
              <span className="text-purple-400 underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-purple-400 underline cursor-pointer">
                Community Guidelines
              </span>
              .
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-3">
              <label className="text-base font-medium text-slate-300 block">
                Title
              </label>
              <Input
                placeholder="Type your movie name"
                className="bg-[#131824] border-[#1B202C] rounded text-slate-100 placeholder:text-slate-500"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Genre (Select bridged via hidden input) */}
            <div className="space-y-3 w-full">
              <label className="text-base font-medium text-slate-300 block">
                Genre
              </label>
              <Select
                value={genre}
                onValueChange={(val) =>
                  setValue("genre", val, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger className="bg-[#131824] border-[#1B202C] rounded text-slate-100 w-full">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-[#131824] border-slate-700 text-white">
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                </SelectContent>
              </Select>
              {/* Registered hidden input to enable RHF validation & submission */}
              <input
                type="hidden"
                {...register("genre", { required: "Genre is required" })}
                value={genre}
                readOnly
              />
              {errors.genre && (
                <p className="text-sm text-red-500">{errors.genre.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-base font-medium text-slate-300">
              Description
            </label>
            <Textarea
              placeholder="Enter a short description"
              className="flex h-[100px] items-start gap-2.5 self-stretch rounded border border-[#1B202C] bg-[#131824] px-4 py-3"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Min 10 characters" },
              })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Content Type */}
            <div className="space-y-3 w-full">
              <label className="text-base font-medium text-slate-300 block">
                Content Category
              </label>
              <Select
                value={contentCategory}
                onValueChange={(val) =>
                  setValue("contentCategory", val, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger className="bg-[#131824] border-[#1B202C] rounded text-slate-100 w-full">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent className="bg-[#131824] border-slate-700 text-white">
                  {categoriesList?.data?.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("contentCategory", {
                  required: "Content type is required",
                })}
                value={contentCategory}
                readOnly
              />
              {errors.contentCategory && (
                <p className="text-sm text-red-500">
                  {errors.contentCategory.message}
                </p>
              )}
            </div>

            {/* Content Status */}
            <div className="space-y-3">
              <label className="text-base font-medium text-slate-300 block">
                Content Status
              </label>
              <Select
                value={contentType}
                onValueChange={(val) =>
                  setValue("contentType", val, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger className="bg-[#131824] border-[#1B202C] rounded text-slate-100 w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#131824] border-slate-700 text-white">
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("contentType", {
                  required: "Content status is required",
                })}
                value={contentType}
                readOnly
              />
              {errors.contentType && (
                <p className="text-sm text-red-500">
                  {errors.contentType.message}
                </p>
              )}
            </div>
          </div>

          {/* Thumbnail Image (registered via setValue) */}
          <div className="space-y-3">
            <label className="text-base block font-medium text-slate-300">
              Thumbnail Image
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFilePick}
                  />
                  <div className="flex h-[141px] justify-center items-center gap-2.5 rounded border border-[#1B202C] bg-[#131824] px-4 py-3">
                    <span className="text-black font-sans text-sm flex items-center gap-2 bg-white px-2 py-1 rounded">
                      Choose File
                    </span>
                    <span className="text-slate-400">
                      {thumbnail ? thumbnail.name : "No file chosen"}
                    </span>
                  </div>
                </div>
                {/* A hidden input is not required here because file inputs cannot have programmatic value set.
                    We're storing the File directly in RHF via setValue. To validate, we register the field once: */}
                <input
                  type="hidden"
                  {...register("thumbnailImg", {
                    required: "Thumbnail image is required",
                  })}
                />
                {errors.thumbnailImg && (
                  <p className="text-sm text-red-500">
                    {errors.thumbnailImg.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className={`w-full px-6 py-[13px] ${
                uploadContent.isError
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#7A24BC] hover:bg-[#7A24A1]"
              } cursor-pointer`}
              disabled={uploadContent.isPending}
            >
              {uploadContent.isPending
                ? "Uploading..."
                : uploadContent.isError
                ? "Try Again"
                : "Upload"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
