"use client";

import React, { useState, useEffect } from "react";
import { getUsers } from "@/lib/api";
import { User } from "@/types";
import { Badge } from "@/components/UI/Badge";
import { Button } from "@/components/UI/Button";
import { Trash2 } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <Badge text="Super Admin" color="red" />;
      case "CORPORATE_ADMIN":
        return <Badge text="Corp Admin" color="yellow" />;
      case "STUDENT_B2B":
        return <Badge text="Student B2B" color="green" />;
      default:
        return <Badge text="Student B2C" color="gray" />;
    }
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Manajemen Pengguna</h1>
        <p className="text-xs text-gray-500 mt-1">Daftar seluruh entitas pengguna terdaftar dalam platform Venturo LMS.</p>
      </div>

      {loading ? (
        <div className="text-gray-400 py-10 text-center">Memuat daftar user...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Korporasi</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{getRoleBadge(u.role)}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{u.companyId ? "PT Finansial Nusantara" : "-"}</td>
                  <td className="px-6 py-4 text-right">
                    {u.role !== "SUPER_ADMIN" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1.5" />
                        Hapus
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-400 font-semibold italic">Protected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
