import { Employee } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Mail, Briefcase, Building2 } from "lucide-react"

interface EmployeeCardProps {
    employee: Employee
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
    return (
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col gap-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground overflow-hidden">
                        {/* Fallback avatar if url is mock */}
                        {employee.avatar_url.startsWith('/') ? employee.full_name.charAt(0) : <img src={employee.avatar_url} alt={employee.full_name} />}
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">{employee.full_name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Briefcase size={12} /> {employee.role}
                        </p>
                    </div>
                </div>
                <span className={cn(
                    "px-2 py-1 text-xs rounded-full font-medium",
                    employee.status === 'Active' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                    employee.status === 'Offline' && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
                    employee.status === 'On Leave' && "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                )}>
                    {employee.status}
                </span>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={14} />
                    <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 size={14} />
                    <span>{employee.department}</span>
                </div>
            </div>
        </div>
    )
}
