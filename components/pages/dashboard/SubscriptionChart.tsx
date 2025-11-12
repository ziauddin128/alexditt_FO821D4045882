"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const data = [
  {
    day: "Sat",
    newSubscribers: 3,
    cancellations: 1,
  },
  {
    day: "Sun",
    newSubscribers: 18,
    cancellations: 4,
  },
  {
    day: "Mon",
    newSubscribers: 16,
    cancellations: 2,
  },
  {
    day: "Tue",
    newSubscribers: 24,
    cancellations: 6,
  },
  {
    day: "Wed",
    newSubscribers: 7,
    cancellations: 3,
  },
  {
    day: "Thu",
    newSubscribers: 20,
    cancellations: 8,
  },
  {
    day: "Fri",
    newSubscribers: 21,
    cancellations: 5,
  },
];

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-2">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-slate-400">
            {entry.value === "newSubscribers"
              ? "New Subscribers"
              : "Cancellations"}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SubscriptionGrowthChart() {
  return (
    <div className="bg-[#131824] rounded-lg p-4 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-medium text-white">
          Subscription Growth
        </h2>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="text-slate-400  hover:bg-slate-800 gap-2 border border-[#181818] outline-none shadow-none focus-visible:ring-0 focus-visible:border-0 cursor-pointer rounded">
              Last week
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer">
              Last week
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer">
              Last month
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer">
              Last quarter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 0,
              right: 10,
              left: -12,
              bottom: 0,
            }}
            barCategoryGap="28%"
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 25]}
              ticks={[0, 5, 10, 15, 20, 25]}
            />
            <Legend content={<CustomLegend />} />
            <Bar
              dataKey="newSubscribers"
              fill="#2d9dff"
              radius={[10, 10, 10, 10]}
              maxBarSize={40}
            />
            <Bar
              dataKey="cancellations"
              fill="#eb3d4d"
              radius={[10, 10, 10, 10]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
