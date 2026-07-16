import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
              <GraduationCap className="h-6 w-6 text-blue-500" />
              <span>Venturo LMS</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Platform pembelajaran AI terapan premium terpercaya untuk profesional dan korporasi. Tingkatkan efisiensi kerja tim Anda dengan otomatisasi pintar.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Katalog Kelas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Kontak</h4>
            <p className="text-sm text-gray-400 mb-2">Venturo Tech Academy</p>
            <p className="text-sm text-gray-500">info@venturo.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Venturo Tech Academy. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-gray-400 cursor-pointer">Syarat & Ketentuan</span>
            <span className="hover:text-gray-400 cursor-pointer">Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
