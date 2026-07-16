"use client";

import React, { useState, useEffect } from "react";
import { EmployeeTable, EmployeeProgress } from "@/components/Features/EmployeeTable";
import { BulkInviteModal } from "@/components/Features/BulkInviteModal";
import { getCorporateLicenses, getUsers, getEnrollments } from "@/lib/api";
import { Button } from "@/components/UI/Button";
import { UserPlus } from "lucide-react";

export default function CorporateEmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeProgress[]>([]);
  const [usedSeats, setUsedSeats] = useState(0);
  const [totalSeats, setTotalSeats] = useState(50);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const licenses = await getCorporateLicenses();
        const allUsers = await getUsers();
        const enrollments = await getEnrollments();

        const corp = licenses.find((l) => l.companyId === "c1");
        if (corp) {
          setTotalSeats(corp.totalSeats);
          setUsedSeats(corp.usedSeats);

          const corpEmployees = allUsers.filter((u) => u.companyId === "c1" && u.role === "STUDENT_B2B");

          const mapped = corpEmployees.map((emp) => {
            const en = enrollments.find((e) => e.userId === emp.id);
            const progressPct = en
              ? Math.round((en.progress.filter((p) => p.progressPercentage === 100).length / 1) * 100)
              : 0;

            const score = en ? en.quizScore : 0;
            let status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" = "NOT_STARTED";
            if (progressPct === 100) {
              status = "COMPLETED";
            } else if (progressPct > 0) {
              status = "IN_PROGRESS";
            }

            return {
              id: emp.id,
              name: emp.name,
              email: emp.email,
              progressPercentage: progressPct,
              quizScore: score,
              status,
            };
          });

          setEmployees(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleRevokeAccess = (id: string) => {
    if (confirm("Apakah Anda yakin ingin mencabut akses lisensi karyawan ini? Kuota seat akan dikembalikan.")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      setUsedSeats((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleBulkInvite = (emails: string[]) => {
    const remaining = totalSeats - usedSeats;
    if (emails.length > remaining) {
      alert(`Kuota tidak mencukupi. Sisa kuota: ${remaining} Seats. Anda mencoba mengundang ${emails.length} Karyawan.`);
      return;
    }

    const newEmployees: EmployeeProgress[] = emails.map((email, idx) => ({
      id: `u-new-${Date.now()}-${idx}`,
      name: email.split("@")[0],
      email: email,
      progressPercentage: 0,
      quizScore: 0,
      status: "NOT_STARTED",
    }));

    setEmployees([...employees, ...newEmployees]);
    setUsedSeats((prev) => prev + emails.length);
    alert(`Berhasil melayangkan ${emails.length} email undangan resmi ke karyawan.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Kelola Karyawan</h1>
          <p className="text-xs text-gray-500 mt-1">
            Undang karyawan baru atau cabut akses karyawan yang sudah resign.
          </p>
        </div>
        <Button
          onClick={() => setIsInviteOpen(true)}
          className="inline-flex items-center gap-2 shadow"
        >
          <UserPlus className="h-4 w-4" />
          Undang Karyawan
        </Button>
      </div>

      {loading ? (
        <div className="text-gray-400 py-10 text-center">Memuat daftar karyawan...</div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm font-semibold text-gray-500">
            Sisa Kuota: {totalSeats - usedSeats} / {totalSeats} Seats tersedia
          </div>
          <EmployeeTable employees={employees} onRevokeAccess={handleRevokeAccess} />
        </div>
      )}

      <BulkInviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onSubmit={handleBulkInvite}
      />
    </div>
  );
}
