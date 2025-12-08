"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import EditSeries from "@/components/pages/film-management/series/EditSeries";

export default function EditSeriesPage({ params }: { params: any }) {
  const id = params?.id;

  const router = useRouter();

  // Fetch Data
  const { data, isLoading } = useQuery({
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

  return <EditSeries movieData={data?.data} isLoading={isLoading} />;
}
