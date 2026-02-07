"use client"

import * as React from "react"
import { getEmployees } from "@/lib/data"
import { EmployeeCard } from "@/components/employees/EmployeeCard"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

export default function EmployeesPage() {
    const [searchTerm, setSearchTerm] = React.useState("")

    const { data: employees = [], isLoading } = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployees
    })

    const filteredEmployees = employees.filter(employee =>
        employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
                    <p className="text-muted-foreground">Manage your team directory.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground">Loading employees...</div>
                ) : (
                    <>
                        {filteredEmployees.map((employee) => (
                            <EmployeeCard key={employee.id} employee={employee} />
                        ))}
                        {filteredEmployees.length === 0 && (
                            <div className="col-span-full py-12 text-center text-muted-foreground">
                                No employees found matching "{searchTerm}"
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
