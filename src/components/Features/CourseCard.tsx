import React from "react";
import Link from "next/link";
import { BookOpen, User } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  instructor: string;
}

export function CourseCard({ id, title, thumbnail, price, instructor }: CourseCardProps) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h4>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <User className="mr-1.5 h-4 w-4" />
          <span>{instructor}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-base font-bold text-blue-600">{formattedPrice}</span>
          <Link
            href={`/courses/${id}`}
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Detail Kelas
            <BookOpen className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
