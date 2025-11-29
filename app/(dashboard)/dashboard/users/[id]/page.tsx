"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import PersonalInfo from "@/components/pages/users/PersonalInfo";
import Subscription from "@/components/pages/users/Subscription";
import Payments from "@/components/pages/users/Payments";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useRouter } from "next/navigation";

export default function UserDetails({ params }: { params: any }) {
  const id = params?.id;

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

  /* const tabs = [
    { name: "Personal Info", value: "personal-info" },
    { name: "Subscription", value: "subscription" },
    { name: "Payments", value: "payments" },
  ]; */

  // const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <>
      <PersonalInfo userDet={userDet?.data} isLoading={isLoading} />

      {/* <div className="my-4">
        <Tabs defaultValue="personal-info" className="usersTab">
          <TabsList className="bg-transparent w-full sm:w-fit overflow-x-auto tabs_wrapper">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-xs sm:text-sm font-medium whitespace-nowrap border-0 border-b transition-all duration-300 text-white cursor-pointer ${
                  activeTab === tab.value
                    ? "border-primary-color"
                    : "border-transparent"
                }`}
                style={{ padding: "10px 16px", borderRadius: "0" }}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-2">
            <TabsContent value="personal-info" className="space-y-4">
              <PersonalInfo userDet={userDet} />
            </TabsContent>
            <TabsContent value="subscription" className="space-y-4">
              <Subscription />
            </TabsContent>
            <TabsContent value="payments" className="space-y-4">
              <Payments />
            </TabsContent>
          </div>
        </Tabs>
      </div> */}
    </>
  );
}
