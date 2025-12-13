"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import AddSeason from "@/components/pages/film-management/series/AddSeason";
import { useEffect } from "react";

export default function ManageSeasonPage() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();

  // Fetch Data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["movieDet", id],
    queryFn: async () => {
      try {
        const res = await privateAxios.get(`/admin/series/${id}`);
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
    <AddSeason movieData={data?.data} isLoading={isLoading} refetch={refetch} />
  );
}
