"use client";
import React, { useState } from "react";
import LoadingSpinner from "@/app/(dashboard)/loading";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Plus } from "lucide-react";

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

export default function AddSeason({
  movieData,
  isLoading,
  refetch,
}: {
  movieData: Inputs;
  isLoading: boolean;
  refetch: () => void;
}) {
  const [isSeries, setIsSeries] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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

  // For series
  const {
    fields: seriesFields,
    append: appendSeries,
    remove: removeSeries,
  } = useFieldArray({
    control,
    name: "series",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSubmitLoading(true);
    console.log("Submitted Data", data);
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
            {/* Season Mode */}
            <div className="flex items-center gap-2">
              <Checkbox
                className="data-[state=checked]:bg-primary-color h-5 w-5 cursor-pointer"
                id="season-mode"
                checked={isSeries}
                onCheckedChange={(checked) => {
                  const value = checked === true;
                  setIsSeries(value);
                  setValue("season_mode", value, { shouldValidate: true });
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
                  <Label className="custom-label mb-3">
                    Duration (seconds)
                  </Label>
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
              className="flex items-center gap-1 bg-primary-color text-white text-base py-2 px-2.5 rounded cursor-pointer w-fit"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Episode</span>
            </button>

            <div className="space-y-6">
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
