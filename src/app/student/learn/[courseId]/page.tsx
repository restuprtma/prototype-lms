"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { getCourse, getEnrollments } from "@/lib/api";
import { Course, Lesson } from "@/types";
import { VideoPlayer } from "@/components/Features/VideoPlayer";
import { SyllabusSidebar } from "@/components/Features/SyllabusSidebar";
import { MaterialTabs } from "@/components/Features/MaterialTabs";
import { QuizForm } from "@/components/Features/QuizForm";
import { CertificatePreview } from "@/components/Features/CertificatePreview";
import { ArrowLeft, Award } from "lucide-react";
import { Button } from "@/components/UI/Button";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default function LearnPage({ params }: PageProps) {
  const { courseId } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const courseData = await getCourse(courseId);
        if (courseData) {
          setCourse(courseData);
          if (courseData.syllabus.length > 0 && courseData.syllabus[0].lessons.length > 0) {
            setActiveLesson(courseData.syllabus[0].lessons[0]);
          }
        }

        const enrollments = await getEnrollments();
        const enrollment = enrollments.find((e) => e.userId === "u1" && e.courseId === courseId);
        if (enrollment) {
          const completed = enrollment.progress
            .filter((p) => p.progressPercentage === 100)
            .map((p) => p.lessonId);
          setCompletedLessons(completed);
          if (enrollment.quizScore >= 80) {
            setQuizPassed(true);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400 bg-gray-900">
        Memuat ruang belajar...
      </div>
    );
  }

  if (!course || !activeLesson) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 bg-gray-900">
        Kelas tidak ditemukan.
      </div>
    );
  }

  const handleLessonSelect = (lesson: Lesson) => {
    setShowQuiz(false);
    setShowCertificate(false);
    setActiveLesson(lesson);
  };

  const handleVideoEnded = () => {
    if (!completedLessons.includes(activeLesson.id)) {
      setCompletedLessons([...completedLessons, activeLesson.id]);
    }
  };

  const handleQuizResult = (score: number, passed: boolean) => {
    setQuizPassed(passed);
  };

  const totalLessonsCount = course.syllabus.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const isAllLessonsCompleted = completedLessons.length === totalLessonsCount;

  const mockQuizQuestions = [
    {
      id: "q1",
      text: "Manakah tool generative AI berikut yang paling tepat untuk merancang copywriting teks iklan?",
      options: [
        "Midjourney",
        "ChatGPT",
        "Stable Diffusion",
        "DALL-E 3"
      ],
      correctAnswer: 1
    },
    {
      id: "q2",
      text: "Apa itu prompt engineering?",
      options: [
        "Bahasa pemrograman baru untuk AI",
        "Seni merancang instruksi teks agar AI memberikan output optimal",
        "Sistem perbaikan hardware AI",
        "Proses training data mentah AI"
      ],
      correctAnswer: 1
    }
  ];

  const mockAttachments = [
    { name: "Slide_Pengenalan_AI_Harian.pdf", url: "#", size: "2.4 MB" },
    { name: "Template_Prompt_Copywriting.txt", url: "#", size: "45 KB" }
  ];

  const mockExternalLinks = [
    { title: "ChatGPT OpenAI", url: "https://chat.openai.com" },
    { title: "Midjourney Discord", url: "https://discord.gg/midjourney" }
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/student/dashboard"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold truncate max-w-md">{course.title}</h1>
            <p className="text-[10px] text-gray-400">Pelajaran: {activeLesson.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="hidden sm:block text-right">
            <p className="text-gray-300">Progress: {completedLessons.length} / {totalLessonsCount} Selesai</p>
          </div>

          {isAllLessonsCompleted && (
            <Button
              size="sm"
              onClick={() => {
                setShowQuiz(true);
                setShowCertificate(false);
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
            >
              Mulai Kuis
            </Button>
          )}

          {quizPassed && (
            <Button
              size="sm"
              onClick={() => {
                setShowCertificate(true);
                setShowQuiz(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold inline-flex items-center gap-1.5"
            >
              <Award className="h-4 w-4" />
              Sertifikat
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {showCertificate ? (
            <CertificatePreview
              studentName="Budi Santoso"
              courseName={course.title}
              completionDate="16 Juli 2026"
              certificateId={`CERT-VE-${course.id}-99418`}
            />
          ) : showQuiz ? (
            <QuizForm
              questions={mockQuizQuestions}
              passingGrade={80}
              onSubmitResult={handleQuizResult}
            />
          ) : (
            <>
              <VideoPlayer
                videoUrl={activeLesson.videoUrl}
                onEnded={handleVideoEnded}
              />
              <div className="text-black">
                <MaterialTabs
                  description="Kelas AI Terapan eksklusif oleh pakar Venturo. Kami mengupas tuntas cara integrasi AI harian di workstation Anda."
                  attachments={mockAttachments}
                  externalLinks={mockExternalLinks}
                />
              </div>
            </>
          )}
        </div>

        <div className="hidden lg:block shrink-0 border-l border-gray-800 p-6 bg-gray-900/50">
          <SyllabusSidebar
            syllabus={course.syllabus}
            activeLessonId={activeLesson.id}
            onSelectLesson={handleLessonSelect}
            completedLessons={completedLessons}
          />
        </div>
      </div>
    </div>
  );
}
