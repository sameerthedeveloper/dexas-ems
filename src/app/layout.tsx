import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { cn } from "@/lib/utils";
import Providers from "@/components/common/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEXAZ EMS",
  description: "Employee Management System",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased h-full flex bg-background text-foreground"
        )}
      >
        <Sidebar className="" />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <Providers>
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/20">
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
