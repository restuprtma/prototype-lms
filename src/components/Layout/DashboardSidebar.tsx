import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Users,
  BarChart3,
  CreditCard,
  LogOut,
  FolderLock,
} from "lucide-react";

interface DashboardSidebarProps {
  role: "student" | "corporate" | "admin";
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const getMenuItems = (): SidebarItem[] => {
    switch (role) {
      case "admin":
        return [
          {
            title: "Kelola Kelas",
            href: "/admin/courses",
            icon: <BookOpen className="h-5 w-5" />,
          },
          {
            title: "Daftar Transaksi",
            href: "/admin/transactions",
            icon: <CreditCard className="h-5 w-5" />,
          },
          {
            title: "Kelola User",
            href: "/admin/users",
            icon: <Users className="h-5 w-5" />,
          },
        ];
      case "corporate":
        return [
          {
            title: "Ringkasan Lisensi",
            href: "/corporate/dashboard",
            icon: <BarChart3 className="h-5 w-5" />,
          },
          {
            title: "Kelola Karyawan",
            href: "/corporate/employees",
            icon: <Users className="h-5 w-5" />,
          },
        ];
      case "student":
      default:
        return [
          {
            title: "Kelas Saya",
            href: "/student/dashboard",
            icon: <GraduationCap className="h-5 w-5" />,
          },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-gray-200 bg-white pt-16">
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-5 mb-5 px-2">
          <FolderLock className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-bold text-gray-900 capitalize">{role} Panel</span>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 pt-4 mt-auto">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Keluar</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
