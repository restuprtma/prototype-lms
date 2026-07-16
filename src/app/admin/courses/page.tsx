"use client";

import React, { useState, useEffect } from "react";
import { getCourses } from "@/lib/api";
import { Course } from "@/types";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Plus, Trash2 } from "lucide-react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [instructor, setInstructor] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !instructor) {
      alert("Mohon isi field wajib (Judul, Harga, Mentor).");
      return;
    }

    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      title,
      description,
      price: Number(price),
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=640",
      instructor,
      syllabus: [],
      learningOutcomes: [],
    };

    setCourses([...courses, newCourse]);
    setTitle("");
    setDescription("");
    setPrice("");
    setInstructor("");
    setShowAddForm(false);
    alert("Kelas B2C/B2B baru berhasil ditambahkan ke Venturo CMS.");
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Manajemen Kelas</h1>
          <p className="text-xs text-gray-500 mt-1">Buat, perbarui, dan hapus modul materi pembelajaran AI.</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="inline-flex items-center gap-2 shadow">
          <Plus className="h-4 w-4" />
          {showAddForm ? "Batal" : "Tambah Kelas"}
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCourse} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 max-w-xl">
          <h3 className="text-lg font-bold text-gray-900">Form Kelas Baru</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul Kelas *</label>
              <Input
                required
                placeholder="Contoh: Otomasi Keuangan dengan AI"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Deskripsi *</label>
              <textarea
                rows={3}
                required
                placeholder="Penjelasan singkat silabus kelas..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 border px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Harga (IDR) *</label>
                <Input
                  type="number"
                  required
                  placeholder="299000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mentor Instruktur *</label>
                <Input
                  required
                  placeholder="Contoh: Rian Pratama"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowAddForm(false)}>Batal</Button>
            <Button size="sm" type="submit">Simpan Kelas</Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-gray-400 py-10 text-center">Memuat daftar kelas...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Judul Kelas</th>
                <th className="px-6 py-4">Mentor</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{c.title}</div>
                    <div className="text-xs text-gray-400 line-clamp-1 max-w-sm">{c.description}</div>
                  </td>
                  <td className="px-6 py-4">{c.instructor}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(c.price)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      onClick={() => handleDeleteCourse(c.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Hapus
                    </Button>
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
