"use client";

import React, { useState } from "react";

interface FilterSidebarProps {
  categories: string[];
  onSelect: (category: string | null) => void;
}

export function FilterSidebar({ categories, onSelect }: FilterSidebarProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (category: string | null) => {
    setSelected(category);
    onSelect(category);
  };

  return (
    <div className="w-full md:w-64 rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-bold text-gray-900">Filter Kategori</h3>
      <div className="mt-4 space-y-2">
        <button
          onClick={() => handleSelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === null
              ? "bg-blue-50 text-blue-700"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Semua Kategori
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected === cat
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
