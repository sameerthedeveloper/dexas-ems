"use client"

import { Users, UserCheck, UserMinus, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { getEmployees, getLeaves } from "@/lib/data"

// Static chart data for now, but metrics can be dynamic
const attendanceData = [
  { day: "Mon", present: 135, absent: 7 },
  { day: "Tue", present: 138, absent: 4 },
  { day: "Wed", present: 132, absent: 10 },
  { day: "Thu", present: 140, absent: 2 },
  { day: "Fri", present: 128, absent: 14 },
]

const leaveData = [
  { name: "Sick", value: 4, color: "#ef4444" },
  { name: "Casual", value: 5, color: "#f97316" },
  { name: "Vacation", value: 3, color: "#3b82f6" },
]

export default function DashboardPage() {
  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: getEmployees })
  const { data: leaves = [] } = useQuery({ queryKey: ['leaves'], queryFn: getLeaves })

  const totalStaff = employees.length || 142
  const activeStaff = employees.filter(e => e.status === 'Active').length || 118
  const onLeave = employees.filter(e => e.status === 'On Leave').length || 12

  const metrics = [
    {
      title: "Total Staff",
      value: totalStaff.toString(),
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Live Presence",
      value: activeStaff.toString(),
      change: "+4%",
      trend: "up",
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      title: "On Leave",
      value: onLeave.toString(),
      change: "-2%",
      trend: "down",
      icon: UserMinus,
      color: "text-orange-500",
    },
    {
      title: "Performance",
      value: "94%",
      change: "+1.2%",
      trend: "up",
      icon: Activity,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your company metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              <metric.icon className={cn("h-4 w-4", metric.color)} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={cn("text-xs flex items-center gap-1", metric.trend === "up" ? "text-green-500" : "text-red-500")}>
                {metric.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Attendance Chart */}
        <div className="col-span-4 bg-card rounded-xl border border-border shadow-sm p-6">
          <div className="flex flex-col gap-2 mb-6">
            <h3 className="text-lg font-semibold">Attendance Overview</h3>
            <p className="text-sm text-muted-foreground">Daily office presence for the current week.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar
                  dataKey="present"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leave Breakdown */}
        <div className="col-span-3 bg-card rounded-xl border border-border shadow-sm p-6">
          <div className="flex flex-col gap-2 mb-6">
            <h3 className="text-lg font-semibold">On Leave Distribution</h3>
            <p className="text-sm text-muted-foreground">Breakdown of current leave types.</p>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leaveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            {leaveData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
