"use client"

import * as React from "react"
import { Candidate, candidates as initialCandidates } from "@/lib/data"
import { CandidateCard } from "./CandidateCard"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"

const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'] as const

export function KanbanBoard() {
    const [items, setItems] = React.useState<Candidate[]>(initialCandidates)
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const sourceStage = result.source.droppableId
        const destStage = result.destination.droppableId
        const draggableId = result.draggableId

        if (sourceStage === destStage) {
            // Reordering within same column (not implemented for simplicity in mock, just visual)
            return
        }

        // Update item stage
        setItems((prev) =>
            prev.map(item =>
                item.id === draggableId
                    ? { ...item, stage: destStage as any }
                    : item
            )
        )
    }

    if (!isMounted) return <div className="p-4 text-muted-foreground">Loading board...</div>

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full gap-4 overflow-x-auto pb-4">
                {stages.map((stage) => (
                    <div key={stage} className="flex-1 min-w-[250px] flex flex-col bg-muted/40 rounded-xl p-3 border border-border/50">
                        <h3 className="font-semibold text-sm mb-3 px-1 flex items-center justify-between">
                            {stage}
                            <span className="bg-muted text-muted-foreground text-xs py-0.5 px-2 rounded-full">
                                {items.filter(i => i.stage === stage).length}
                            </span>
                        </h3>

                        <Droppable droppableId={stage}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`flex-1 min-h-[100px] transition-colors rounded-lg ${snapshot.isDraggingOver ? "bg-muted/60" : ""}`}
                                >
                                    {items
                                        .filter((item) => item.stage === stage)
                                        .map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{ ...provided.draggableProps.style }}
                                                    >
                                                        <CandidateCard candidate={item} isDragging={snapshot.isDragging} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    )
}
