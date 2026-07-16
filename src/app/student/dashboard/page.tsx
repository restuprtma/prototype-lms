"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCourses, getEnrollments } from "@/lib/api";
import { Course, Enrollment } from "@/types";
import { ProgressBar } from "@/components/UI/ProgressBar";
import { BookOpen, Award, Play } from "lucide-react";

interface EnrolledCourseItem {
  course: Course;
  enrollment: Enrollment;
  progressPercentage: number;
}

export default function StudentDashboardPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const allCourses = await getCourses();
        const enrollments = await getEnrollments();
        const userEnrollments = enrollments.filter((e) => e.userId === "u1");

        const merged: EnrolledCourseItem[] = userEnrollments.map((en) => {
          const course = allCourses.find((c) => c.id === en.courseId)!;
          const totalLessons = course.syllabus.reduce((acc, ch) => acc + ch.lessons.length, 0);
          const completedLessons = en.progress.filter((p) => p.progressPercentage === 100).length;
          const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

          return {
            course,
            enrollment: en,
            progressPercentage: pct,
          };
        });

        setEnrolledCourses(merged);
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
        <h1 className="text-2xl font-extrabold text-gray-900">Kelas Saya</h1>
        <p className="text-xs text-gray-500 mt-1">Lanjutkan belajar untuk mencapai target karir Anda.</p>
      </div>

      {loading ? (
        <div className="text-gray-400 py-10 text-center">Memuat kelas Anda...</div>
      ) : enrolledCourses.length === 0 ? (
        <div className="border border-dashed border-gray-200 bg-white rounded-xl p-12 text-center space-y-4">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">Belum ada kelas aktif</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Anda belum terdaftar di kelas mana pun. Silakan kunjungi katalog untuk memulai.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow"
          >
            Cari Kelas AI
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map(({ course, progressPercentage }) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{course.instructor}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-gray-600">
                    <span>Progress Belajar</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <ProgressBar progress={progressPercentage} />
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  {progressPercentage >= 100 ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                      <Award className="h-4 w-4" /> Kelas Selesai
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">Dalam Proses</span>
                  )}
                  <Link
                    href={`/student/learn/${course.id}`}
                    className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors gap-1 shadow-sm"
                  >
                    {progressPercentage >= 100 ? "Review Kelas" : "Mulai Belajar"}
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
