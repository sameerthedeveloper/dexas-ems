"use client"

import * as React from "react"
import { leaves } from "@/lib/data"
import { Clock, CalendarCheck, MapPin, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AttendancePage() {
    const [isCheckedIn, setIsCheckedIn] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState(new Date())

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Attendance & Leave</h1>
                <p className="text-muted-foreground">Track your work hours and manage leave requests.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Check-in Card */}
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center text-center space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-mono font-bold tracking-widest text-foreground">
                            {currentTime.toLocaleTimeString([], { hour12: false })}
                        </h2>
                        <p className="text-muted-foreground">
                            {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    <div className="w-40 h-40 rounded-full bg-muted/30 flex items-center justify-center relative">
                        <button
                            onClick={() => setIsCheckedIn(!isCheckedIn)}
                            className={cn(
                                "w-32 h-32 rounded-full shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-1 font-bold text-lg",
                                isCheckedIn
                                    ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30"
                                    : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30"
                            )}
                        >
                            {isCheckedIn ? "Check Out" : "Check In"}
                            <span className="text-xs font-normal opacity-80">{isCheckedIn ? "Stop Timer" : "Start Timer"}</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            Remote Office
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            08:00 AM - 05:00 PM
                        </div>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="space-y-4">
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <CalendarCheck className="text-primary" />
                            Leave Balance
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                                <div className="text-xs text-muted-foreground">Casual</div>
                            </div>
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">8</div>
                                <div className="text-xs text-muted-foreground">Sick</div>
                            </div>
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">15</div>
                                <div className="text-xs text-muted-foreground">Vacation</div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-3 rounded-xl border border-dashed border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors flex items-center justify-center gap-2">
                        + Apply for Leave
                    </button>
                </div>
            </div>

            {/* Leave History */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h3 className="font-semibold">Recent Activity</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Type</th>
                                <th className="px-6 py-3 font-medium">Dates</th>
                                <th className="px-6 py-3 font-medium">Reason</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {leaves.map((leave) => (
                                <tr key={leave.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-medium">{leave.type}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{leave.start_date} - {leave.end_date}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{leave.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                            leave.status === 'Approved' && "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
                                            leave.status === 'Pending' && "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
                                            leave.status === 'Rejected' && "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
                                        )}>
                                            {leave.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
