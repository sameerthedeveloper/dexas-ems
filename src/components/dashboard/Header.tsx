"use client"

import * as React from "react"
import { Bell, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <header className={cn("flex items-center justify-between px-6 py-4 bg-background border-b border-border", className)} {...props}>
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile menu placeholder space if needed, otherwise sidebar handles it */}
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-muted-foreground hover:text-foreground relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center overflow-hidden border border-border">
                    <User className="w-5 h-5 text-muted-foreground" />
                </div>
            </div>
        </header>
    )
}
