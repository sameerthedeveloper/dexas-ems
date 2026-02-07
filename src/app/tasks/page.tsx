"use client"

import * as React from "react"
import { tasks } from "@/lib/data"
import { CheckCircle2, Clock, Circle, Plus, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const statusConfig = {
    'To Do': { icon: Circle, color: 'text-slate-500', bg: 'bg-slate-50 dark:bg-slate-900/50', border: 'border-slate-200 dark:border-slate-800' },
    'In Progress': { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
    'Done': { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' },
}

export default function TasksPage() {
    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                    <p className="text-muted-foreground">Assign and track team tasks.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    <Plus size={16} />
                    New Task
                </button>
            </div>

            <div className="flex-1 grid md:grid-cols-3 gap-6 overflow-hidden">
                {Object.entries(statusConfig).map(([status, config]) => (
                    <div key={status} className={cn("flex flex-col rounded-xl border h-full overflow-hidden", config.bg, config.border)}>
                        <div className={cn("p-4 border-b flex items-center justify-between", config.border)}>
                            <div className="flex items-center gap-2 font-semibold">
                                <config.icon className={cn("w-5 h-5", config.color)} />
                                {status}
                            </div>
                            <span className="bg-background text-muted-foreground text-xs py-0.5 px-2 rounded-full border border-border">
                                {tasks.filter(t => t.status === status).length}
                            </span>
                        </div>

                        <div className="flex-1 p-3 overflow-y-auto space-y-3">
                            {tasks.filter(t => t.status === status).map(task => (
                                <div key={task.id} className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-muted px-2 py-0.5 rounded text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                                            {task.priority} Priority
                                        </div>
                                    </div>
                                    <h4 className="font-medium text-sm mb-3 line-clamp-2 group-hover:text-primary transition-colors">{task.title}</h4>

                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                                {task.assigned_to.charAt(0)}
                                            </div>
                                            <span className="truncate max-w-[80px]">{task.assigned_to}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full py-2 rounded-lg border border-dashed border-border text-muted-foreground/50 hover:bg-background/50 hover:text-muted-foreground transition-colors text-sm flex items-center justify-center gap-1">
                                <Plus size={14} /> Add Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
