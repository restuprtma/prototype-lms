import React from "react";
import { Button } from "@/components/UI/Button";
import { Badge } from "@/components/UI/Badge";
import { ProgressBar } from "@/components/UI/ProgressBar";
import { Trash2 } from "lucide-react";

export interface EmployeeProgress {
  id: string; // User ID
  name: string;
  email: string;
  progressPercentage: number;
  quizScore: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

interface EmployeeTableProps {
  employees: EmployeeProgress[];
  onRevokeAccess: (id: string) => void;
}

export function EmployeeTable({ employees, onRevokeAccess }: EmployeeTableProps) {
  const getStatusBadge = (status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED") => {
    switch (status) {
      case "COMPLETED":
        return <Badge text="Selesai" color="green" />;
      case "IN_PROGRESS":
        return <Badge text="Belajar" color="yellow" />;
      default:
        return <Badge text="Belum Mulai" color="gray" />;
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-left">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Karyawan</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Progress</th>
            <th className="px-6 py-4">Nilai Kuis</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
          {employees.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                Tidak ada karyawan yang terdaftar.
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{emp.name}</div>
                  <div className="text-xs text-gray-500">{emp.email}</div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(emp.status)}</td>
                <td className="px-6 py-4 w-48">
                  <div className="flex items-center gap-3">
                    <ProgressBar progress={emp.progressPercentage} />
                    <span className="text-xs font-medium">{emp.progressPercentage}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {emp.quizScore > 0 ? emp.quizScore : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    onClick={() => onRevokeAccess(emp.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Revoke
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
