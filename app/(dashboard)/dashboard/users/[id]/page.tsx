"use client";

import PersonalInfo from "@/components/pages/users/PersonalInfo";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useParams, useRouter } from "next/navigation";

export default function UserDetails() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();

  // Fetch Data
  const { data: userDet, isLoading } = useQuery({
    queryKey: ["userDet", id],
    queryFn: async () => {
      const res = await privateAxios.get(`/admin/user/user-view/${id}`);
      return res.data;
    },
  });

  if (userDet?.data === null) {
    router.push("/dashboard/users");
  }

  return (
    <>
      <PersonalInfo userDet={userDet?.data} isLoading={isLoading} />
    </>
  );
}
