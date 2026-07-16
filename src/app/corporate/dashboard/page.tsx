"use client";

import React, { useState, useEffect } from "react";
import { SeatOverviewCard } from "@/components/Features/SeatOverviewCard";
import { getCorporateLicenses } from "@/lib/api";
import { CorporateLicense } from "@/types";
import { BarChart3, Award, Zap } from "lucide-react";

export default function CorporateDashboardPage() {
  const [license, setLicense] = useState<CorporateLicense | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const licenses = await getCorporateLicenses();
        const corp = licenses.find((l) => l.companyId === "c1");
        if (corp) {
          setLicense(corp);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Dasbor Perusahaan</h1>
        <p className="text-xs text-gray-500 mt-1">
          {license ? license.companyName : "PT Perusahaan B2B"} — Kelola dan pantau progress belajar tim Anda.
        </p>
      </div>

      {loading ? (
        <div className="text-gray-400 py-10 text-center">Memuat dasbor...</div>
      ) : !license ? (
        <div className="text-red-500 text-center py-10">Data perusahaan tidak ditemukan.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <SeatOverviewCard totalSeats={license.totalSeats} usedSeats={license.usedSeats} />
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Rata-rata Progress</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-900">{license.averageParticipation}%</h3>
                <p className="text-xs text-green-600 font-medium mt-1">↑ 5% dari minggu lalu</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Sertifikat Diperoleh</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-900">0 <span className="text-lg font-medium text-gray-400">Karyawan</span></h3>
                <p className="text-xs text-gray-400 mt-1">Kuis akhir bab belum diselesaikan</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Tingkat Kelulusan & Keterlibatan Kelas</h3>
                <p className="text-xs text-gray-400 mt-0.5">Analisis tren keterlibatan belajar tim per minggu.</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                <Zap className="h-3 w-3" /> Live Update
              </span>
            </div>

            <div className="h-64 flex items-end justify-between gap-4 pt-10 px-4 border-b border-gray-100">
              {[
                { label: "Minggu 1", progress: 20, engagement: 40 },
                { label: "Minggu 2", progress: 35, engagement: 55 },
                { label: "Minggu 3", progress: 48, engagement: 68 },
                { label: "Minggu 4", progress: 65, engagement: 82 },
              ].map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex justify-center gap-1 items-end h-full">
                    <div
                      className="w-4 sm:w-6 bg-blue-500 rounded-t-md hover:bg-blue-600 transition-all duration-300 relative group"
                      style={{ height: `${data.progress}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        Progress: {data.progress}%
                      </div>
                    </div>
                    <div
                      className="w-4 sm:w-6 bg-blue-200 rounded-t-md hover:bg-blue-300 transition-all duration-300 relative group"
                      style={{ height: `${data.engagement}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        Aktif: {data.engagement}%
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">{data.label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-6 justify-center text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="text-gray-600 font-medium">Rata-rata Progress Belajar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 rounded" />
                <span className="text-gray-600 font-medium">Tingkat Aktivitas Mingguan</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
