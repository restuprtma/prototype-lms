import React, { useState } from "react";
import { Modal } from "@/components/UI/Modal";
import { Button } from "@/components/UI/Button";
import { Upload, AlertCircle } from "lucide-react";

interface BulkInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (emails: string[]) => void;
}

export function BulkInviteModal({ isOpen, onClose, onSubmit }: BulkInviteModalProps) {
  const [emailsText, setEmailsText] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (csvFile) {
      // Mock CSV parsing
      const mockCsvEmails = ["karyawan1@corporate.com", "karyawan2@corporate.com", "karyawan3@corporate.com"];
      onSubmit(mockCsvEmails);
      resetForm();
      onClose();
      return;
    }

    if (!emailsText.trim()) {
      setError("Masukkan setidaknya satu email.");
      return;
    }

    // Split by newlines, commas or semicolons
    const emails = emailsText
      .split(/[\n,;]+/)
      .map((email) => email.trim())
      .filter((email) => email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    if (emails.length === 0) {
      setError("Format email tidak valid. Periksa kembali inputan Anda.");
      return;
    }

    onSubmit(emails);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setEmailsText("");
    setCsvFile(null);
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Undang Karyawan Baru">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-700 block">
            Metode 1: Masukkan Email (Pisahkan dengan koma atau baris baru)
          </label>
          <textarea
            rows={4}
            placeholder="karyawan1@corporate.com&#10;karyawan2@corporate.com"
            value={emailsText}
            onChange={(e) => setEmailsText(e.target.value)}
            disabled={!!csvFile}
            className="mt-1.5 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold uppercase">ATAU</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block">
            Metode 2: Upload File CSV/Excel
          </label>
          <div className="mt-1.5 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <div className="mt-2 flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500">
                  <span>Pilih File</span>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="sr-only"
                    disabled={!!emailsText.trim()}
                  />
                </label>
                <p className="pl-1">atau drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">CSV, XLSX hingga 10MB</p>
              {csvFile && (
                <p className="mt-2 text-xs font-semibold text-blue-600">
                  {csvFile.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button size="sm" type="submit">
            Kirim Undangan
          </Button>
        </div>
      </form>
    </Modal>
  );
}
