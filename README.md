<div align="center">
  <img src="https://img.shields.io/badge/Venturo-LMS-blue?style=for-the-badge&logo=react" alt="Venturo LMS" />
  <h1>🚀 Venturo LMS Prototype</h1>
  <p><strong>Platform Pembelajaran AI Terapan Premium untuk Profesional (B2C) & Korporasi (B2B)</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Lucide_Icons-FF6C37?style=flat-square&logo=lucide" alt="Lucide React" />
  </p>
</div>

<hr />

## 📖 Deskripsi Proyek

**Venturo LMS** adalah sebuah purwarupa (prototype) sistem manajemen pembelajaran digital modern yang dirancang dengan antarmuka premium dan arsitektur Next.js App Router terkini. Platform ini melayani tiga jenis pengguna sekaligus:
1. **Student (B2C & Karyawan B2B):** Ruang belajar dengan model split-screen, pemutar video interaktif, sistem kuis, dan pencetakan sertifikat.
2. **Corporate Admin (B2B):** Dasbor korporasi untuk memantau performa karyawan, mengundang tim secara massal (Bulk Invite), dan manajemen kuota lisensi (*Seats*).
3. **Super Admin (CMS):** Sistem *back-office* untuk Venturo mengelola konten kelas, modul silabus, memantau transaksi (QRIS & B2B Invoice), dan manajemen entitas *user*.

## ✨ Fitur Utama

- **Modern & Responsive UI:** Menggunakan komponen khusus berbasis `Tailwind CSS` dengan fokus pada desain premium (*Glassmorphism*, gradien halus, animasi mikro).
- **Split-Screen Learning:** Pengalaman belajar bebas distraksi di ruang kelas digital yang menyandingkan *Video Player* dengan *Syllabus Timeline*.
- **Role-Based Access Dashboard:** Desain tata letak dasbor yang dinamis berubah sesuai peran (*Student*, *Corporate*, *Super Admin*).
- **Mock API Data:** Disimulasikan dengan asinkronus lokal `delay` pada lapisan arsitektur yang siap disambungkan ke *Backend API* sungguhan.
- **Client & Server Components:** Pemisahan ketat antara sisi server (SEO, keamanan) dan klien (interaktivitas) berdasarkan *best practice* Next.js terbaru.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (tanpa framework komponen eksternal)
- **Language:** TypeScript
- **Icons:** Lucide React
- **Mock DB:** JSON Local Data (Simulasi Database)

## 🚀 Panduan Menjalankan Proyek

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/restuprtma/prototype-lms.git
   cd prototype-lms
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan *Development Server*:**
   ```bash
   npm run dev
   ```

4. **Buka di Browser:**
   Akses `http://localhost:3000` untuk melihat hasil proyek.

## 📁 Struktur Direktori

```text
src/
├── app/                 # Halaman utama (App Router)
│   ├── (auth)/          # Halaman Login/Register
│   ├── admin/           # Dasbor Super Admin (CMS)
│   ├── corporate/       # Dasbor Corporate Admin (B2B)
│   ├── student/         # Dasbor Student & Ruang Belajar
│   └── courses/         # Halaman Katalog & Detail Kelas
├── components/          # Kumpulan komponen modular
│   ├── Features/        # Komponen kompleks (Cards, Modals, Forms)
│   ├── Layout/          # Navigasi (Navbar, Sidebar, Footer)
│   └── UI/              # Komponen atomik (Buttons, Badges, Inputs)
├── lib/                 # Utilitas, simulasi API, dan Mock Data
└── types/               # Definisi tipe TypeScript global
```

<br />

<div align="center">
  <sub>Dibangun dengan ❤️ menggunakan teknologi web terbaru.</sub>
</div>
