import React from "react";
import { PublicNavbar } from "@/components/Layout/PublicNavbar";
import { Footer } from "@/components/Layout/Footer";
import { CourseCard } from "@/components/Features/CourseCard";
import { getCourses } from "@/lib/api";
import { ContactForm } from "@/components/Features/ContactForm";
import { ArrowRight, Bot, Shield, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Bot className="h-3.5 w-3.5" /> AI for Daily Work Specialist
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Kuasai AI untuk <span className="text-blue-400">Otomatisasi</span> Kerja Anda
              </h1>
              <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
                Belajar langsung dari pakar Venturo cara memanfaatkan ChatGPT, Midjourney, dan automasi AI lainnya untuk mempercepat pekerjaan harian hingga 10x lipat.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Lihat Katalog Kelas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#b2b-section"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-lg text-base font-bold text-gray-300 hover:text-white transition-colors"
                >
                  Training Perusahaan (B2B)
                </a>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-500/10 absolute blur-3xl" />
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-md shadow-2xl relative">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3 font-mono text-sm text-blue-300">
                  <p className="text-gray-400">// Venturo AI Automation Shell</p>
                  <p>$ npm run automate-work</p>
                  <p className="text-green-400">&gt; Generating copy assets...</p>
                  <p className="text-green-400">&gt; Creating visual elements...</p>
                  <p className="text-green-400">&gt; Process complete. 30 hours saved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Mengapa Belajar di Venturo LMS?
            </h2>
            <p className="text-base text-gray-600">
              Kami menyajikan materi premium terapan yang siap dipakai di lingkungan profesional Anda.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-lg bg-blue-50 w-12 h-12 flex items-center justify-center text-blue-600 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Praktis & Terapan</h3>
              <p className="text-sm text-gray-500 mt-2">
                Tidak ada teori bertele-tele. Setiap video fokus pada cara memakai AI untuk menyelesaikan tugas riil.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-lg bg-blue-50 w-12 h-12 flex items-center justify-center text-blue-600 mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Peningkatan KPI</h3>
              <p className="text-sm text-gray-500 mt-2">
                Dioptimalkan untuk mendongkrak performa kerja individu dan departemen korporasi secara instan.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-lg bg-blue-50 w-12 h-12 flex items-center justify-center text-blue-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Sertifikat Resmi</h3>
              <p className="text-sm text-gray-500 mt-2">
                Validasi kompetensi AI Anda dengan sertifikat resmi dari Venturo AI Academy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Kelas Unggulan</h2>
              <p className="text-base text-gray-600 mt-2">Tingkatkan skill AI Anda hari ini.</p>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Lihat semua kelas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                thumbnail={course.thumbnail}
                price={course.price}
                instructor={course.instructor}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="b2b-section" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="w-96 h-96 rounded-full bg-blue-600/10 absolute -bottom-20 -right-20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Solusi Korporasi B2B
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Pantau Progress Belajar Tim Anda dengan Corporate Seats
              </h2>
              <p className="text-lg text-gray-400">
                Venturo menyediakan skema lisensi korporat untuk pelatihan massal. Anda akan mendapatkan Dashboard HR khusus untuk mengundang tim, memantau kemajuan, dan mengunduh sertifikat karyawan.
              </p>
              <ul className="space-y-3.5 text-sm text-gray-300">
                <li className="flex items-center gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">✓</span>
                  <span>Kelola kursi (seats) karyawan secara fleksibel.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">✓</span>
                  <span>Analitik partisipasi & rata-rata kelulusan modul.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">✓</span>
                  <span>Pembayaran aman dengan custom B2B invoice.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
              <h3 className="text-xl font-bold mb-6">Hubungi Kami untuk Paket Perusahaan</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
