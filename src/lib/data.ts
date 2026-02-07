import { createClient } from './supabase'

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
    type: 'Sick' | 'Casual' | 'Vacation'
    start_date: string
    end_date: string
    status: 'Pending' | 'Approved' | 'Rejected'
    reason: string
}

export type Task = {
    id: string
    title: string
    assigned_to: string // Storing name directly for simplicity in this phase
    status: 'To Do' | 'In Progress' | 'Done'
    priority: 'Low' | 'Medium' | 'High'
    due_date: string
}

// Mock Data (Fallback)
const mockEmployees: Employee[] = [
    { id: '1', full_name: 'Alice Johnson', email: 'alice@dexaz.com', role: 'Admin', department: 'Management', status: 'Active', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', joined_at: '2023-01-15' },
    { id: '2', full_name: 'Bob Smith', email: 'bob@dexaz.com', role: 'Manager', department: 'Engineering', status: 'Active', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', joined_at: '2023-03-10' },
    { id: '3', full_name: 'Charlie Brown', email: 'charlie@dexaz.com', role: 'Employee', department: 'Design', status: 'Offline', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', joined_at: '2023-06-20' },
    { id: '4', full_name: 'Diana Prince', email: 'diana@dexaz.com', role: 'Employee', department: 'Marketing', status: 'On Leave', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana', joined_at: '2023-08-01' },
]

const mockCandidates: Candidate[] = [
    { id: '1', full_name: 'John Doe', email: 'john@example.com', role: 'Frontend Developer', stage: 'Applied', applied_at: '2023-10-25' },
    { id: '2', full_name: 'Jane Smith', email: 'jane@example.com', role: 'Product Manager', stage: 'Screening', applied_at: '2023-10-26' },
]

const mockLeaves: LeaveRequest[] = [
    { id: '1', employee_id: '4', type: 'Sick', start_date: '2023-10-27', end_date: '2023-10-29', status: 'Approved', reason: 'Flu' },
]

const mockTasks: Task[] = [
    { id: '1', title: 'Update Landing Page', assigned_to: 'Bob Smith', status: 'In Progress', priority: 'High', due_date: '2023-10-30' },
]

// Data Fetchers
export async function getEmployees(): Promise<Employee[]> {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.from('employees').select('*')
        if (error || !data) throw error
        return data as Employee[]
    } catch (e) {
        console.warn('Failed to fetch from Supabase, using mock data', e)
        return mockEmployees
    }
}

export async function getCandidates(): Promise<Candidate[]> {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.from('candidates').select('*')
        if (error || !data) throw error
        return data as Candidate[]
    } catch (e) {
        console.warn('Failed to fetch from Supabase, using mock data', e)
        return mockCandidates
    }
}

export async function getLeaves(): Promise<LeaveRequest[]> {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.from('leaves').select('*')
        if (error || !data) throw error
        return data as LeaveRequest[]
    } catch (e) {
        console.warn('Failed to fetch from Supabase, using mock data', e)
        return mockLeaves
    }
}

export async function getTasks(): Promise<Task[]> {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.from('tasks').select('*')
        if (error || !data) throw error
        return data as Task[]
    } catch (e) {
        console.warn('Failed to fetch from Supabase, using mock data', e)
        return mockTasks
    }
}

// Temporary export of mock data for components that haven't been refactored to async yet
// This ensures the app doesn't break while we refactor components
export const employees = mockEmployees
export const candidates = mockCandidates
export const leaves = mockLeaves
export const tasks = mockTasks
