import React from "react";
import { Users } from "lucide-react";

interface SeatOverviewCardProps {
  totalSeats: number;
  usedSeats: number;
}

export function SeatOverviewCard({ totalSeats, usedSeats }: SeatOverviewCardProps) {
  const remainingSeats = Math.max(totalSeats - usedSeats, 0);
  const usagePercentage = totalSeats > 0 ? (usedSeats / totalSeats) * 100 : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Kuota Lisensi B2B
          </p>
          <h3 className="mt-1 text-3xl font-bold text-gray-900">
            {usedSeats} <span className="text-lg font-medium text-gray-400">/ {totalSeats} Seats</span>
          </h3>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          <Users className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Penggunaan Lisensi</span>
          <span>{usagePercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-center">
        <div>
          <p className="text-xs text-gray-500">Sisa Kuota</p>
          <p className="text-lg font-bold text-green-600">{remainingSeats} Seats</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Terpakai</p>
          <p className="text-lg font-bold text-blue-600">{usedSeats} Seats</p>
        </div>
      </div>
    </div>
  );
}
