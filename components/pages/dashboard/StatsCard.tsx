import ChartIcon from "@/components/icons/ChartIcon";
import CurrencyDollar from "@/components/icons/CurrencyDollar";
import User from "@/components/icons/User";
import React from "react";

interface StatCard {
  icon: React.ReactNode;
  title: string;
  count: string | number;
}

export default function StatsCard() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <StatCard
        icon={<User className="h-6 w-6" />}
        title="Total Users"
        count="20.8K"
      />
      {/* <StatCard
        icon={<CurrencyDollar className="h-6 w-6" />}
        title="Active subscriptions"
        count="14.5K"
      /> */}
      <StatCard
        icon={<ChartIcon className="h-6 w-6" />}
        title="Total Video"
        count="8.2K"
      />
    </section>
  );
}

const StatCard = ({ icon, title, count }: StatCard) => {
  return (
    <div className="flex flex-col items-center gap-y-4 border border-[#1B202C] [background:linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(45,157,255,0.15)_100%)] py-8 px-4 rounded-lg">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm">{title}</p>
      </div>
      <h3 className="text-[32px] font-medium">{count}</h3>
    </div>
  );
};
