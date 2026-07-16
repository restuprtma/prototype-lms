import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
              <GraduationCap className="h-6 w-6" />
              <span>Venturo LMS</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Katalog Kelas
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
