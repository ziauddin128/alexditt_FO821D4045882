"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import AddSeasonEpisode from "@/components/pages/film-management/series/AddSeasonEpisode";
import { useEffect } from "react";

export default function ManageSeasonEpisodePage() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();

  // Fetch Data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["movieDet", id],
    queryFn: async () => {
      try {
        const res = await privateAxios.get(`/admin/series/season/${id}`);
        return res.data;
      } catch (err: any) {
        router.push("/dashboard/film-management");
      }
    },
  });

  // Redirect when no data found
  useEffect(() => {
    if (isLoading) return;
    if (!data?.success) {
      router.push("/dashboard/film-management");
    }
  }, [data, isLoading, router]);

  return (
    <AddSeasonEpisode
      movieData={data?.data}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
}
