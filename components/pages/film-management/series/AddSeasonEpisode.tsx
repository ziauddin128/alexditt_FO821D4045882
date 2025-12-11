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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { privateAxios } from "@/components/axiosInstance/axios";
import ConvertToSeconds from "@/hooks/convertToSecond";

type Inputs = {
  id: string;
  title: string;
  series: {
    episode_name: string;
    episode_number: number;
    episode_duration: string;
    episode_file: File | null;
    episode_thumbnail: File | null;
    episode_description: string;
  }[];
};

export default function AddSeasonEpisode({
  movieData,
  isLoading,
  refetch,
}: {
  movieData: Inputs;
  isLoading: boolean;
  refetch: () => void;
}) {
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
          episode_number: undefined,
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

    try {
      const formData = new FormData();

      // Episodes
      const episodeArray = data.series.map((episode: any, i: number) => ({
        key: `ep${i}`,
        episode_number: Number(episode.episode_number),
        title: episode.episode_name,
        description: episode.episode_description,
        duration: String(ConvertToSeconds(episode.episode_duration)),
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
      /* formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      return; */

      const response = await privateAxios.post(
        `/admin/series/episodes/?seasonId=${movieData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      reset();
      toast.success("Season episode added successfully!");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong!";
      throw new Error(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6"
          >
            <h1 className="text-3xl font-medium">Season: {movieData?.title}</h1>

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
                    type="number"
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
                  <Label className="custom-label mb-3">Duration (minute)</Label>
                  <Input
                    type="number"
                    step="any"
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
                  episode_number: 0,
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
