import { Candidate } from "@/lib/data"
import { cn } from "@/lib/utils"
// import { Draggable } from "@hello-pangea/dnd" // Parent will handle Draggable to keep this pure UI? No, usually Card is the Draggable.
// Actually, let's keep the Card visual and wrap it in Draggable in the Board for better separation OR put it here.
// Putting it here makes it tightly coupled to dnd.
// I will keep it pure UI and wrap it in the parent.

interface CandidateCardProps {
    candidate: Candidate
    isDragging?: boolean
}

export function CandidateCard({ candidate, isDragging }: CandidateCardProps) {
    return (
        <div className={cn(
            "bg-card p-3 rounded-lg border border-border shadow-sm mb-3 cursor-grab active:cursor-grabbing",
            isDragging && "opacity-50 ring-2 ring-primary rotate-2"
        )}>
            <h4 className="font-medium text-sm">{candidate.full_name}</h4>
            <p className="text-xs text-muted-foreground">{candidate.role}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{candidate.applied_at}</span>
            </div>
        </div>
    )
}
