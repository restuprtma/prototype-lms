"use client";

import React from "react";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Permintaan Anda berhasil dikirim! Tim kami akan menghubungi dalam waktu 1x24 jam.");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Nama Perwakilan</label>
        <input
          type="text"
          required
          placeholder="Sarah Wijaya"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Nama Perusahaan</label>
        <input
          type="text"
          required
          placeholder="PT Finansial Nusantara"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Email Kantor</label>
        <input
          type="email"
          required
          placeholder="sarah@corporate.com"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Jumlah Lisensi yang Dibutuhkan</label>
        <select className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
          <option value="10">10 - 25 Seats</option>
          <option value="50">26 - 50 Seats</option>
          <option value="100">51+ Seats</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-colors text-sm mt-4"
      >
        Kirim Permintaan Demo
      </button>
    </form>
  );
}
