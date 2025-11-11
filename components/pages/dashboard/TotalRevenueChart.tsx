"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Dot } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, TrendingUp } from "lucide-react"

const chartData = [
  { month: "Jan", revenue: 10, expenses: 15 },
  { month: "Feb", revenue: 25, expenses: 35 },
  { month: "Mar", revenue: 45, expenses: 20 },
  { month: "Apr", revenue: 55, expenses: 25 },
  { month: "May", revenue: 50, expenses: 95 },
  { month: "Jun", revenue: 125.2, expenses: 75 },
  { month: "Jul", revenue: 85, expenses: 190 },
  { month: "Aug", revenue: 90, expenses: 85 },
  { month: "Sep", revenue: 180, expenses: 65 },
  { month: "Oct", revenue: 200, expenses: 45 },
  { month: "Nov", revenue: 220, expenses: 75 },
  { month: "Dec", revenue: 250, expenses: 95 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(280, 100%, 70%)",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(220, 100%, 60%)",
  },
} satisfies ChartConfig

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props
  if (payload && payload.month === "Jun") {
    return <Dot cx={cx} cy={cy} r={6} fill="hsl(280, 100%, 70%)" stroke="hsl(280, 100%, 70%)" strokeWidth={2} />
  }
  return null
}

export function RevenueChart() {
  return (
    <Card className="w-full bg-[#131824] border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-normal text-slate-200">Total revenue</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-white">$240.8K</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+28.4%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(280,100%,70%)]" />
              <span className="text-sm text-slate-400">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(220,100%,60%)]" />
              <span className="text-sm text-slate-400">Expenses</span>
            </div>
          </div>

          {/* Date Range Selector */}
          <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50">
            <Calendar className="h-4 w-4 mr-2" />
            Jan 2025 - Dec 2025
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(280, 100%, 70%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(280, 100%, 70%)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(220, 100%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(220, 100%, 60%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              {/* <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 25%)" horizontal={true} vertical={false} /> */}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 25%, 50%)", fontSize: 12 }}
                className="text-xs"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 25%, 50%)", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                domain={[0, 250]}
                ticks={[0, 25, 50, 100, 150, 200, 250]}
              />
              <ChartTooltip />
              <Area
                dataKey="expenses"
                type="monotone"
                fill="url(#fillExpenses)"
                fillOpacity={1}
                stroke="hsl(220, 100%, 60%)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="revenue"
                type="monotone"
                fill="url(#fillRevenue)"
                fillOpacity={1}
                stroke="hsl(280, 100%, 70%)"
                strokeWidth={2}
                dot={<CustomDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
