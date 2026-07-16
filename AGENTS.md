<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Project "LMS Sederhana" - Pedoman Agen AI (Next.js & Tailwind)

## Ringkasan Proyek
Kita sedang membangun **Learning Management System (LMS) sederhana** menggunakan **Next.js (App Router)** dan **Tailwind CSS**. Proyek ini bertujuan untuk membantu developer mencatat progress belajar, menyimpan materi/link, dan mengelola jadwal belajar.

## ⚠️ Aturan Dasar (Pedoman Wajib)

### 1. Teknologi & Versi
- **Framework**: Next.js **App Router** (bukan Pages Router).
- **Bahasa**: **TypeScript** wajib digunakan. Tidak ada kode JavaScript mentah.
- **Styling**: **Tailwind CSS**. Dilarang keras menggunakan CSS kustom di file `.css` tanpa instruksi eksplisit. Semua gaya harus via utility class.
- **Indentation**: **Wajib 2 spasi** untuk semua file (TypeScript, JSX, CSS, MD, dll).
- **Folder Structure**:
  - App: `src/app/...`
  - Components: `src/components/...`
  - Utilities: `src/lib/...`

### 2. Kebijakan Planning (Planning Gate)
- **Dilarang langsung coding**. Agen harus selalu mulai dengan **Rencana Implementasi (Implementation Plan)** terlebih dahulu.
- Rencana harus memuat: list library yang perlu diinstal, pemecahan UI menjadi komponen (`.tsx`), dan diagram flow data.
- Setelah rencana disetujui user, baru boleh lanjut ke instalasi library dan coding.
- Rencana harus diakhiri dengan pertanyaan persetujuan (misal: "Apakah rencana ini disetujui, dan apakah kita bisa mulai mengeksekusi Fase 1?").

### 3. Konvensi Penulisan Kode
- Semua file komponen harus dibungkus dalam satu fungsi utama (`export default function Page() { ... }`).
- React Hooks (`useState`, `useEffect`, `useClient`) wajib diimpor dari `react`.
- Penggunaan library pihak ketiga (seperti library grafik) harus selalu didahului dengan instalasi dan impor yang benar.

## 🛠️ Daftar Library yang Direkomendasikan (dan Wajib Ada)

### A. UI & Styling (Sudah terinstal/siap pakai)
- **Next.js**: Core framework.
- **React**: Core UI library.
- **Tailwind CSS**: Styling framework.
- **Lucide React**: Ikon UI.

### B. Library yang Perlu Diinstal
- `recharts`: Untuk visualisasi data (grafik).
- `lucide-react`: Jika belum ada, untuk ikon-ikon UI.
- (Library lain akan ditambahkan sesuai kebutuhan task).

## 📂 Struktur Proyek yang Diharapkan
```
src/
├── app/                 # App Router (layout.tsx, page.tsx, loading.tsx, not-found.tsx)
├── components/          # Komponen reusable
│   ├── UI/               # Komponen atomik (Button, Input, Card)
│   ├── Features/         # Komponen fitur spesifik (ScheduleCard, CourseForm)
│   └── Layout/           # Komponen layout (Navbar, Sidebar)
├── lib/                 # Fungsi helper, hooks, konstanta
├── services/            # Client/server functions untuk API calls
└── types/               # Definisi TypeScript interface/type
```

## 🔄 Pedoman Eksekusi per Fitur

### 1. Dashboard (Page: /)
- **Fungsi**: Menampilkan ringkasan data (total materi, jadwal terdekat).
- **Komponen**: `Navbar`, `ScheduleCard`, `StatsCard`, `TrendChart` (Recharts).

### 2. Halaman Materi (List & Detail: /materi)
- **Fungsi**: Menampilkan daftar materi yang dipelajari.
- **Komponen**: `MaterialCard`, `FilterBar`, `Pagination`.
- **Data Handling**: Menggunakan client-side fetch jika data kompleks, atau server components jika data statis.

### 3. Halaman Jadwal (List & Form: /jadwal)
- **Fungsi**: Menampilkan jadwal belajar dan formulir input/edit jadwal.
- **Komponen**: `ScheduleCard`, `ScheduleForm`.
- **Data Handling**: Wajib memisahkan antara *Action* (POST/PUT) dan *View* (GET).

## 📋 Instruksi Debugging (Troubleshooting)
Jika terjadi error (terutama dari Tailwind atau sintaks TS/JSX), agen harus:
1. Melakukan validasi sintaks TypeScript dan JSX.
2. Memeriksa apakah className Tailwind sudah benar dan sesuai dengan konfigurasi Tailwind.
3. Jika error terkait typing, periksa file di folder `types/` atau `lib/`.

## 📝 Instruksi Akhir
Setiap kali memulai tugas baru, agen harus selalu menunjukkan **rencana** terlebih dahulu, bukan langsung menulis kode. Hal ini untuk memastikan struktur dan strategi yang dipilih sudah sesuai dengan kaidah App Router dan Tailwind CSS.

<!-- END:nextjs-agent-rules -->
