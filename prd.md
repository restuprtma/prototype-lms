# Product Requirements Document (PRD)
## Venturo LMS: Platform Pembelajaran AI Terapan Premium

**Tanggal:** 16 Juli 2026
**Dokumen Status:** Draft
**Pemilik Produk:** Venturo Product Team

---

## 1. Executive Summary
**Venturo LMS** adalah platform sistem manajemen pembelajaran (*Learning Management System*) premium yang dikembangkan secara eksklusif oleh Venturo. Memosisikan diri sebagai *boutique specialist*, platform ini difokuskan pada penyediaan kursus praktis dan terapan mengenai penggunaan *Artificial Intelligence* (AI) untuk mempermudah dan mengotomatisasi pekerjaan sehari-hari (*AI for Daily Work*). Venturo bertindak sebagai penyedia konten tunggal (mentor/tutor institusional), memastikan standar kualitas konten yang tinggi, layaknya model platform *Skila*.

Platform ini melayani dua model bisnis secara bersamaan:
1. **B2C (Business-to-Consumer):** Profesional individu yang ingin meningkatkan *skill* pemanfaatan AI secara mandiri dengan sistem *Pay-per-course*.
2. **B2B (Business-to-Business):** Korporasi yang ingin meningkatkan kapasitas timnya melalui *In-House Training* dengan sistem lisensi korporat (*bulk purchase/seats*) dan fasilitas *monitoring* kemajuan belajar karyawan.

---

## 2. Target Audience & User Personas

### A. Pengguna B2C (Individu)
**Persona: Budi, 32 tahun, Digital Marketer**
- **Tujuan:** Ingin belajar cara menggunakan ChatGPT dan Midjourney untuk membuat *copywriting* dan aset visual secara otomatis agar kerjanya lebih efisien.
- **Pain Points:** Terlalu banyak waktu habis untuk pekerjaan repetitif; tidak punya waktu untuk kursus berbulan-bulan; butuh materi yang *to-the-point* dan aplikatif.
- **Kebutuhan Platform:** Pembelian instan, langsung bisa akses video, materi pendukung (seperti template prompt) yang jelas.

### B. Pengguna B2B (Korporasi)
**Persona: Sarah, 40 tahun, HR Manager di Perusahaan Finansial**
- **Tujuan:** Ingin meningkatkan produktivitas tim *Finance* dengan melatih mereka menggunakan AI untuk analisis data dan otomatisasi pelaporan.
- **Pain Points:** Sulit melacak apakah karyawan benar-benar belajar dari *budget training* yang diberikan; pendaftaran satu-per-satu untuk puluhan karyawan sangat merepotkan.
- **Kebutuhan Platform:** Fitur *bulk purchase*, *Corporate Dashboard* untuk *invite* karyawan sekaligus, dan fitur analitik untuk memantau progress dan hasil *assessment* tiap karyawan.

---

## 3. User Roles & Permissions (Matriks Akses)

| Fitur/Akses | Super Admin (Venturo) | Corporate Admin / HR (B2B) | Student (B2C & Karyawan B2B) |
| :--- | :--- | :--- | :--- |
| **Manajemen Konten (Course)** | ✅ *Full Access* (Create, Edit, Delete) | ❌ | ❌ |
| **Akses Video & Materi Pembelajaran** | ✅ (Preview) | ❌ (Kecuali diberikan lisensi/seat) | ✅ (Hanya course yang dibeli/diberikan) |
| **Manajemen User** | ✅ *Full Access* semua user | ✅ (Hanya menambah/menghapus karyawan sendiri) | ❌ |
| **Pembelian / Checkout** | ❌ (Hanya memantau transaksi) | ✅ (Bisa request invoice / beli bulk seat) | ✅ (Bisa beli satuan via Payment Gateway) |
| **Melihat Analitik / Progress** | ✅ *Platform wide* revenue & engagement | ✅ *Company wide* (Progress karyawan sendiri) | ✅ *Personal* progress |
| **Akses Sertifikat** | ❌ | ✅ (Melihat sertifikat karyawan) | ✅ (Mengunduh sertifikat sendiri) |

---

## 4. User Stories

Berikut adalah 20 User Stories utama yang mencakup *End-to-End flow* platform:

**Registrasi & Authentication:**
1. *As a* Student, *I want to* mendaftar menggunakan email atau Google akun *so that* saya bisa mengakses platform dengan cepat.
2. *As a* Corporate Admin, *I want to* menerima email undangan eksklusif sebagai perusahaan *so that* saya bisa mengatur akun perusahaan saya dengan aman.

**Katalog & Checkout (B2C):**
3. *As a* Student, *I want to* melihat katalog course dengan deskripsi, silabus, dan *preview* video *so that* saya tahu apa yang akan saya pelajari.
4. *As a* Student, *I want to* menambahkan course ke keranjang dan melakukan *checkout* menggunakan QRIS atau Virtual Account *so that* saya bisa langsung mulai belajar.
5. *As a* Student, *I want to* menerima email konfirmasi pembayaran *so that* saya yakin transaksi saya berhasil.

**Manajemen B2B & Corporate Dashboard:**
6. *As a* Corporate Admin, *I want to* melihat sisa "seat" (kuota lisensi) yang dimiliki perusahaan saya *so that* saya tahu berapa banyak karyawan yang masih bisa diundang.
7. *As a* Corporate Admin, *I want to* mengundang karyawan saya secara massal via upload file CSV/Excel *so that* saya tidak perlu mendaftarkan mereka satu persatu.
8. *As a* Corporate Admin, *I want to* melihat dashboard *progress* belajar (berapa % selesai, nilai kuis) dari setiap karyawan *so that* saya bisa melaporkan efektivitas *training* ke manajemen.
9. *As a* Corporate Admin, *I want to* mencabut akses karyawan yang sudah *resign* dan memberikan *seat* tersebut ke karyawan baru *so that* investasi *training* perusahaan tidak terbuang.
10. *As a* Corporate Admin, *I want to* mengunduh laporan *progress* karyawan dalam bentuk PDF/Excel *so that* saya bisa menggunakannya untuk penilaian kinerja (KPI).

**Learning Flow & Course Player (Student):**
11. *As a* Student, *I want to* melihat daftar course yang saya miliki di *Personal Dashboard* *so that* saya bisa melanjutkan pembelajaran yang tertunda.
12. *As a* Student, *I want to* menonton video pembelajaran dalam *player* yang interaktif (bisa diatur kecepatan dan resolusinya) *so that* pengalaman belajar saya nyaman.
13. *As a* Student, *I want to* mengunduh *resource* tambahan seperti PDF atau *prompt template* *so that* saya bisa mempraktikkannya secara langsung.
14. *As a* Student, *I want to* mengklik *external link* yang disediakan (misal ke platform ChatGPT/Zapier) *so that* saya bisa menggunakan *tools* yang dibahas.
15. *As a* Student, *I want to* mengerjakan kuis/assessment di akhir modul *so that* saya tahu sejauh mana pemahaman saya.
16. *As a* Student, *I want to* mendapatkan dan mengunduh sertifikat digital secara otomatis setelah menyelesaikan seluruh video dan kuis *so that* saya bisa menambahkannya ke LinkedIn/CV saya.

**Super Admin (Venturo CMS):**
17. *As a* Super Admin, *I want to* mengunggah video materi, membuat kuis, dan menyusun kurikulum per *chapter* *so that* konten selalu *up-to-date*.
18. *As a* Super Admin, *I want to* melihat daftar transaksi yang berhasil dan gagal *so that* saya bisa memantau kesehatan finansial platform.
19. *As a* Super Admin, *I want to* membuat kupon diskon persentase atau nominal *so that* tim *marketing* bisa menjalankan *campaign* B2C.
20. *As a* Super Admin, *I want to* membuat tagihan manual (*custom invoice*) untuk klien korporasi B2B *so that* perusahaan bisa membayar via transfer bank secara B2B.

---

## 5. Functional Requirements

### A. Modul Authentication & Profiling
- **Login/Register:** Dukungan OAuth (Google) dan form Standar (Email/Password). Fitur lupa sandi.
- **Profil User:** Upload foto profil, jabatan, nama perusahaan (otomatis terisi untuk karyawan B2B, manual untuk B2C), riwayat pembelian, ubah *password*.

### B. Modul Katalog & E-Commerce (Checkout B2C)
- **Halaman Katalog:** *Grid view* course, filter berdasarkan kategori (misal: *AI for HR, AI for Finance*), dan fitur pencarian.
- **Halaman Detail Course:** Menampilkan *trailer* video, deskripsi lengkap, hasil yang diharapkan (*learning outcomes*), *instructor bio* (Venturo experts), silabus lengkap, dan harga.
- **Sistem Checkout:** Integrasi *Payment Gateway* lokal (Mendukung QRIS, Virtual Account bank besar, Credit Card, dan E-Wallet).
- **Sistem Kupon:** *Input field* untuk kode promo di halaman *checkout* yang akan memotong subtotal transaksi.

### C. Modul Corporate Dashboard (B2B)
- **Ringkasan Lisensi:** Menampilkan jumlah lisensi paket (*seats*) total, lisensi terpakai, dan sisa kuota yang bisa digunakan untuk invitasikan karyawan.
- **Employee Management:** Fitur *Add Employee* (Single email input & Bulk upload CSV). Fitur *Revoke Access* untuk menonaktifkan akun karyawan dan mengambil kembali "seat" jika dibutuhkan.
- **Analytics Dashboard:** Grafik persentase tingkat partisipasi dan *progress* belajar rata-rata perusahaan. Tabel daftar karyawan berserta status pembelajaran (*Not Started, In Progress x%, Completed*) dan perolehan nilai *assessment* terakhir.
- **Export Data:** Fitur ekspor data *progress* karyawan perusahaan tersebut ke format `.csv` atau `.xlsx`.

### D. Modul Learning / Course Player
- **Interactive Player:** Layout *split-screen* (video di bagian tengah utama, navigasi silabus babak-babak kursus di *sidebar* kanan). Mendukung kontrol kecepatan video (1x, 1.25x, 1.5x) dan auto-play pelajaran selanjutnya.
- **Materi Pendukung:** Tab khusus di bawah video player untuk mengunduh *attachments* (PDF, docx, txt) dan *External Links* (untuk mengakses *tools* AI eksternal yang sedang dipelajari).
- **Assessment Engine:** Mesin kuis berbasis soal pilihan ganda di setiap penghujung bab dengan parameter *passing grade* (misal: harus lulus 80% untuk membuka modul berikutnya).
- **Certificate Generator:** Sistem *auto-generate* PDF sertifikat dengan nama *student*, nama *course*, tanggal lulus, logo Venturo, dan ID validasi unik.

### E. Modul Admin Venturo (CMS)
- **Course Builder:** Fitur untuk menyusun hierarki materi (*Section/Chapter -> Lesson -> Quiz*). Fitur unggah video dan berkas tambahan per *lesson*.
- **Order & Financial Management:** Tabel daftar transaksi yang masuk (B2C & B2B), riwayat pergerakan dana, pengaturan paket harga, dan fitur *generate invoice/quotation* manual untuk memfasilitasi transaksi B2B.
- **User Management (Super Admin):** Pengaturan *CRUD* seluruh entitas *user* platform, memberikan hak akses *Corporate Admin* secara spesifik kepada perwakilan klien perusahaan.

---

## 6. Non-Functional Requirements

- **Performa:** Respons halaman utama dan perpindahan menu *dashboard* dirancang maksimal berada di bawah 3 detik. *Video streaming* menggunakan infrastruktur *Content Delivery Network (CDN)* untuk meminimalisir kemungkinan *buffering*.
- **Keamanan:** 
  - Enkripsi *password* standar industri (Argon2 / bcrypt). 
  - Proteksi video dari ekstraksi paksa menggunakan kombinasi *HLS encryption DRM* (bila memungkinkan) atau pencegahan unduh standar (*disable right-click & developer tools* pada player).
  - Pembatasan upaya login (*rate limiting*) guna menekan risiko *brute force*.
- **Aksesibilitas & Responsivitas:** Implementasi *mobile-first approach* pada antarmuka *student* (beroperasi secara maksimal baik di *smartphone*, tablet, maupun desktop). Elemen teks dan kontras tombol menyesuaikan standar aksesibilitas WCAG.
- **Skalabilitas:** Kapasitas komputasi arsitektur di-*backend* dan *database* harus dapat menangani lonjakan sesi *login* secara bersamaan (konkurensi tinggi), terutama saat *Corporate Training* wajib diadakan serentak oleh beberapa perusahaan.

---

## 7. Monetization & User Journey

### A. Alur Pembelian Pengguna Individu (B2C - Automasi Penuh)
1. User masuk ke *landing page*, memilih *course* di katalog yang sesuai dengan bidang mereka.
2. Membaca *Learning Outcomes* -> Klik "Beli Course Ini".
3. Proses diarahkan untuk Login atau Pendaftaran Akun baru.
4. Masuk halaman *Checkout*, validasi voucher diskon, dan memilih metode pembayaran instan (misal: QRIS).
5. User melakukan *scan barcode* dan pembayaran lunas di aplikasi *banking/e-wallet*.
6. Sistem memproses notifikasi (*webhook*) dari payment gateway -> *Course* secara otomatis aktif di dalam *Personal Dashboard*.
7. User langsung mengklik "Mulai Belajar".

### B. Alur Pembelian Korporasi (B2B - Pendekatan Penjualan B2B)
1. Perwakilan perusahaan (HR/Manager) mengisi form "Hubungi Sales untuk Perusahaan" di halaman utama untuk permintaan paket khusus.
2. Tim Sales / Admin Venturo melakukan tindak lanjut via *offline* / *email* -> Kesepakatan dicapai atas pembelian volume besar (contoh: lisensi 50 karyawan untuk course "AI for HR").
3. Admin Venturo membuatkan akun **Corporate Admin** di CMS, memasok kuota 50 *seats* ke akun perusahaan tersebut, lalu mengirimkan tagihan resmi (*Invoice* B2B).
4. Pihak korporasi menyelesaikan transfer bank -> Admin Venturo memverifikasi dan menyalakan lisensi perusahaan dalam sistem.
5. Corporate Admin Login ke *Corporate Dashboard* dan mengunggah CSV berisi daftar 50 email karyawannya.
6. Sistem otomatis melayangkan *email invitation* resmi yang mengandung tautan aktivasi akun ke seluruh 50 karyawan tersebut.
7. Para karyawan menekan tautan, menata *password*, dan saat *login*, materi *course* sudah aktif di akunnya masing-masing.
8. HR/Corporate Admin dapat memantau indikator sejauh mana karyawan merampungkan materinya via *Dashboard* analitik B2B kapanpun.

---

## 8. Teknologi & Integrasi (Saran Tech Stack)

Agar platform LMS Venturo tampil *seamless*, responsif layaknya aplikasi web premium, serta bertenaga kuat untuk klien *Corporate*:
- **Frontend (Web App):** **Next.js (React)** bersama Tailwind CSS. Penggunaan Next.js memfasilitasi kebutuhan SEO yang superior (SSR untuk halaman Katalog/Landing) disamping memberikan pengalaman interaktif *Single Page Application* yang sangat cepat di area LMS/Player.
- **Backend (API):** **Golang** (direkomendasikan untuk stabilitas beban tinggi di *microservices* tertentu) atau **Node.js/NestJS** (memudahkan kesinambungan dengan developer React).
- **Database:** **PostgreSQL** (skema Relasional wajib untuk menata hierarki yang presisi antara Transaksi, Karyawan, Perusahaan, dan Progress Modul).
- **Video Hosting/Streaming:** **Mux** atau **Vimeo Pro/Premium**. *Mux* sangat disarankan bagi aplikasi edukasi kustom karena API-nya luar biasa mutakhir untuk memonitor analitik perilaku penonton dan penyandian *streaming*.
- **Payment Gateway:** **Midtrans** atau **Xendit**, unggul melayani pasar digital lokal (fitur *Virtual Account*, QRIS, dan memfasilitasi integrasi sub-tagihan untuk ekosistem B2B).
- **Cloud Infrastructure:** **AWS** atau **Google Cloud Platform (GCP)** memanfaatkan fitur *auto-scaling server* dalam menjaga ketahanan *uptime*.

---
**-- END OF PRD --**
