# DEXAZ EMS (Employee Management System)

A comprehensive, mobile-first Employee Management System built with Next.js 14, Tailwind CSS, and PWA capabilities. Designed to mimic the clean aesthetic of modern enterprise software with a focus on touch interactions and offline accessibility.

![DEXAZ EMS Dashboard](public/icon-512x512.png)
*(Note: Replace with actual dashboard screenshot in production)*

## 🚀 Features

- **Executive Dashboard**: Real-time metrics for staff, presence, leaves, and performance. Visualized with interactive charts.
- **Employee Directory**: Searchable list of all employees with status indicators (Active, Offline, On Leave).
- **Recruitment Pipeline**: Kanban board for tracking candidates through stages (Applied, Screening, Interview, Offer, Hired).
- **Attendance & Leave**: Digital clock for check-ins/outs and a history log of leave requests.
- **Task Management**: Board view to assign and track tasks by priority and status.
- **PWA Ready**: Installable on mobile devices with offline support via service workers.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: Radix UI primitives (via Shadcn concepts), Lucide React Icons
- **Data Visualization**: Recharts
- **Drag & Drop**: @hello-pangea/dnd
- **State Management**: Zustand
- **PWA**: @ducanh2912/next-pwa

## 🏁 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sameerthedeveloper/dexas-ems.git
   cd dexas-ems
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   > **Note**: This project uses a custom webpack config for PWA compatibility. The `dev` script is configured to use `--webpack`.

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 PWA Usage

1. Open the application in your mobile browser.
2. Select "Add to Home Screen" from the browser menu.
3. The app will install as a standalone application.

## 📂 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── dashboard/    # Layout components (Sidebar, Header)
│   ├── employees/    # Employee directory components
│   ├── recruitment/  # Kanban board components
│   └── ui/           # Shared UI elements
├── lib/              # Utilities and Mock Data
└── types/            # TypeScript definitions
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
