export type Role = "SUPER_ADMIN" | "CORPORATE_ADMIN" | "STUDENT_B2C" | "STUDENT_B2B";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  companyId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: number; // in seconds
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  instructor: string;
  learningOutcomes: string[];
  syllabus: Chapter[];
}

export interface CorporateLicense {
  companyId: string;
  companyName: string;
  totalSeats: number;
  usedSeats: number;
  employees: string[]; // array of user IDs
  averageParticipation: number; // percentage 0-100
}

export interface ModuleProgress {
  lessonId: string;
  progressPercentage: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: ModuleProgress[];
  quizScore: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "B2C_QRIS" | "B2B_INVOICE";
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
  courseId?: string;
  companyId?: string;
}
