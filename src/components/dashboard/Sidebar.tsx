"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, UserPlus, Calendar, CheckSquare, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Recruitment",
        href: "/recruitment",
        icon: UserPlus,
    },
    {
        title: "Employees",
        href: "/employees",
        icon: Users,
    },
    {
        title: "Attendance",
        href: "/attendance",
        icon: Calendar,
    },
    {
        title: "Tasks",
        href: "/tasks",
        icon: CheckSquare,
    },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className, ...props }: SidebarProps) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 md:hidden p-2 bg-primary text-primary-foreground rounded-md shadow-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 md:translate-x-0 md:static",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    className
                )}
                {...props}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-sidebar-border">
                        <h1 className="text-2xl font-bold text-sidebar-foreground">DEXAZ EMS</h1>
                    </div>
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.title === "Dashboard" ? "/" : item.href} // Temporary mapping for dashboard to root for now or explicit route
                                // Actually, let's map Dashboard to /
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                    pathname === item.href || (item.href === "/dashboard" && pathname === "/")
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <item.icon size={20} />
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-sidebar-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground font-bold">
                                AD
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-sidebar-foreground">Admin User</p>
                                <p className="text-xs text-muted-foreground">admin@dexaz.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
