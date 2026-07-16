import React from "react";
import { DashboardSidebar } from "@/components/Layout/DashboardSidebar";
import Link from "next/link";
import { GraduationCap, User } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="fixed inset-x-0 top-0 z-30 h-16 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <GraduationCap className="h-6 w-6" />
          <span>Venturo LMS</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-900">Super Admin</p>
            <p className="text-[10px] text-gray-500">Venturo CMS</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        <DashboardSidebar role="admin" />
        <main className="flex-1 pl-64 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
