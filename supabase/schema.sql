-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- EMPLOYEES TABLE
create table if not exists employees (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null unique,
  role text not null check (role in ('Admin', 'Manager', 'Employee')),
  department text not null,
  status text not null check (status in ('Active', 'Offline', 'On Leave')),
  avatar_url text,
  joined_at timestamptz default now()
);

-- JOBS TABLE
create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  status text not null check (status in ('Open', 'Closed', 'Draft')),
  department text not null,
  created_at timestamptz default now()
);

-- CANDIDATES TABLE
create table if not exists candidates (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references jobs(id),
  full_name text not null,
  email text not null,
  role text not null, -- denormalized for simplicity in display
  stage text not null check (stage in ('Applied', 'Screening', 'Interview', 'Offer', 'Hired')),
  resume_url text,
  applied_at timestamptz default now()
);

-- LEAVES TABLE
create table if not exists leaves (
  id uuid primary key default uuid_generate_v4(),
  employee_id uuid references employees(id) not null,
  -- For display simplicity we might store name, but properly we join. keeping schema simple for the frontend app structure
  type text not null check (type in ('Sick', 'Casual', 'Vacation')),
  start_date date not null,
  end_date date not null,
  status text not null check (status in ('Pending', 'Approved', 'Rejected')),
  reason text,
  created_at timestamptz default now()
);

-- TASKS TABLE
create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  assigned_to_name text not null, -- Storing name directly for this demo phase vs relational User ID
  status text not null check (status in ('To Do', 'In Progress', 'Done')),
  priority text check (priority in ('Low', 'Medium', 'High')),
  due_date timestamptz,
  created_at timestamptz default now()
);

-- ENABLE RLS (Row Level Security)
alter table employees enable row level security;
alter table jobs enable row level security;
alter table candidates enable row level security;
alter table leaves enable row level security;
alter table tasks enable row level security;

-- CREATE POLICIES (Public access for demo purposes, replace with auth logic in production)
create policy "Allow public read access" on employees for select using (true);
create policy "Allow public read access" on jobs for select using (true);
create policy "Allow public read access" on candidates for select using (true);
create policy "Allow public read access" on leaves for select using (true);
create policy "Allow public read access" on tasks for select using (true);

-- SEED DATA
insert into employees (full_name, email, role, department, status, avatar_url, joined_at) values
('Alice Johnson', 'alice@dexaz.com', 'Admin', 'Management', 'Active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', '2023-01-15'),
('Bob Smith', 'bob@dexaz.com', 'Manager', 'Engineering', 'Active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', '2023-03-10'),
('Charlie Brown', 'charlie@dexaz.com', 'Employee', 'Design', 'Offline', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', '2023-06-20'),
('Diana Prince', 'diana@dexaz.com', 'Employee', 'Marketing', 'On Leave', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana', '2023-08-01');

insert into tasks (title, assigned_to_name, status, priority, due_date) values
('Update Landing Page', 'Bob Smith', 'In Progress', 'High', now() + interval '2 days'),
('Fix API Bug', 'Alice Johnson', 'To Do', 'Medium', now() + interval '5 days'),
('Design New Logo', 'Charlie Brown', 'Done', 'Low', now() - interval '1 day');

insert into candidates (full_name, email, role, stage, applied_at) values
('John Doe', 'john@example.com', 'Frontend Developer', 'Applied', now() - interval '2 days'),
('Jane Smith', 'jane@example.com', 'Product Manager', 'Screening', now() - interval '1 day');
