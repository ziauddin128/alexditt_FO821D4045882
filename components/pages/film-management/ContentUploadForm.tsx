"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Upload } from "lucide-react";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { fetchCategoris } from "../categories/CategoriesTable";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Inputs = {
  title: string;
  genre: string;
  kids_mode: boolean;
  description: string;
  contentCategory: string;
  contentType: string;
  director_name: string;
  director_img: string;
  file: File | null;
  thumbnailImg: File | null;
  trailer: File | null;
  casts: { cast: string; cast_img: File | null }[];
  series: {
    series_name: string;
    episode_name: string;
    episode_number: string;
    episode_file: File | null;
    episode_thumbnail: File | null;
  }[];
};

export function ContentUploadForm() {
  const [dragActive, setDragActive] = useState(false);
  const [isSeries, setIsSeries] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      genre: "",
      description: "",
      contentCategory: "",
      contentType: "published",
      file: null,
      thumbnailImg: null,
      trailer: null,
      casts: [{ cast: "", cast_img: null }],
      series: [
        {
          series_name: "",
          episode_name: "",
          episode_number: "",
          episode_file: null,
          episode_thumbnail: null,
        },
      ],
    },
  });

  const {
    fields: castFields,
    append: appendCast,
    remove: removeCast,
  } = useFieldArray({
    control,
    name: "casts",
  });

  // For series
  const {
    fields: seriesFields,
    append: appendSeries,
    remove: removeSeries,
  } = useFieldArray({
    control,
    name: "series",
  });

  const genre = watch("genre");
  const contentCategory = watch("contentCategory");
  const contentType = watch("contentType");
  const trailer = watch("trailer");
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

    // New approach for get cast
    /* const formData = new FormData();
    data.casts.forEach((cast: any, i: number) => {
      formData.append(`casts[${i}][cast]`, cast.cast);
      formData.append(`casts[${i}][cast_img]`, cast.cast_img[0]);
    });

    data.series.forEach((tv: any, i: number) => {
      formData.append(`series[${i}][series_name]`, tv.series_name);
      formData.append(`series[${i}][episode_name]`, tv.episode_name);
      formData.append(`series[${i}][episode_number]`, tv.episode_number);
      formData.append(`series[${i}][episode_file]`, tv.episode_file[0]);
      formData.append(
        `series[${i}][episode_thumbnail]`,
        tv.episode_thumbnail[0]
      );
    });

    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, value); // Full File object
      } else {
        console.log(key, value); // Normal string
      }
    } */

    /*
    uploadContent.mutate(data, {
      onSuccess: () => {
        console.log("UPdate done");
        // toast.success("Content Updated Successfully!");
        // Optional: Reset form or redirect
      },
      onError: (error: Error) => {
        // toast.error(error.message || "Failed to upload content");
        console.log("Error form update content");
      },
    });*/
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

  const handleTrailerPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const vidFile = e.target.files?.[0] ?? null;
    setValue("trailer", vidFile, { shouldValidate: true, shouldDirty: true });
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
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Upload Area */}
        <div className="space-y-6 h-fit">
          <div
            className={`border border-dashed flex flex-col items-center justify-between h-fit rounded-lg p-8 text-center transition-colors bg-[#131824] ${
              dragActive
                ? "border-primary-color bg-primary-color/5"
                : "border-slate-700 hover:border-slate-600"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="flex md:w-[134px] md:h-[134px] justify-center items-center gap-2.5 bg-[#0D121E] p-[35px] rounded-full">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  Drag and drop video files to upload
                </p>
                <p className="text-gray-black-200 text-base">
                  Your videos will be private until <br /> you publish them.
                </p>
              </div>

              <label className="bg-primary-color text-white px-6 py-3 rounded cursor-pointer">
                Select files
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoPick}
                  className="hidden"
                />
              </label>

              {vidFile && (
                <p className="text-sm text-gray-black-200">
                  Selected: <span className="text-white">{vidFile.name}</span>
                </p>
              )}
              {errors.file && (
                <p className="text-xs text-red-500">
                  {errors.file.message as string}
                </p>
              )}
            </div>

            <div className="text-sm text-gray-black-200 mt-18">
              By submitting your videos to streaming app, you acknowledge that
              you agree to streaming{" "}
              <span className="text-primary-color hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primary-color hover:underline cursor-pointer">
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
            <div>
              <Label className="custom-label mb-3">Title</Label>
              <Input
                placeholder="Type your movie name"
                className="custom-content-input"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="error-msg">{errors.title.message}</p>
              )}
            </div>

            {/* Genre */}
            <div>
              <Label className="custom-label mb-3">Genre</Label>
              <Select value={genre}>
                <SelectTrigger className="custom-content-input cursor-pointer">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="border border-gray3-bg bg-dark-bg rounded text-white">
                  <SelectGroup className="space-y-2">
                    <SelectItem
                      value="comedy"
                      className="selectOption !justify-start"
                    >
                      Comedy
                    </SelectItem>
                    <SelectItem
                      value="drama"
                      className="selectOption !justify-start"
                    >
                      Drama
                    </SelectItem>
                    <SelectItem
                      value="action"
                      className="selectOption !justify-start"
                    >
                      Action
                    </SelectItem>
                    <SelectItem
                      value="horror"
                      className="selectOption !justify-start"
                    >
                      Horror
                    </SelectItem>
                    <SelectItem
                      value="romance"
                      className="selectOption !justify-start"
                    >
                      Romance
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.genre && (
                <p className="error-msg">{errors.genre.message}</p>
              )}
            </div>
          </div>

          {/* Kids Mode */}
          <Label
            htmlFor="kids_mode"
            className="text-base flex items-center justify-between gap-3 border-gray3-bg bg-secondary-bg rounded px-4 py-5 cursor-pointer w-full"
          >
            <span> Kids Mode</span>
            <Controller
              name="kids_mode"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="kids_mode"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-primary-color data-[state=checked]:border-primary-color rounded-full h-5 w-5"
                />
              )}
            />
          </Label>

          {/* Description */}
          <div>
            <Label className="custom-label mb-3">Description</Label>
            <Textarea
              placeholder="Enter a short description"
              className="custom-content-input"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Min 10 characters" },
              })}
            />
            {errors.description && (
              <p className="error-msg">{errors.description.message}</p>
            )}
          </div>

          {/* Content Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Content Type */}
            <div>
              <Label className="custom-label mb-3">Content Category</Label>

              <Controller
                name="contentCategory"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) =>
                    value !== "" || "Content category is required",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="custom-content-input cursor-pointer">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray3-bg bg-dark-bg rounded text-white">
                      <SelectGroup className="space-y-2">
                        {categoriesList?.data?.map((cat: any) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.id}
                            className="selectOption !justify-start"
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.contentCategory && (
                <p className="error-msg">{errors.contentCategory.message}</p>
              )}
            </div>

            {/* Content Status */}
            <div>
              <Label className="custom-label mb-3">Content Status</Label>

              <Controller
                name="contentType"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) =>
                    value !== "" || "Content type is required",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="custom-content-input cursor-pointer">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray3-bg bg-dark-bg rounded text-white">
                      <SelectGroup className="space-y-2">
                        <SelectItem
                          value="published"
                          className="selectOption !justify-start"
                        >
                          Published
                        </SelectItem>
                        <SelectItem
                          value="draft"
                          className="selectOption !justify-start"
                        >
                          Draft
                        </SelectItem>
                        <SelectItem
                          value="private"
                          className="selectOption !justify-start"
                        >
                          Private
                        </SelectItem>
                        <SelectItem
                          value="scheduled"
                          className="selectOption !justify-start"
                        >
                          Scheduled
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.contentType && (
                <p className="error-msg">{errors.contentType.message}</p>
              )}
            </div>
          </div>

          {/* Director */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="custom-label mb-3">Director Name</Label>
              <Input
                placeholder="Director name"
                className="custom-content-input"
                {...register("director_name", {
                  required: "Director name is required",
                })}
              />
              {errors.director_name && (
                <p className="error-msg">{errors.director_name.message}</p>
              )}
            </div>

            <div>
              <Label className="custom-label mb-3">Director Image</Label>
              <div>
                <input
                  type="file"
                  className="custom-content-input file:!h-auto !p-2.5 file:cursor-pointer cursor-pointer file:bg-primary-color file:text-white  file:px-2"
                  {...register("director_img", {
                    required: "Director image is required",
                  })}
                />
              </div>
              {errors.director_img && (
                <p className="error-msg">{errors.director_img.message}</p>
              )}
            </div>
          </div>

          {/* Cast */}
          {castFields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 relative border border-gray3-bg p-2"
            >
              <div>
                <Label className="custom-label mb-3">Cast</Label>
                <Input
                  placeholder="Cast name"
                  className="custom-content-input"
                  {...register(`casts.${index}.cast`, {
                    required: "Cast name is required",
                  })}
                />
                {errors?.casts?.[index]?.cast && (
                  <p className="error-msg">
                    {errors.casts[index].cast?.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label className="custom-label mb-3">Cast Image</Label>
                <input
                  type="file"
                  className="custom-content-input file:!h-auto !p-2.5 cursor-pointer file:bg-primary-color file:text-white file:px-2"
                  {...register(`casts.${index}.cast_img`, {
                    required: "Cast image is required",
                  })}
                />
                {errors?.casts?.[index]?.cast_img && (
                  <p className="error-msg">
                    {errors.casts[index].cast_img?.message as string}
                  </p>
                )}
              </div>

              {index > 0 && (
                <button
                  type="button"
                  className="absolute top-2 right-2 cursor-pointer bg-secondary-color text-white p-1 rounded-sm"
                  onClick={() => removeCast(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendCast({ cast: "", cast_img: null })}
            className="flex items-center gap-1 bg-primary-color text-white text-base py-2 px-2.5 rounded cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Add Cast</span>
          </button>

          {/* Series Mode */}
          <div className="flex items-center gap-2">
            <Checkbox
              className="data-[state=checked]:bg-primary-color h-5 w-5 cursor-pointer"
              id="series-mode"
              onCheckedChange={() => setIsSeries(!isSeries)}
            />
            <Label
              htmlFor="series-mode"
              className="text-base font-medium cursor-pointer"
            >
              Enable Series Mode
            </Label>
          </div>

          {/* Series Item */}
          {isSeries &&
            seriesFields.map((item, index) => (
              <div
                key={item.id}
                className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 relative border border-gray3-bg p-2"
              >
                <div className="md:col-span-2 xl:col-span-4">
                  <Label className="custom-label mb-3">Series Name</Label>
                  <Input
                    placeholder="Series name"
                    className="custom-content-input"
                    {...register(`series.${index}.series_name`, {
                      required: "Series name is required",
                    })}
                  />
                  {errors?.series?.[index]?.series_name && (
                    <p className="error-msg">
                      {errors.series[index].series_name?.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="custom-label mb-3">Episode Name</Label>
                  <Input
                    placeholder="Episode name"
                    className="custom-content-input"
                    {...register(`series.${index}.episode_name`, {
                      required: "Episode name is required",
                    })}
                  />
                  {errors?.series?.[index]?.episode_name && (
                    <p className="error-msg">
                      {errors.series[index].episode_name?.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="custom-label mb-3">Episode Number</Label>
                  <Input
                    placeholder="Episode number"
                    className="custom-content-input"
                    {...register(`series.${index}.episode_number`, {
                      required: "Episode number is required",
                    })}
                  />
                  {errors?.series?.[index]?.episode_number && (
                    <p className="error-msg">
                      {errors.series[index].episode_number?.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="custom-label mb-3">Episode File</Label>
                  <input
                    type="file"
                    className="custom-content-input file:!h-auto !p-2.5 file:cursor-pointer cursor-pointer file:bg-primary-color file:text-white file:px-2"
                    {...register(`series.${index}.episode_file`, {
                      required: "Episode file is required",
                    })}
                  />
                  {errors?.series?.[index]?.episode_file && (
                    <p className="error-msg">
                      {errors.series[index].episode_file?.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="custom-label mb-3">Episode Thumbnail</Label>
                  <input
                    type="file"
                    className="custom-content-input file:!h-auto !p-2.5 file:cursor-pointer cursor-pointer file:bg-primary-color file:text-white file:px-2"
                    {...register(`series.${index}.episode_thumbnail`, {
                      required: "Episode thumbnail is required",
                    })}
                  />
                  {errors?.series?.[index]?.episode_thumbnail && (
                    <p className="error-msg">
                      {
                        errors.series[index].episode_thumbnail
                          ?.message as string
                      }
                    </p>
                  )}
                </div>

                {index > 0 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 cursor-pointer bg-secondary-color text-white p-1 rounded-sm"
                    onClick={() => removeSeries(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

          {isSeries && (
            <button
              type="button"
              onClick={() =>
                appendSeries({
                  series_name: "",
                  episode_name: "",
                  episode_number: "",
                  episode_file: null,
                  episode_thumbnail: null,
                })
              }
              className="flex items-center gap-1 bg-primary-color text-white text-base py-2 px-2.5 rounded cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Episode</span>
            </button>
          )}

          {/* Trailer */}
          <div>
            <Label className="custom-label mb-3"> Trailer File</Label>

            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleTrailerPick}
                  />
                  <div className="flex flex-col justify-center items-center gap-2.5 rounded border border-gray3-bg bg-secondary-bg px-4 py-5">
                    <div className="flex justify-center items-center  bg-dark-bg rounded-full h-[64px] w-[64px]">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-black font-sans text-sm flex items-center gap-2 bg-white px-2 py-1 rounded">
                        Choose File
                      </span>
                      <span className="text-white">
                        {trailer ? trailer.name : "No file chosen"}
                      </span>
                    </div>
                  </div>
                </div>
                <input
                  type="hidden"
                  {...register("trailer", {
                    required: "Trailer is required",
                  })}
                />
                {errors.trailer && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.trailer.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Image */}
          <div>
            <Label className="custom-label mb-3">Thumbnail Image</Label>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFilePick}
                  />
                  <div className="flex flex-col justify-center items-center gap-2.5 rounded border border-gray3-bg bg-secondary-bg px-4 py-5">
                    <div className="flex justify-center items-center  bg-dark-bg rounded-full h-[64px] w-[64px]">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-black font-sans text-sm flex items-center gap-2 bg-white px-2 py-1 rounded">
                        Choose File
                      </span>
                      <span className="text-white">
                        {thumbnail ? thumbnail.name : "No file chosen"}
                      </span>
                    </div>
                  </div>
                </div>
                <input
                  type="hidden"
                  {...register("thumbnailImg", {
                    required: "Thumbnail image is required",
                  })}
                />
                {errors.thumbnailImg && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.thumbnailImg.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className={`w-full px-6 py-6 ${
                uploadContent.isError
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-primary-color hover:bg-primary-color"
              } cursor-pointer rounded text-base font-medium`}
              disabled={uploadContent.isPending}
            >
              {uploadContent.isPending
                ? "Uploading..."
                : uploadContent.isError
                ? "Try Again"
                : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
