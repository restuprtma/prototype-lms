"use client";

import React, { useState, useEffect } from "react";
import { PublicNavbar } from "@/components/Layout/PublicNavbar";
import { Footer } from "@/components/Layout/Footer";
import { CourseCard } from "@/components/Features/CourseCard";
import { FilterSidebar } from "@/components/Features/FilterSidebar";
import { Input } from "@/components/UI/Input";
import { getCourses } from "@/lib/api";
import { Course } from "@/types";
import { Search } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    
    let category = "AI for Productivity";
    if (c.id === "crs1") {
      category = "AI for Productivity";
    }

    const matchesCategory = !selectedCategory || category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["AI for Productivity", "AI for Finance", "AI for HR"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PublicNavbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Katalog Kelas AI</h1>
            <p className="text-sm text-gray-500 mt-1">
              Temukan kelas AI yang sesuai dengan kebutuhan peningkatan efisiensi kerja harian Anda.
            </p>
          </div>

          <div className="w-full max-w-md">
            <Input
              placeholder="Cari kelas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-4">
            <FilterSidebar categories={categories} onSelect={setSelectedCategory} />

            <div className="flex-1">
              {loading ? (
                <div className="text-center py-20 text-gray-400">Memuat kelas...</div>
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-20 text-gray-400 border border-dashed border-gray-200 rounded-xl bg-white">
                  Tidak ada kelas yang cocok dengan pencarian Anda.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
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
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
