export type Employee = {
    id: string
    full_name: string
    email: string
    role: 'Admin' | 'Manager' | 'Employee'
    department: string
    status: 'Active' | 'Offline' | 'On Leave'
    avatar_url: string
    joined_at: string
}

export type Candidate = {
    id: string
    full_name: string
    email: string
    role: string
    stage: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired'
    applied_at: string
}

export type LeaveRequest = {
    id: string
    employee_id: string
    employee_name: string
    type: 'Sick' | 'Casual' | 'Vacation'
    start_date: string
    end_date: string
    status: 'Pending' | 'Approved' | 'Rejected'
    reason: string
}

export type Task = {
    id: string
    title: string
    assigned_to: string // Employee Name for simplicity in mock
    status: 'To Do' | 'In Progress' | 'Done'
    priority: 'Low' | 'Medium' | 'High'
    due_date: string
}

// Mock Data
export const employees: Employee[] = [
    {
        id: '1',
        full_name: 'Alice Johnson',
        email: 'alice@dexaz.com',
        role: 'Admin',
        department: 'Management',
        status: 'Active',
        avatar_url: '/avatars/01.png',
        joined_at: '2023-01-15',
    },
    {
        id: '2',
        full_name: 'Bob Smith',
        email: 'bob@dexaz.com',
        role: 'Manager',
        department: 'Engineering',
        status: 'Active',
        avatar_url: '/avatars/02.png',
        joined_at: '2023-03-10',
    },
    {
        id: '3',
        full_name: 'Charlie Brown',
        email: 'charlie@dexaz.com',
        role: 'Employee',
        department: 'Design',
        status: 'Offline',
        avatar_url: '/avatars/03.png',
        joined_at: '2023-06-20',
    },
    {
        id: '4',
        full_name: 'Diana Prince',
        email: 'diana@dexaz.com',
        role: 'Employee',
        department: 'Marketing',
        status: 'On Leave',
        avatar_url: '/avatars/04.png',
        joined_at: '2023-08-01',
    },
    {
        id: '5',
        full_name: 'Evan Wright',
        email: 'evan@dexaz.com',
        role: 'Employee',
        department: 'Engineering',
        status: 'Active',
        avatar_url: '/avatars/05.png',
        joined_at: '2023-09-12',
    },
]

export const candidates: Candidate[] = [
    { id: '1', full_name: 'John Doe', email: 'john@example.com', role: 'Frontend Developer', stage: 'Applied', applied_at: '2023-10-25' },
    { id: '2', full_name: 'Jane Smith', email: 'jane@example.com', role: 'Product Manager', stage: 'Screening', applied_at: '2023-10-26' },
    { id: '3', full_name: 'Mike Ross', email: 'mike@example.com', role: 'Backend Developer', stage: 'Interview', applied_at: '2023-10-20' },
    { id: '4', full_name: 'Rachel Zane', email: 'rachel@example.com', role: 'Legal Advisor', stage: 'Offer', applied_at: '2023-10-15' },
    { id: '5', full_name: 'Harvey Specter', email: 'harvey@example.com', role: 'Senior Counsel', stage: 'Hired', applied_at: '2023-10-01' },
]

export const leaves: LeaveRequest[] = [
    { id: '1', employee_id: '4', employee_name: 'Diana Prince', type: 'Sick', start_date: '2023-10-27', end_date: '2023-10-29', status: 'Approved', reason: 'Flu' },
    { id: '2', employee_id: '3', employee_name: 'Charlie Brown', type: 'Vacation', start_date: '2023-11-01', end_date: '2023-11-10', status: 'Pending', reason: 'Family trip' },
]

export const tasks: Task[] = [
    { id: '1', title: 'Update Landing Page', assigned_to: 'Bob Smith', status: 'In Progress', priority: 'High', due_date: '2023-10-30' },
    { id: '2', title: 'Fix API Bug', assigned_to: 'Evan Wright', status: 'To Do', priority: 'Medium', due_date: '2023-11-02' },
    { id: '3', title: 'Design New Logo', assigned_to: 'Charlie Brown', status: 'Done', priority: 'Low', due_date: '2023-10-20' },
]
