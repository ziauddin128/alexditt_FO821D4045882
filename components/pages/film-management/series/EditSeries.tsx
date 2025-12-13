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
import LoadingSpinner from "@/app/(dashboard)/loading";
import DeleteCast from "./DeleteCast";
import DeleteEpisode from "./DeleteEpisode";
import DeleteSeason from "./DeleteSeason";
import Link from "next/link";
import ConvertToMinute from "@/hooks/convertToMinute";
import ConvertToSeconds from "@/hooks/convertToSecond";

interface Category {
  id: string;
  category_name: string;
}

type Inputs = {
  id?: string;
  title: string;
  genres: string;
  kids_mode: boolean;
  description: string;
  category_id: string;
  status: string;
  director_name: string;
  director_thumbnail: File | null | string;
  thumbnailImg: File | null;
  series_thumbnail: File | null | string;
  trailer: File | null;
  series_trailer: File | null | string;
  seasons: {
    id: string;
    title: string;
    release_date?: string;
    season_thumbnail?: string;
    episodes: {
      id: string;
      episode_number: string;
      title: string;
      description: string;
      duration: string;
      episode_thumbnails: File | null | string;
      episode_videos: File | null | string;
      season_id: string;
      series_id: string;
    }[];
  }[];
  season_mode?: boolean;
  season_name?: string;
  release_date?: string;
  season_thumbnail?: string;
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
  series: {
    episode_name: string;
    episode_number: string;
    episode_duration: string;
    episode_file: File | null;
    episode_thumbnail: File | null;
    episode_description: string;
  }[];
  episodes: {
    id: string;
    episode_number: string;
    title: string;
    description: string;
    duration: string;
    episode_thumbnails: string;
    episode_videos: string;
    series_id: string;
  }[];
  episode_update: {
    id: string;
    episode_number: string;
    title: string;
    description: string;
    duration: string;
    episode_thumbnails: File | null;
    episode_videos: File | null;
  }[];
  season_update: {
    id: string;
    title: string;
    release_date: string;
    season_thumbnail: File | null;
  }[];
};

export default function EditSeries({
  movieData,
  isLoading,
  refetch,
}: {
  movieData: Inputs;
  isLoading: boolean;
  refetch: () => void;
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
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      category_id: movieData?.category_id,
      status: movieData?.status,
      thumbnailImg: null,
      trailer: null,
      casts: [],
      series: [],
      season_update: [],
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

  const trailer = watch("trailer");
  const thumbnail = watch("thumbnailImg");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSubmitLoading(true);

    // console.log("Submitted data", data);

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
      formData.append("status", data.status);

      formData.append("director_name", data.director_name);
      if (data.director_thumbnail) {
        formData.append("director_thumbnail", data.director_thumbnail);
      }

      // Cast Info
      // Updated
      const updatedCastArray = (data.cast_update || []).map(
        (cast: any, i: number) => ({
          id: cast.id,
          name: cast.name,
        })
      );
      // New
      const castArray = (data.casts || []).map((cast: any, i: number) => ({
        key: `${i}`,
        name: cast.name,
      }));

      const combinedCastArray = [...updatedCastArray, ...castArray];

      if (combinedCastArray.length > 0) {
        formData.append("cast_updates", JSON.stringify(combinedCastArray));
      }

      // Cast Thumbnail
      // Updated
      if (updatedCastArray.length > 0) {
        // formData.append("cast_updates", JSON.stringify(updatedCastArray));

        (data.cast_update || []).forEach((cast, i) => {
          if (cast.cast_thumbnail instanceof File) {
            formData.append(`cast_${cast.id}_thumbnail`, cast.cast_thumbnail);
          }
        });
      }
      // New
      if (castArray.length > 0) {
        // formData.append("cast_updates", JSON.stringify(castArray));

        (data.casts || []).forEach((cast, i) => {
          if (cast.cast_thumbnail instanceof File) {
            formData.append(`cast_${i}_thumbnail`, cast.cast_thumbnail);
          }
        });
      }

      // Episode Update
      const updatedEpisodeArray = (data.episode_update || []).map(
        (episode: any, i: number) => ({
          id: episode.id,
          title: episode.title,
          duration: String(ConvertToSeconds(episode.duration)),
          description: episode.description,
          episode_number: episode.episode_number,
        })
      );

      if (updatedEpisodeArray.length > 0) {
        formData.append("episode_updates", JSON.stringify(updatedEpisodeArray));

        (data.episode_update || []).forEach((episode, i) => {
          if (episode.episode_thumbnails instanceof File) {
            formData.append(
              `episode_${episode.id}_thumbnail`,
              episode.episode_thumbnails
            );
          }

          if (episode.episode_videos instanceof File) {
            formData.append(
              `episode_${episode.id}_video`,
              episode.episode_videos
            );
          }
        });
      }

      // Season Info Update
      const seasonInfoArray = (data.season_update || []).map(
        (season: any, i: number) => ({
          id: season.id,
          title: season.title,
          release_date: new Date(season.release_date).toISOString(),
        })
      );

      if (seasonInfoArray.length > 0) {
        formData.append("season_updates", JSON.stringify(seasonInfoArray));

        (data.season_update || []).forEach((episode, i) => {
          if (episode.season_thumbnail instanceof File) {
            formData.append(
              `season_${episode.id}_thumbnail`,
              episode.season_thumbnail
            );
          }
        });
      }

      // Print Form Data
      /* formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      return; */

      const response = await privateAxios.patch(
        `/admin/series/${movieData?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // refetch();
      toast.success(response.data?.message || "Series updated successfully!");
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

  // File picker handler
  const handleFilePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;

    setValue("thumbnailImg", file, { shouldValidate: true, shouldDirty: true });
  };

  const handleTrailerPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const vidFile = e.target.files?.[0] ?? null;
    setValue("trailer", vidFile, { shouldValidate: true, shouldDirty: true });
  };

  // Remove cast deleted value
  const removeCastFromForm = (castId: string) => {
    const current = getValues("cast_update") || [];

    const next = current.filter((c: any) => c && c.id !== castId);

    setValue("cast_update", next, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // Remove Episode deleted value
  const removeEpisodeFromForm = (episodeId: string) => {
    const current = getValues("episode_update") || [];

    const next = current.filter((ep: any) => ep && ep.id !== episodeId);

    setValue("episode_update", next, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
              <div className="grid md:grid-cols-2 gap-4">
                {/* Type */}
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
                  <div>
                    <Controller
                      control={control}
                      name="director_thumbnail"
                      rules={{
                        validate: {
                          isImage: (value: File | string | null) => {
                            if (!value) return true;
                            if (typeof value === "string") return true;
                            return (
                              value.type.startsWith("image/") ||
                              "Only image files are allowed"
                            );
                          },
                        },
                      }}
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
                          <p className="text-gray-400 text-sm mt-1">
                            {(movieData?.director_thumbnail as string) || ""}
                          </p>
                          {fieldState.error && (
                            <p className="error-msg">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
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
                          rules={{
                            validate: {
                              isImage: (value: File | string | null) => {
                                if (!value) return true;
                                if (typeof value === "string") return true;
                                return (
                                  value.type.startsWith("image/") ||
                                  "Only image files are allowed"
                                );
                              },
                            },
                          }}
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

                              <p className="text-gray-400 text-sm mt-1">
                                {cast?.cast_thumbnail as string}
                              </p>

                              {errors?.cast_update?.[index]?.cast_thumbnail && (
                                <p className="error-msg">
                                  {
                                    errors.cast_update[index].cast_thumbnail
                                      ?.message as string
                                  }
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>

                      <DeleteCast
                        movieId={movieData?.id || ""}
                        id={cast?.id}
                        refetch={refetch}
                        onSuccess={() => removeCastFromForm(cast.id)}
                      />
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
                      rules={{
                        validate: {
                          isImage: (value: File | string | null) => {
                            if (!value) return true;
                            if (typeof value === "string") return true;
                            return (
                              value.type.startsWith("image/") ||
                              "Only image files are allowed"
                            );
                          },
                        },
                      }}
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
                            {typeof castFields[index].cast_thumbnail ===
                              "string" && castFields[index].cast_thumbnail}
                          </p>

                          {fieldState.error && (
                            <p className="error-msg">
                              {fieldState.error.message}
                            </p>
                          )}
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

              {/* Seasons with Episode */}
              {movieData?.seasons?.length > 0
                ? movieData?.seasons.map((season, seasonIndex) => (
                    <div className="p-2 border-2 border-[#2d9dff7a] rounded-sm space-y-3">
                      <div
                        key={`season_info${seasonIndex}`}
                        className="grid md:grid-cols-3 gap-4 relative border border-[#f1a10d42] p-2"
                      >
                        <Input
                          hidden
                          placeholder="Season ID"
                          className="custom-content-input"
                          {...register(`season_update.${seasonIndex}.id`)}
                          defaultValue={season?.id}
                        />

                        <div>
                          <Label className="custom-label mb-3">
                            Season Name
                          </Label>
                          <Input
                            placeholder="Season name"
                            className="custom-content-input"
                            {...register(`season_update.${seasonIndex}.title`, {
                              required: "Season name is required",
                            })}
                            defaultValue={season?.title}
                          />
                          {errors?.season_update?.[seasonIndex]?.title && (
                            <p className="error-msg">
                              {
                                errors.season_update[seasonIndex].title
                                  ?.message as string
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="custom-label mb-3">
                            Release Date
                          </Label>

                          <div className="relative">
                            <Input
                              type="date"
                              placeholder="Release Date"
                              className="custom-content-input white-calendar"
                              {...register(
                                `season_update.${seasonIndex}.release_date`,
                                {
                                  required: "Release date is required",
                                }
                              )}
                              defaultValue={
                                season?.release_date
                                  ? new Date(season.release_date)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                            />
                          </div>

                          {errors?.season_update?.[seasonIndex]
                            ?.release_date && (
                            <p className="error-msg">
                              {
                                errors.season_update[seasonIndex].release_date
                                  ?.message as string
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="custom-label mb-3">
                            Season Thumbnail
                          </Label>
                          <Controller
                            name={`season_update.${seasonIndex}.season_thumbnail`}
                            rules={{
                              validate: {
                                isImage: (file: File | null) => {
                                  if (!file) return true;
                                  return (
                                    file.type.startsWith("image/") ||
                                    "Only image files are allowed"
                                  );
                                },
                              },
                            }}
                            control={control}
                            render={({
                              field: controllerField,
                              fieldState,
                            }) => (
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

                                <p className="text-gray-400 text-sm mt-1 break-all">
                                  {season?.season_thumbnail as string}
                                </p>
                                {fieldState.error && (
                                  <p className="error-msg">
                                    {fieldState.error.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>

                        <DeleteSeason id={season?.id} refetch={refetch} />
                      </div>

                      {season.episodes?.map((item, index) => (
                        <div
                          key={item.id}
                          className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 relative border border-gray3-bg p-2"
                        >
                          <Input
                            hidden
                            placeholder="Episode"
                            className="custom-content-input"
                            {...register(`episode_update.${index}.id`, {
                              required: "Episode id is required",
                            })}
                            defaultValue={item?.id}
                          />

                          <div>
                            <Label className="custom-label mb-3">
                              Episode Name
                            </Label>
                            <Input
                              placeholder="Episode name"
                              className="custom-content-input"
                              {...register(`episode_update.${index}.title`, {
                                required: "Episode name is required",
                              })}
                              defaultValue={item?.title}
                            />
                            {errors?.episode_update?.[index]?.title && (
                              <p className="error-msg">
                                {
                                  errors.episode_update[index].title
                                    ?.message as string
                                }
                              </p>
                            )}
                          </div>

                          <div>
                            <Label className="custom-label mb-3">
                              Episode Number
                            </Label>
                            <Input
                              type="number"
                              placeholder="Episode number"
                              className="custom-content-input"
                              {...register(
                                `episode_update.${index}.episode_number`,
                                {
                                  required: "Episode number is required",
                                }
                              )}
                              defaultValue={item?.episode_number}
                            />
                            {errors?.episode_update?.[index]
                              ?.episode_number && (
                              <p className="error-msg">
                                {
                                  errors.episode_update[index].episode_number
                                    ?.message as string
                                }
                              </p>
                            )}
                          </div>

                          <div>
                            <Label className="custom-label mb-3">
                              Duration (minute)
                            </Label>
                            <Input
                              type="number"
                              step="any"
                              placeholder="Duration"
                              className="custom-content-input"
                              {...register(`episode_update.${index}.duration`, {
                                required: "Duration is required",
                              })}
                              defaultValue={ConvertToMinute(
                                Number(item?.duration)
                              )}
                            />
                            {errors?.episode_update?.[index]?.duration && (
                              <p className="error-msg">
                                {
                                  errors.episode_update[index].duration
                                    ?.message as string
                                }
                              </p>
                            )}
                          </div>

                          <div>
                            <Label className="custom-label mb-3">
                              Episode File
                            </Label>
                            <Controller
                              name={`episode_update.${index}.episode_videos`}
                              rules={{
                                validate: {
                                  isVideo: (file: File | null) => {
                                    if (!file) return true;

                                    return (
                                      file.type.startsWith("video/") ||
                                      "Only video files are allowed"
                                    );
                                  },
                                },
                              }}
                              control={control}
                              render={({
                                field: controllerField,
                                fieldState,
                              }) => (
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

                                  <p className="text-gray-400 text-sm mt-1 break-all">
                                    {item?.episode_videos as string}
                                  </p>

                                  {fieldState.error && (
                                    <p className="error-msg">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>

                          <div>
                            <Label className="custom-label mb-3">
                              Episode Thumbnail
                            </Label>
                            <Controller
                              name={`episode_update.${index}.episode_thumbnails`}
                              rules={{
                                validate: {
                                  isImage: (file: File | null) => {
                                    if (!file) return true;
                                    return (
                                      file.type.startsWith("image/") ||
                                      "Only image files are allowed"
                                    );
                                  },
                                },
                              }}
                              control={control}
                              render={({
                                field: controllerField,
                                fieldState,
                              }) => (
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
                                  <p className="text-gray-400 text-sm mt-1 break-all">
                                    {item?.episode_thumbnails as string}
                                  </p>
                                  {fieldState.error && (
                                    <p className="error-msg">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>

                          <div>
                            <Label className="custom-label mb-3">
                              Description
                            </Label>
                            <Input
                              placeholder="Description"
                              className="custom-content-input"
                              {...register(
                                `episode_update.${index}.description`
                              )}
                              defaultValue={item.description}
                            />
                          </div>

                          <DeleteEpisode
                            id={item?.id}
                            refetch={refetch}
                            onSuccess={() => removeEpisodeFromForm(item.id)}
                          />
                        </div>
                      ))}

                      <Link
                        href={`/dashboard/film-management/series/season/episode/${season?.id}`}
                        className="flex items-center gap-1 bg-primary-color text-white text-base py-2 px-2.5 rounded cursor-pointer w-fit"
                      >
                        <Plus className="w-5 h-5" />
                      </Link>
                    </div>
                  ))
                : null}

              {/* Only Episode */}
              {movieData?.episodes && movieData?.episodes?.length > 0
                ? movieData?.episodes.map((item, index) => (
                    <>
                      <div
                        key={item.id}
                        className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 relative border border-gray3-bg p-2"
                      >
                        <Input
                          hidden
                          placeholder="Episode"
                          className="custom-content-input"
                          {...register(`episode_update.${index}.id`, {
                            required: "Episode id is required",
                          })}
                          defaultValue={item?.id}
                        />

                        <div>
                          <Label className="custom-label mb-3">
                            Episode Name
                          </Label>
                          <Input
                            placeholder="Episode name"
                            className="custom-content-input"
                            {...register(`episode_update.${index}.title`, {
                              required: "Episode name is required",
                            })}
                            defaultValue={item?.title}
                          />
                          {errors?.episode_update?.[index]?.title && (
                            <p className="error-msg">
                              {
                                errors.episode_update[index].title
                                  ?.message as string
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="custom-label mb-3">
                            Episode Number
                          </Label>
                          <Input
                            type="number"
                            placeholder="Episode number"
                            className="custom-content-input"
                            {...register(
                              `episode_update.${index}.episode_number`,
                              {
                                required: "Episode number is required",
                              }
                            )}
                            defaultValue={item?.episode_number}
                          />
                          {errors?.episode_update?.[index]?.episode_number && (
                            <p className="error-msg">
                              {
                                errors.episode_update[index].episode_number
                                  ?.message as string
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="custom-label mb-3">
                            Duration (minute)
                          </Label>
                          <Input
                            type="number"
                            step="any"
                            placeholder="Duration"
                            className="custom-content-input"
                            {...register(`episode_update.${index}.duration`, {
                              required: "Duration is required",
                            })}
                            defaultValue={ConvertToMinute(
                              Number(item?.duration)
                            )}
                          />
                          {errors?.episode_update?.[index]?.duration && (
                            <p className="error-msg">
                              {
                                errors.episode_update[index].duration
                                  ?.message as string
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="custom-label mb-3">
                            Episode File
                          </Label>
                          <Controller
                            name={`episode_update.${index}.episode_videos`}
                            rules={{
                              validate: {
                                isVideo: (file: File | null) => {
                                  if (!file) return true;

                                  return (
                                    file.type.startsWith("video/") ||
                                    "Only video files are allowed"
                                  );
                                },
                              },
                            }}
                            control={control}
                            render={({
                              field: controllerField,
                              fieldState,
                            }) => (
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

                                <p className="text-gray-400 text-sm mt-1 break-all">
                                  {item?.episode_videos as string}
                                </p>
                                {fieldState.error && (
                                  <p className="error-msg">
                                    {fieldState.error.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>

                        <div>
                          <Label className="custom-label mb-3">
                            Episode Thumbnail
                          </Label>
                          <Controller
                            name={`episode_update.${index}.episode_thumbnails`}
                            rules={{
                              validate: {
                                isImage: (file: File | null) => {
                                  if (!file) return true;
                                  return (
                                    file.type.startsWith("image/") ||
                                    "Only image files are allowed"
                                  );
                                },
                              },
                            }}
                            control={control}
                            render={({
                              field: controllerField,
                              fieldState,
                            }) => (
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
                                <p className="text-gray-400 text-sm mt-1 break-all">
                                  {item?.episode_thumbnails as string}
                                </p>

                                {fieldState.error && (
                                  <p className="error-msg">
                                    {fieldState.error.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>

                        <div>
                          <Label className="custom-label mb-3">
                            Description
                          </Label>
                          <Input
                            placeholder="Description"
                            className="custom-content-input"
                            {...register(`episode_update.${index}.description`)}
                            defaultValue={item.description}
                          />
                        </div>

                        <DeleteEpisode
                          id={item?.id}
                          refetch={refetch}
                          onSuccess={() => removeEpisodeFromForm(item.id)}
                        />
                      </div>
                    </>
                  ))
                : null}

              {/* Add New Season & Episode Button */}
              <div className="flex flex-wrap items-center gap-3">
                {movieData?.seasons?.length > 0 && (
                  <Link
                    href={`/dashboard/film-management/series/season/${movieData?.id}`}
                    className="flex items-center gap-1 bg-primary-color text-white text-base py-2 px-2.5 rounded cursor-pointer w-fit"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add New Season</span>
                  </Link>
                )}

                {movieData?.seasons?.length == 0 && (
                  <Link
                    href={`/dashboard/film-management/series/episode/${movieData?.id}`}
                    className="flex items-center gap-1 bg-primary-color text-white text-base py-2 px-2.5 rounded cursor-pointer w-fit"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add New Episode</span>
                  </Link>
                )}
              </div>

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
                        validate: {
                          isVideo: (value: File | string | null) => {
                            if (!value || typeof value === "string")
                              return true;

                            return value.type.startsWith("video/")
                              ? true
                              : "Only video files are allowed";
                          },
                        },
                      })}
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      {(movieData?.series_trailer as string) || ""}
                    </p>
                    {errors.trailer && (
                      <p className="error-msg">
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
                            {thumbnail
                              ? typeof thumbnail === "string"
                                ? thumbnail
                                : thumbnail.name
                              : "No file chosen"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <input
                      type="hidden"
                      {...register("thumbnailImg", {
                        validate: (value: File | string | null) => {
                          if (!value || typeof value === "string") return true;
                          return (
                            value.type.startsWith("image/") ||
                            "Only image files are allowed"
                          );
                        },
                      })}
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      {(movieData?.series_thumbnail as string) || ""}
                    </p>
                    {errors.thumbnailImg && (
                      <p className="error-msg">
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
      )}
    </>
  );
}
