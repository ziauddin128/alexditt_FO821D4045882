"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import EditMovie from "@/components/pages/film-management/movie/EditMovie";

export default function EditMoviePage({ params }: { params: any }) {
  const id = params?.id;

  const router = useRouter();

  // Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ["movieDet", id],
    queryFn: async () => {
      try {
        const res = await privateAxios.get(`/admin/movie/${id}`);
        return res.data;
      } catch (err: any) {
        router.push("/dashboard/film-management");
      }
    },
  });

  return <EditMovie movieData={data?.data} isLoading={isLoading} />;
}
