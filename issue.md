# Issue Report: Event handlers in Server Component

## Masalah (Error Type)
**Runtime Error:** `Event handlers cannot be passed to Client Component props.`

Pesan error ini terjadi pada file `src/app/page.tsx` di baris form berikut:
```tsx
<form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("..."); }}>
```

### Penyebab
Dalam paradigma **Next.js App Router**, semua komponen secara default adalah **Server Components**. Server Components dirender di sisi server dan tidak memiliki akses ke interaktivitas sisi klien, seperti API browser (`window`, `alert`), React state/hooks, ataupun event listeners seperti `onClick` dan `onSubmit`.

Pada kasus ini, fungsi form kontak di `src/app/page.tsx` mencoba menggunakan properti `onSubmit` yang mengeksekusi `alert()` di dalam `page.tsx` (yang mana `page.tsx` adalah Server Component async). Karena form tersebut berada di Server Component, Next.js memunculkan peringatan (error) bahwa event handlers (seperti `onSubmit`) tidak dapat dipassing begitu saja ke HTML node karena Node HTML akan dirender oleh Server.

## Penyelesaian

Ada dua pendekatan penyelesaian yang direkomendasikan untuk Next.js App Router:

### Solusi 1: Memisahkan Form Menjadi Client Component (Direkomendasikan)
Buat file komponen terpisah (misalnya `src/components/Features/ContactForm.tsx`) dan tambahkan direktif `"use client";` di paling atas file tersebut. Kemudian, gunakan komponen tersebut di `src/app/page.tsx`.

**1. Buat `src/components/Features/ContactForm.tsx`:**
```tsx
"use client";

import React from "react";
import { Button } from "@/components/UI/Button";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Permintaan Anda berhasil dikirim! Tim kami akan menghubungi dalam waktu 1x24 jam.");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
        <input type="text" className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2" placeholder="PT Nusantara" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Kerja</label>
        <input type="email" className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2" placeholder="hr@perusahaan.com" />
      </div>
      <Button className="w-full">Minta Penawaran B2B</Button>
    </form>
  );
}
```

**2. Import ke dalam `src/app/page.tsx`:**
```tsx
import { ContactForm } from "@/components/Features/ContactForm";

// ... di dalam Home component:
<ContactForm />
```
Dengan ini, `page.tsx` tetap murni sebagai Server Component yang asinkron, dan form kontak mendapatkan direktif `"use client"` secara spesifik sehingga interaktivitas berfungsi optimal.

### Solusi 2: Mengubah Form Menjadi Server Action
Jika kita tidak butuh *state* klien atau *alert*, form ini bisa di-*submit* via Server Action yang akan berjalan seutuhnya di sisi server. Namun, karena di *prototype* ini kita membutuhkan `alert()`, maka Solusi 1 jauh lebih cocok.
