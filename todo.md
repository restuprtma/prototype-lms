# Definition of Done (DoD)

Untuk AI Agent yang akan mengeksekusi instruksi ini, PATUHI aturan berikut secara mutlak:
1. **Semua penulisan kode harus menggunakan indentasi mutlak 2 spasi. Tidak boleh kurang, tidak boleh lebih.**
2. Gunakan **Next.js App Router** (`src/app/`). Jangan membuat struktur Pages Router.
3. Gunakan **TypeScript** secara konsisten. Buat definisi *interface* sebelum mengimplementasikan komponen atau halaman.
4. Semua komponen UI wajib dibuat menggunakan **Tailwind CSS** (utility classes) tanpa menyentuh file `.css` terpisah.
5. Gunakan Lucide-React untuk seluruh kebutuhan ikon (e.g. `import { Home } from 'lucide-react'`).
6. Setelah kode selesai ditulis dan disimpan, perbarui file todo.md dengan mengubah tanda [ ] menjadi [x] pada baris yang bersangkutan.

---

# Task Checklist (Dekomposisi Berdasarkan PRD)

## Fase 1: Konfigurasi Tipe Data & Skema Mock Data (JSON)
- [x] Buat file `src/types/index.ts` dan definisikan interface: `User`, `Course`, `CorporateLicense`, `Enrollment`, dan `Transaction`.
- [x] Buat file `src/lib/mockData/users.json` untuk data dummy yang menampung Super Admin, Corporate Admin, Student B2C, dan Student B2B.
- [x] Buat file `src/lib/mockData/courses.json` dengan atribut: id, title, description, price, thumbnail, silabus (array modul/lesson), dan learning outcomes.
- [x] Buat file `src/lib/mockData/corporate_licenses.json` dengan atribut: companyId, totalSeats, usedSeats, list karyawan, dan rata-rata partisipasi.
- [x] Buat file `src/lib/mockData/enrollments.json` dengan data persentase tontonan per modul dan nilai assessment kuis per student.
- [x] Buat file `src/lib/mockData/transactions.json` dengan riwayat pembelian B2C (QRIS dummy) dan tagihan B2B (Invoice dummy).
- [x] Buat fungsi pembantu di `src/lib/api.ts` (misal: `getCourses()`, `getUser(id)`) yang mengembalikan *Promise* berisi data JSON lokal.

## Fase 2: Dekomposisi Komponen UI (Atomic)

### 2A. Global UI Components (UI Library)
- [x] Buat komponen `src/components/UI/Button.tsx` dengan props: `variant` (primary, secondary, outline), `size`, `children`, `onClick`.
- [x] Buat komponen `src/components/UI/Input.tsx` dengan props: `type`, `placeholder`, `value`, `onChange`, `icon`.
- [x] Buat komponen `src/components/UI/Badge.tsx` dengan props: `text`, `color` (green, red, yellow, gray).
- [x] Buat komponen `src/components/UI/ProgressBar.tsx` dengan props: `progress` (nilai 0-100).
- [x] Buat komponen `src/components/UI/Modal.tsx` dengan props: `isOpen`, `onClose`, `title`, `children`.

### 2B. Komponen Katalog & Autentikasi
- [x] Buat komponen `src/components/Features/CourseCard.tsx` dengan props: `title`, `thumbnail`, `price`, `instructor`, dan link detail.
- [x] Buat komponen `src/components/Features/FilterSidebar.tsx` dengan props: `categories` array, `onSelect`.
- [x] Buat komponen `src/components/Features/CheckoutSummary.tsx` dengan perhitungan total dan input promo code.
- [x] Buat komponen `src/components/Features/AuthForm.tsx` untuk toggle antara Login dan Register.

### 2C. Komponen Corporate Dashboard (B2B)
- [x] Buat komponen `src/components/Features/SeatOverviewCard.tsx` dengan props: `totalSeats`, `usedSeats` dan _visualize_ sisa kuota.
- [x] Buat komponen `src/components/Features/EmployeeTable.tsx` dengan kolom nama, status progress, skor kuis, dan props `onRevokeAccess`.
- [x] Buat komponen `src/components/Features/BulkInviteModal.tsx` berisi form input _textarea_ (untuk multiple email) atau drag-n-drop CSV.

### 2D. Komponen Learning Player
- [x] Buat komponen `src/components/Features/VideoPlayer.tsx` berisi elemen `<video>` sederhana dengan mock controls dan simulasi HLS.
- [x] Buat komponen `src/components/Features/SyllabusSidebar.tsx` yang me-render nested list dari chapter ke lesson. Beri _highlight_ pada lesson aktif.
- [x] Buat komponen `src/components/Features/MaterialTabs.tsx` untuk switch tampilan antara tab "Attachments" (contoh unduh PDF) dan tab "External Links" (seperti link ChatGPT).
- [x] Buat komponen `src/components/Features/QuizForm.tsx` berisi radio button soal pilihan ganda, tombol submit, dan pop-up hasil (Lulus/Gagal).
- [x] Buat komponen `src/components/Features/CertificatePreview.tsx` untuk tampilan PDF mock.

### 2E. Komponen Layouting Global
- [x] Buat komponen `src/components/Layout/PublicNavbar.tsx` untuk halaman tanpa login (Hero, Catalog).
- [x] Buat komponen `src/components/Layout/DashboardSidebar.tsx` yang menunya reaktif bergantung pada props `role` (Student, Corp Admin, Super Admin).
- [x] Buat komponen `src/components/Layout/Footer.tsx`.

## Fase 3: Perakitan Halaman (Route Structure)

### 3A. Public & Auth Pages
- [x] Buat halaman `src/app/page.tsx` (Landing page) yang menyatukan komponen `PublicNavbar`, Header Banner, dan deretan `CourseCard`.
- [x] Buat halaman `src/app/login/page.tsx` dan render `AuthForm`.
- [x] Buat halaman `src/app/courses/page.tsx` menampilkan halaman katalog grid dengan `FilterSidebar`.
- [x] Buat halaman `src/app/courses/[id]/page.tsx` untuk render detail lengkap silabus, trailer video, dan komponen `CheckoutSummary`.

### 3B. Student Area (B2C & B2B Employee)
- [ ] Buat layout `src/app/student/layout.tsx` untuk render `DashboardSidebar` (role="student").
- [ ] Buat halaman `src/app/student/dashboard/page.tsx` menampilkan daftar kursus yang sudah dibeli dengan `ProgressBar` untuk masing-masing kursus.
- [ ] Buat layout `src/app/student/learn/[courseId]/layout.tsx` (hilangkan elemen navbar/footer standar untuk pengalaman *fullscreen*).
- [ ] Buat halaman `src/app/student/learn/[courseId]/page.tsx` dengan struktur _Split-Screen_: Kiri memuat `VideoPlayer` & `MaterialTabs`, Kanan memuat `SyllabusSidebar`.

### 3C. Corporate Admin Area (B2B)
- [ ] Buat layout `src/app/corporate/layout.tsx` untuk render `DashboardSidebar` (role="corporate").
- [ ] Buat halaman `src/app/corporate/dashboard/page.tsx` untuk render `SeatOverviewCard` dan _dummy chart_ (progress perusahaan).
- [ ] Buat halaman `src/app/corporate/employees/page.tsx` untuk me-render `EmployeeTable` dan tombol buka `BulkInviteModal`.

### 3D. Super Admin Area (Venturo CMS)
- [ ] Buat layout `src/app/admin/layout.tsx` untuk render `DashboardSidebar` (role="admin").
- [ ] Buat halaman `src/app/admin/courses/page.tsx` berisi tabel daftar course dan form "Create Course".
- [ ] Buat halaman `src/app/admin/transactions/page.tsx` menampilkan tabel riwayat transaksi (`transactions.json`).
- [ ] Buat halaman `src/app/admin/users/page.tsx` untuk tabel manajemen seluruh entitas pengguna.
