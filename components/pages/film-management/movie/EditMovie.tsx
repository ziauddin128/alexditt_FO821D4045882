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
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/app/(dashboard)/loading";
import { toast } from "sonner";
import ReactSelect from "react-select";
import DeleteCast from "./DeleteCast";

interface Category {
  id: string;
  category_name: string;
}

type Inputs = {
  id?: string;
  title: string;
  genres: { value: string; label: string }[];
  release_date: string;
  duration: string;
  kids_mode: boolean;
  description: string;
  category_id: string;
  contentType: string;
  director_name: string;
  status: string;
  video?: string;
  director_thumbnail: File | null | string;
  file: File | null;
  movie_thumbnail: File | null | string;
  trailer: File | null;
  movie_trailer?: File | null | string;
  casts: {
    id: string;
    name: string;
    cast_thumbnail: File | null | string;
  }[];
  cast_update: {
    id: string;
    name: string;
    cast_thumbnail: File | null | string;
  }[];
};

export default function EditMovie({
  movieData,
  isLoading,
}: {
  movieData: Inputs;
  isLoading: boolean;
}) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Genre
  const { data: allGenre, isLoading: isGenreLoading } = useQuery({
    queryKey: ["genre"],
    queryFn: async () => {
      const response = await privateAxios.get("/dashborad/genre-list");
      return response.data;
    },
  });

  const genreOption = allGenre?.data?.map((item: string) => ({
    value: item,
    label: item,
  }));

  // Category
  const { data: allCategory, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await privateAxios.get("/dashborad/category-list");
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      category_id: movieData?.category_id,
      status: movieData?.status,
      file: null,
      movie_thumbnail: null,
      trailer: null,
      director_thumbnail: null,
      casts: [],
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

  const genres = watch("genres");
  const kids_mode = watch("kids_mode");
  const director_thumbnail = watch("director_thumbnail");
  const trailer = watch("trailer");
  const thumbnail = watch("movie_thumbnail");
  const vidFile = watch("file");

  // Form Submission
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSubmitLoading(true);

    try {
      const formData = new FormData();

      // Append Movie, Thumbnail, Trailer File
      if (data.file) formData.append("video", data.file);
      if (data.movie_thumbnail)
        formData.append("movie_thumbnail", data.movie_thumbnail);
      if (data.trailer) formData.append("movie_trailer", data.trailer);

      // Form Data
      formData.append("title", data.title);

      const genresArray = data.genres as unknown as { value: string }[];
      const genreString = genresArray?.map((g) => g.value).join(", ");

      formData.append("genres", genreString);

      const releaseDate = new Date(data.release_date);
      formData.append("release_date", releaseDate.toISOString());

      formData.append("duration", data.duration);
      formData.append("kids_mode", data.kids_mode ? "true" : "false");
      formData.append("description", data.description);
      formData.append("category_id", data.category_id);

      formData.append("status", data.status);

      formData.append("director_name", data.director_name);

      if (data.director_thumbnail) {
        formData.append("director_thumbnail", data.director_thumbnail);
      }

      // Updated Cast
      const updatedCastArray = data.cast_update.map((cast: any, i: number) => ({
        id: cast.id,
        name: cast.name,
        key: `updated_cast_member_${i}`,
      }));

      formData.append("cast_update", JSON.stringify(updatedCastArray));

      data.cast_update.forEach((cast, i) => {
        if (cast.cast_thumbnail instanceof File) {
          formData.append(`updated_cast_member_${i}`, cast.cast_thumbnail);
        }
      });

      // New Casts
      const castArray = data.casts.map((cast: any, i: number) => ({
        key: `cast_member_${i}`,
        name: cast.name,
      }));

      formData.append("cast", JSON.stringify(castArray));

      data.casts.forEach((cast, i) => {
        if (cast.cast_thumbnail instanceof File) {
          formData.append(`cast_member_${i}`, cast.cast_thumbnail);
        }
      });

      /* console.log("FormData Contents:");
      formData.forEach((value, key) => {
        //console.log(`${key}: ${value}`);

        if (value instanceof File) {
          console.log(
            `${key}: name=${value.name}, size=${value.size} bytes, type=${value.type}`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      });

      return; */

      const response = await privateAxios.patch(
        `/admin/movie/${movieData?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data?.message || "Movie updated successfully!");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong!";
      throw new Error(message);
    } finally {
      setSubmitLoading(false);
    }
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
      setValue("movie_thumbnail", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  // File picker handler
  const handleFilePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;

    setValue("movie_thumbnail", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleTrailerPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const vidFile = e.target.files?.[0] ?? null;
    setValue("trailer", vidFile, { shouldValidate: true, shouldDirty: true });
  };

  const handleVideoPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const vidFile = e.target.files?.[0] ?? null;

    setValue("file", vidFile, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
                      Selected:{" "}
                      <span className="text-white">{vidFile.name}</span>
                    </p>
                  )}

                  <p className="text-green-500 text-sm mt-1">
                    {(movieData?.video as string) || ""}
                  </p>

                  {errors.file && (
                    <p className="text-xs text-red-500">
                      {errors.file.message as string}
                    </p>
                  )}
                </div>

                <div className="text-sm text-gray-black-200 mt-18">
                  By submitting your videos to streaming app, you acknowledge
                  that you agree to streaming{" "}
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
                    defaultValue={movieData?.title || ""}
                  />
                  {errors.title && (
                    <p className="error-msg">{errors.title.message}</p>
                  )}
                </div>

                {/* Genre */}
                <div>
                  <Label className="custom-label mb-3">Genre</Label>

                  <Controller
                    name="genres"
                    control={control}
                    rules={{ required: "Select at least one genre" }}
                    defaultValue={
                      genreOption?.filter((option: any) =>
                        movieData?.genres?.includes(option.value)
                      ) || []
                    }
                    render={({ field, fieldState }) => (
                      <div>
                        <ReactSelect
                          isMulti
                          options={genreOption}
                          className="basic-multi-select custom-multi-select"
                          classNamePrefix="select"
                          value={field.value}
                          onChange={(selected) => field.onChange(selected)}
                        />

                        {fieldState.error && (
                          <p className="error-msg">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Release Date */}
                <div>
                  <Label className="custom-label mb-3">Release Date</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      className="custom-content-input white-calendar"
                      {...register("release_date", {
                        required: "Release Date is required",
                      })}
                      defaultValue={
                        movieData?.release_date
                          ? new Date(movieData.release_date)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                    />
                  </div>

                  {errors.release_date && (
                    <p className="error-msg">{errors.release_date.message}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <Label className="custom-label mb-3">Duration</Label>
                  <Input
                    placeholder="Ex: 2hour 30min"
                    className="custom-content-input"
                    {...register("duration", {
                      required: "Duration Date is required",
                    })}
                    defaultValue={movieData?.duration || ""}
                  />
                  {errors.duration && (
                    <p className="error-msg">{errors.duration.message}</p>
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
                  defaultValue={movieData?.kids_mode}
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
                  })}
                  defaultValue={movieData?.description || ""}
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
                    name="category_id"
                    control={control}
                    defaultValue={movieData?.category_id?.toString() ?? ""}
                    rules={{
                      validate: (value) =>
                        value !== "" || "Content category is required",
                    }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="custom-content-input cursor-pointer">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray3-bg bg-dark-bg rounded text-white">
                          <SelectGroup className="space-y-2">
                            {allCategory?.data?.map(
                              (item: Category, idx: number) => (
                                <SelectItem
                                  key={idx}
                                  className="selectOption !justify-start"
                                  value={item?.id?.toString()}
                                >
                                  {item?.category_name}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.category_id && (
                    <p className="error-msg">{errors.category_id.message}</p>
                  )}
                </div>

                {/* Content Status */}
                <div>
                  <Label className="custom-label mb-3">Content Status</Label>

                  <Controller
                    name="status"
                    control={control}
                    defaultValue={movieData?.status || ""}
                    rules={{
                      validate: (value) => value !== "" || "Status is required",
                    }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="custom-content-input cursor-pointer">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray3-bg bg-dark-bg rounded text-white">
                          <SelectGroup className="space-y-2">
                            <SelectItem
                              value="LIVE"
                              className="selectOption !justify-start"
                            >
                              LIVE
                            </SelectItem>
                            <SelectItem
                              value="PUBLISHED"
                              className="selectOption !justify-start"
                            >
                              PUBLISHED
                            </SelectItem>
                            <SelectItem
                              value="UNPUBLISHED"
                              className="selectOption !justify-start"
                            >
                              UNPUBLISHED
                            </SelectItem>
                            <SelectItem
                              value="DRAFT"
                              className="selectOption !justify-start"
                            >
                              DRAFT
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.status && (
                    <p className="error-msg">{errors.status.message}</p>
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
                    defaultValue={movieData?.director_name || ""}
                  />
                  {errors.director_name && (
                    <p className="error-msg">{errors.director_name.message}</p>
                  )}
                </div>

                <div>
                  <Label className="custom-label mb-3">Director Image</Label>
                  <Controller
                    control={control}
                    name="director_thumbnail"
                    /*  rules={{ required: "Director image is required" }} */
                    render={({ field, fieldState }) => (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="custom-content-input file:!h-auto !p-2.5 file:cursor-pointer cursor-pointer file:bg-primary-color file:text-white file:px-2"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            field.onChange(file);
                          }}
                        />
                        <p className="text-green-500 text-sm mt-1">
                          {(movieData?.director_thumbnail as string) || ""}
                        </p>
                        {/* {fieldState.error && (
                          <p className="text-red-500">
                            {fieldState.error.message}
                          </p>
                        )} */}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Cast From API */}
              {movieData?.casts && movieData?.casts.length > 0
                ? movieData.casts.map((cast, index) => (
                    <div
                      key={cast.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 relative border border-gray3-bg p-2"
                    >
                      <Input
                        hidden
                        placeholder="Cast ID"
                        className="custom-content-input"
                        {...register(`cast_update.${index}.id`, {
                          required: "Cast id is required",
                        })}
                        defaultValue={cast?.id}
                      />

                      <div>
                        <Label className="custom-label mb-3">Cast</Label>
                        <Input
                          placeholder="Cast name"
                          className="custom-content-input"
                          {...register(`cast_update.${index}.name`, {
                            required: "Cast name is required",
                          })}
                          defaultValue={cast?.name}
                        />
                        {errors?.cast_update?.[index]?.name && (
                          <p className="error-msg">
                            {errors.cast_update[index].name?.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="custom-label mb-3">Cast Image</Label>
                        <Controller
                          name={`cast_update.${index}.cast_thumbnail`}
                          control={control}
                          render={({ field: controllerField, fieldState }) => (
                            <div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] ?? null;
                                  controllerField.onChange(file);
                                }}
                                className="custom-content-input file:!h-auto !p-2.5 cursor-pointer file:bg-primary-color file:text-white file:px-2"
                              />

                              <p className="text-green-500 text-sm mt-1">
                                {cast?.cast_thumbnail as string}
                              </p>
                            </div>
                          )}
                        />
                      </div>

                      <DeleteCast movieId={movieData?.id || ""} id={cast?.id} />
                    </div>
                  ))
                : null}

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
                      {...register(`casts.${index}.name`, {
                        required: "Cast name is required",
                      })}
                    />
                    {errors?.casts?.[index]?.name && (
                      <p className="error-msg">
                        {errors.casts[index].name?.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="custom-label mb-3">Cast Image</Label>
                    <Controller
                      name={`casts.${index}.cast_thumbnail`}
                      control={control}
                      /* rules={{ required: "Cast image is required" }} */
                      render={({ field: controllerField, fieldState }) => (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] ?? null;
                              controllerField.onChange(file);
                            }}
                            className="custom-content-input file:!h-auto !p-2.5 cursor-pointer file:bg-primary-color file:text-white file:px-2"
                          />

                          <p className="text-green-500 text-sm mt-1">
                            {castFields[index].cast_thumbnail as string}
                          </p>

                          {/*  {fieldState.error && (
                            <p className="text-red-500">
                              {fieldState.error.message}
                            </p>
                          )} */}
                        </div>
                      )}
                    />
                  </div>

                  <button
                    type="button"
                    className="absolute top-2 right-2 cursor-pointer bg-secondary-color text-white p-1 rounded-sm"
                    onClick={() => removeCast(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  appendCast({ id: "", name: "", cast_thumbnail: null })
                }
                className="flex items-center gap-1 bg-primary-color text-white text-base py-2 px-2.5 rounded cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>Add Cast</span>
              </button>

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
                    <input type="hidden" {...register("trailer")} />
                    <p className="text-green-500 text-sm mt-1">
                      {(movieData?.movie_trailer as string) || ""}
                    </p>
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
                            {/* {thumbnail
                              ? (thumbnail.name)
                              : "No file chosen"} */}

                            {thumbnail
                              ? typeof thumbnail === "string"
                                ? thumbnail
                                : thumbnail.name
                              : "No file chosen"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" {...register("movie_thumbnail")} />
                    <p className="text-green-500 text-sm mt-1">
                      {(movieData?.movie_thumbnail as string) || ""}
                    </p>
                    {errors.movie_thumbnail && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.movie_thumbnail.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className={`w-full px-6 py-6 bg-primary-color hover:bg-primary-color cursor-pointer rounded text-base font-medium`}
                  disabled={submitLoading}
                >
                  {submitLoading ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
