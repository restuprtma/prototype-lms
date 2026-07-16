"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/Features/AuthForm";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (data: { email: string; isRegister: boolean }) => {
    const email = data.email.toLowerCase().trim();

    if (email === "budi@example.com") {
      router.push("/student/dashboard");
    } else if (email === "sarah@corporate.com") {
      router.push("/corporate/dashboard");
    } else if (email === "andi@corporate.com") {
      router.push("/student/dashboard");
    } else if (email === "admin@venturo.com") {
      router.push("/admin/courses");
    } else {
      alert("Pendaftaran Akun Baru Berhasil! Mengalihkan ke Dashboard Kelas...");
      router.push("/student/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
              <GraduationCap className="h-6 w-6" />
              <span>Venturo LMS</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <AuthForm onSubmit={handleLogin} />
      </main>
    </div>
  );
}
