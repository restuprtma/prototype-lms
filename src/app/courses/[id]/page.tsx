"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { PublicNavbar } from "@/components/Layout/PublicNavbar";
import { Footer } from "@/components/Layout/Footer";
import { CheckoutSummary } from "@/components/Features/CheckoutSummary";
import { Modal } from "@/components/UI/Modal";
import { Button } from "@/components/UI/Button";
import { getCourse } from "@/lib/api";
import { Course } from "@/types";
import { Award, BookOpen, Clock, Play, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("ch1");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCourse(id);
        if (data) {
          setCourse(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <PublicNavbar />
        <main className="flex-grow flex items-center justify-center py-20 text-gray-400">
          Memuat detail kelas...
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <PublicNavbar />
        <main className="flex-grow flex items-center justify-center py-20 text-red-500">
          Kelas tidak ditemukan.
        </main>
        <Footer />
      </div>
    );
  }

  const handleCheckout = () => {
    setCheckoutModalOpen(true);
  };

  const confirmPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setCheckoutModalOpen(false);
      router.push("/student/dashboard");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PublicNavbar />

      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Total 3 Jam Belajar
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  {course.syllabus.reduce((acc, ch) => acc + ch.lessons.length, 0)} Pelajaran
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg">
                  <Award className="h-4 w-4 text-blue-500" />
                  Sertifikat Kelulusan
                </span>
              </div>
            </div>

            <div className="relative aspect-video w-full rounded-xl bg-black overflow-hidden shadow-md group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.thumbnail}
                alt="Trailer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
                  <Play className="h-6 w-6 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Apa yang Akan Anda Pelajari</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                {course.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Silabus Kurikulum</h3>
              <div className="space-y-2">
                {course.syllabus.map((chapter) => {
                  const isOpen = activeAccordion === chapter.id;

                  return (
                    <div key={chapter.id} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={() => setActiveAccordion(isOpen ? null : chapter.id)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <span>{chapter.title}</span>
                        <span className="text-xs font-semibold text-gray-500">
                          {chapter.lessons.length} Pelajaran
                        </span>
                      </button>
                      {isOpen && (
                        <div className="border-t border-gray-100 divide-y divide-gray-100 bg-gray-50/50">
                          {chapter.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex justify-between items-center p-4 text-sm text-gray-600">
                              <span className="font-medium">{lesson.title}</span>
                              <span className="text-xs text-gray-400">
                                {Math.floor(lesson.duration / 60)} menit
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Mentor Anda</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                  VE
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{course.instructor}</h4>
                  <p className="text-xs text-gray-500">Boutique AI Specialist & Tech Coach</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                Pakar otomasi AI dengan pengalaman bertahun-tahun membantu organisasi mendesain otomatisasi alur kerja guna menghemat waktu pengerjaan proyek.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <CheckoutSummary subtotal={course.price} onCheckout={handleCheckout} />
          </div>
        </div>
      </main>

      <Modal isOpen={checkoutModalOpen} onClose={() => setCheckoutModalOpen(false)} title="Pembayaran Instan (QRIS)">
        {paymentSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center rounded-full p-4 bg-green-50 text-green-600">
              <Check className="h-16 w-16" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">Pembayaran Berhasil!</h4>
            <p className="text-sm text-gray-500">Mempersiapkan kelas untuk Anda, mohon tunggu...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">Pindai kode QRIS berikut dengan aplikasi M-Banking atau E-Wallet Anda untuk menyelesaikan pembayaran.</p>
              <div className="mx-auto w-48 h-48 border-4 border-gray-100 bg-white p-3 rounded-xl shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-zinc-800 flex flex-col items-center justify-center text-white text-[10px] font-mono p-4 rounded text-center leading-tight">
                  <p>VENTURO QRIS GATEWAY</p>
                  <p className="mt-2 text-blue-400 font-bold">LUNAS MOCK</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">Total Tagihan: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(course.price)}</p>
            </div>

            <div className="flex gap-3 justify-end border-t border-gray-100 pt-4">
              <Button variant="outline" size="sm" onClick={() => setCheckoutModalOpen(false)}>
                Batal
              </Button>
              <Button size="sm" onClick={confirmPayment}>
                Konfirmasi Lunas
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
