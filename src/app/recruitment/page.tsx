"use client"

import { KanbanBoard } from "@/components/recruitment/KanbanBoard"
import { Plus } from "lucide-react"

export default function RecruitmentPage() {
    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Recruitment</h1>
                    <p className="text-muted-foreground">Manage job applications and candidate pipeline.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    <Plus size={16} />
                    Add Candidate
                </button>
            </div>

            <div className="flex-1 min-h-0">
                <KanbanBoard />
            </div>
        </div>
    )
}
