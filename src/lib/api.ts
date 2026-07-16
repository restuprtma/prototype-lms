import { User, Course, CorporateLicense, Enrollment, Transaction } from "@/types";
import usersData from "./mockData/users.json";
import coursesData from "./mockData/courses.json";
import corporateLicensesData from "./mockData/corporate_licenses.json";
import enrollmentsData from "./mockData/enrollments.json";
import transactionsData from "./mockData/transactions.json";

export async function getUsers(): Promise<User[]> {
  return usersData as User[];
}

export async function getUser(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.id === id);
}

export async function getCourses(): Promise<Course[]> {
  return coursesData as Course[];
}

export async function getCourse(id: string): Promise<Course | undefined> {
  const courses = await getCourses();
  return courses.find((c) => c.id === id);
}

export async function getCorporateLicenses(): Promise<CorporateLicense[]> {
  return corporateLicensesData as CorporateLicense[];
}

export async function getEnrollments(): Promise<Enrollment[]> {
  return enrollmentsData as Enrollment[];
}

export async function getTransactions(): Promise<Transaction[]> {
  return transactionsData as Transaction[];
}
