import React from "react";
import { Award, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/UI/Button";

interface CertificatePreviewProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
}

export function CertificatePreview({
  studentName,
  courseName,
  completionDate,
  certificateId,
}: CertificatePreviewProps) {
  return (
    <div className="space-y-6">
      <div className="relative border-8 border-double border-amber-800 bg-amber-50/30 p-12 text-center rounded-xl shadow-lg flex flex-col justify-center items-center min-h-[400px]">
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-800" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-800" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-800" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-800" />

        <div className="flex flex-col items-center">
          <Award className="h-16 w-16 text-amber-700 mb-4" />
          <h2 className="font-serif text-3xl font-bold text-amber-900 tracking-wide">
            SERTIFIKAT KELULUSAN
          </h2>
          <p className="text-xs uppercase tracking-widest text-amber-800/80 mt-2 font-medium">
            Sertifikat ini secara sah diberikan kepada
          </p>

          <h3 className="text-2xl font-bold font-serif text-gray-900 border-b-2 border-amber-800/25 px-8 pb-1 mt-6">
            {studentName}
          </h3>

          <p className="text-xs text-gray-500 mt-6 max-w-md leading-relaxed">
            Atas kelulusan dan penguasaan materi di bidang Artificial Intelligence pada kelas:
          </p>

          <h4 className="text-lg font-bold text-amber-900 mt-2">
            {courseName}
          </h4>

          <p className="text-xs text-gray-400 mt-8 font-semibold">
            Diterbitkan pada {completionDate}
          </p>
        </div>

        <div className="mt-10 flex w-full justify-between items-end border-t border-amber-800/10 pt-6">
          <div className="text-left text-[10px] text-gray-400">
            <p>Verifikasi Keaslian ID:</p>
            <p className="font-mono text-gray-600 font-bold">{certificateId}</p>
          </div>
          <div className="text-center text-amber-800 flex items-center gap-1.5">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-bold font-serif italic">Venturo AI Institute</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="inline-flex items-center gap-2">
          <Download className="h-4 w-4" />
          Unduh Sertifikat (PDF)
        </Button>
      </div>
    </div>
  );
}
