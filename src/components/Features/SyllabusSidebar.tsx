import React from "react";
import { Chapter, Lesson } from "@/types";
import { PlayCircle, CheckCircle } from "lucide-react";

interface SyllabusSidebarProps {
  syllabus: Chapter[];
  activeLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessons?: string[];
}

export function SyllabusSidebar({
  syllabus,
  activeLessonId,
  onSelectLesson,
  completedLessons = [],
}: SyllabusSidebarProps) {
  return (
    <div className="w-full lg:w-80 border border-gray-200 rounded-xl bg-white p-4 overflow-y-auto max-h-[70vh] lg:max-h-[80vh] shadow-sm">
      <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">
        Kurikulum Kelas
      </h3>
      <div className="space-y-4">
        {syllabus.map((chapter) => (
          <div key={chapter.id}>
            <h4 className="text-sm font-bold text-gray-700 mb-2">
              {chapter.title}
            </h4>
            <div className="space-y-1">
              {chapter.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mr-2">
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      ) : (
                        <PlayCircle className={`h-4 w-4 shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                      )}
                      <span className="line-clamp-2">{lesson.title}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">
                      {Math.floor(lesson.duration / 60)}m
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
