"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import AddEpisode from "@/components/pages/film-management/series/AddEpisode";

export default function ManageEpisodePage() {
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

  return (
    <AddEpisode
      movieData={data?.data}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
}
