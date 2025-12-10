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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ReactSelect from "react-select";
import { toast } from "sonner";

interface Category {
  id: string;
  category_name: string;
}

type Inputs = {
  title: string;
  genres: string;
  kids_mode: boolean;
  description: string;
  category_id: string;
  director_name: string;
  director_thumbnail: File | null;
  thumbnailImg: File | null;
  trailer: File | null;
  casts: { cast: string; cast_img: File | null }[];
  season_mode?: boolean;
  season_name?: string;
  release_date?: string;
  season_thumbnail?: string;
  series: {
    episode_name: string;
    episode_number: string;
    episode_duration: string;
    episode_file: File | null;
    episode_thumbnail: File | null;
    episode_description: string;
  }[];
};

export default function AddSeries() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isSeries, setIsSeries] = useState(false);
  const queryClient = useQueryClient();

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
      title: "",
      genres: "",
      description: "",
      category_id: "",
      thumbnailImg: null,
      trailer: null,
      casts: [{ cast: "", cast_img: null }],
      series: [
        {
          episode_name: "",
          episode_number: "",
          episode_duration: "",
          episode_file: null,
          episode_thumbnail: null,
          episode_description: "",
        },
      ],
    },
  });

  // Casts
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

  const trailer = watch("trailer");
  const thumbnail = watch("thumbnailImg");

  // send to the server
  /* const uploadContent = useMutation({
    mutationFn: async (data: Inputs) => {
      try {
        const formData = new FormData();
        // Append file data
        if (data.file) formData.append("file", data.file);
        if (data.thumbnailImg) formData.append("thumbnail", data.thumbnailImg);

        // Append other fields as regular form data
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("genres", data.genres);
        formData.append("category_id", data.category_id);
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
  }); */

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log("All File Data", data);

    setSubmitLoading(true);

    try {
      const formData = new FormData();

      // Append Movie, Thumbnail, Trailer File
      if (data.thumbnailImg)
        formData.append("series_thumbnail", data.thumbnailImg);
      if (data.trailer) formData.append("series_trailer", data.trailer);

      // Form Data
      formData.append("title", data.title);

      const genresArray = data.genres as unknown as { value: string }[];
      const genreString = genresArray?.map((g) => g.value).join(", ");

      formData.append("genres", genreString);

      formData.append("kids_mode", data.kids_mode ? "true" : "false");

      formData.append("description", data.description);
      formData.append("category_id", data.category_id);

      formData.append("director_name", data.director_name);

      if (data.director_thumbnail) {
        formData.append("director_thumbnail", data.director_thumbnail);
      }

      // Casts
      const castArray = data.casts.map((cast: any, i: number) => ({
        key: `cast_member_${i}`,
        name: cast.cast,
      }));

      formData.append("cast", JSON.stringify(castArray));

      data.casts.forEach((cast, i) => {
        if (cast.cast_img instanceof File) {
          formData.append(`cast_member_${i}`, cast.cast_img);
        }
      });

      // Season Info
      if (data.season_mode) {
        const releaseDate = new Date(data.release_date || "");

        const seasonInfo = {
          title: data.season_name || "",
          release_date: releaseDate.toISOString(),
        };

        formData.append("season_info", JSON.stringify(seasonInfo));

        if (data.season_thumbnail && data.season_thumbnail?.length > 0) {
          formData.append("season_thumbnail", data.season_thumbnail[0]);
        }
      }

      // Episodes
      const episodeArray = data.series.map((episode: any, i: number) => ({
        key: `ep${i}`,
        episode_number: episode.episode_number,
        title: episode.episode_name,
        description: episode.episode_description,
        duration: episode.episode_duration,
      }));

      formData.append("episodes", JSON.stringify(episodeArray));

      data.series.forEach((episode, i) => {
        if (episode.episode_file instanceof File) {
          formData.append(`episode_ep${i}_video`, episode.episode_file);
        }

        if (episode.episode_thumbnail instanceof File) {
          formData.append(
            `episode_ep${i}_thumbnail`,
            episode.episode_thumbnail
          );
        }
      });

      // Print Form Data
      /*  formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      return; */

      const response = await privateAxios.post(
        `/admin/series/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      reset();
      toast.success(response.data?.message || "Series added successfully!");
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

  /* const handleDrop = (e: React.DragEvent) => {
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
  }; */

  // File picker handler
  const handleFilePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;

    setValue("thumbnailImg", file, { shouldValidate: true, shouldDirty: true });
  };

  const handleTrailerPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const vidFile = e.target.files?.[0] ?? null;
    setValue("trailer", vidFile, { shouldValidate: true, shouldDirty: true });
  };

  /* const handleVideoPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const vidFile = e.target.files?.[0] ?? null;

    setValue("file", vidFile, { shouldValidate: true, shouldDirty: true });
  }; */

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1  gap-6"
      >
        <div className="space-y-6">
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
              <Controller
                name="genres"
                control={control}
                rules={{ required: "Select at least one genre" }}
                render={({ field, fieldState }) => (
                  <div>
                    <ReactSelect
                      isMulti
                      options={genreOption}
                      className="basic-multi-select custom-multi-select"
                      classNamePrefix="select"
                      onChange={(selected) => field.onChange(selected)}
                    />

                    {fieldState.error && (
                      <p className="error-msg">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
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
              })}
            />
            {errors.description && (
              <p className="error-msg">{errors.description.message}</p>
            )}
          </div>

          {/* Content Type */}
          <div className="grid grid-cols-1 gap-4">
            {/* Type */}
            <div>
              <Label className="custom-label mb-3">Content Category</Label>

              <Controller
                name="category_id"
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
                        {allCategory?.data?.map(
                          (item: Category, idx: number) => (
                            <SelectItem
                              key={idx}
                              className="selectOption !justify-start"
                              value={item?.id}
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

            {/* Status */}
            {/* <div>
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
                          value="PUBLISHED"
                          className="selectOption !justify-start"
                        >
                          PUBLISHED
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

              {errors.contentType && (
                <p className="error-msg">{errors.contentType.message}</p>
              )}
            </div> */}
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

              <Controller
                control={control}
                name="director_thumbnail"
                rules={{ required: "Director image is required" }}
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
                    {fieldState.error && (
                      <p className="text-red-500">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />

              {/* <div>
                <input
                  type="file"
                  className="custom-content-input file:!h-auto !p-2.5 file:cursor-pointer cursor-pointer file:bg-primary-color file:text-white  file:px-2"
                  accept="image/*"
                  {...register("director_thumbnail", {
                    required: "Director image is required",
                  })}
                />
              </div>
              {errors.director_thumbnail && (
                <p className="error-msg">{errors.director_thumbnail.message}</p>
              )} */}
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
                <Controller
                  name={`casts.${index}.cast_img`}
                  control={control}
                  rules={{ required: "Cast image is required" }}
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
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
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

          {/* Season Mode */}
          <div className="flex items-center gap-2">
            <Checkbox
              className="data-[state=checked]:bg-primary-color h-5 w-5 cursor-pointer"
              id="season-mode"
              checked={isSeries} // control the checkbox with state
              onCheckedChange={(checked) => {
                const value = checked === true; // true or false
                setIsSeries(value);
                setValue("season_mode", value, { shouldValidate: true }); // set RHF boolean
              }}
            />
            <Label
              htmlFor="season-mode"
              className="text-base font-medium cursor-pointer"
            >
              Enable Season Mode
            </Label>
          </div>

          {isSeries && (
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="custom-label mb-3">Season Name</Label>
                <Input
                  placeholder="Season name"
                  className="custom-content-input"
                  {...register(`season_name`, {
                    required: "Season name is required",
                  })}
                />
                {errors.season_name && (
                  <p className="error-msg">{errors.season_name.message}</p>
                )}
              </div>

              <div>
                <Label className="custom-label mb-3">Release Date</Label>

                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Release Date"
                    className="custom-content-input white-calendar"
                    {...register(`release_date`, {
                      required: "Release date is required",
                    })}
                  />
                </div>

                {errors.release_date && (
                  <p className="error-msg">{errors.release_date.message}</p>
                )}
              </div>

              <div>
                <Label className="custom-label mb-3">Season Thumbnail</Label>
                <input
                  type="file"
                  className="custom-content-input file:!h-auto !p-2.5 file:cursor-pointer cursor-pointer file:bg-primary-color file:text-white file:px-2"
                  accept="image/*"
                  {...register(`season_thumbnail`, {
                    required: "Season Thumbnail is required",
                  })}
                />
                {errors.season_thumbnail && (
                  <p className="error-msg">
                    {errors.season_thumbnail.message as string}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Series Item */}
          {seriesFields.map((item, index) => (
            <div
              key={item.id}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 relative border border-gray3-bg p-2"
            >
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
                <Label className="custom-label mb-3">Duration (seconds)</Label>
                <Input
                  type="number"
                  placeholder="Duration"
                  className="custom-content-input"
                  {...register(`series.${index}.episode_duration`, {
                    required: "Duration is required",
                  })}
                />
                {errors?.series?.[index]?.episode_duration && (
                  <p className="error-msg">
                    {errors.series[index].episode_duration?.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label className="custom-label mb-3">Episode File</Label>
                <Controller
                  name={`series.${index}.episode_file`}
                  control={control}
                  rules={{ required: "Episode file is required" }}
                  render={({ field: controllerField, fieldState }) => (
                    <div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          controllerField.onChange(file);
                        }}
                        className="custom-content-input file:!h-auto !p-2.5 cursor-pointer file:bg-primary-color file:text-white file:px-2"
                      />
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <Label className="custom-label mb-3">Episode Thumbnail</Label>
                <Controller
                  name={`series.${index}.episode_thumbnail`}
                  control={control}
                  rules={{ required: "Episode thumbnail is required" }}
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
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <Label className="custom-label mb-3">Description</Label>
                <Input
                  placeholder="Description"
                  className="custom-content-input"
                  {...register(`series.${index}.episode_description`)}
                />
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

          <button
            type="button"
            onClick={() =>
              appendSeries({
                episode_name: "",
                episode_number: "",
                episode_duration: "",
                episode_file: null,
                episode_thumbnail: null,
                episode_description: "",
              })
            }
            className="flex items-center gap-1 bg-primary-color text-white text-base py-2 px-2.5 rounded cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Episode</span>
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
              className={`w-full px-6 py-6 bg-primary-color hover:bg-primary-color cursor-pointer rounded text-base font-medium`}
              disabled={submitLoading}
            >
              {submitLoading ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
