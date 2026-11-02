# FeedMill Attendance

Aplikasi lokal untuk memantau kehadiran, karyawan, shift, cuti, lembur, laporan, dan impor CSV. Antarmuka menggunakan React, TypeScript yang diproses Vite, dan data REST dari Express. Zona waktu operasional adalah Asia/Jakarta.

## Jalankan lokal

Prasyarat: Node.js 20 atau lebih baru dan npm.

1. Jalankan `npm install`.
2. Di terminal pertama, jalankan `npm run backend` (API: `http://localhost:4000`).
3. Di terminal kedua, jalankan `npm run dev` lalu buka URL Vite yang ditampilkan (biasanya `http://localhost:5173`).
4. Untuk membuat build produksi frontend, jalankan `npm run build`.
5. Untuk menjalankan pengujian logika tanggal cuti, jalankan `npm test`.

API membuat `server/attendance-data.json` pada pemakaian pertama. File ini berisi simulasi lokal dan berubah mengikuti tindakan di aplikasi. Hapus file tersebut saat ingin mereset data demo. Jangan gunakan penyimpanan lokal ini untuk deployment produksi atau data karyawan nyata.

## Akun demo

Seluruh akun memakai kata sandi `Feedmill123!`:

| Peran | Nama pengguna |
| --- | --- |
| Karyawan | `karyawan` |
| Kepala bagian | `supervisor` |
| HRD | `hrd` |
| Manajemen | `manajemen` |
| Administrator IT | `adminit` |

Akun demo hanya untuk pengembangan lokal. Password disimpan sebagai hash scrypt dalam data simulasi.

## Modul yang tersedia

- Dashboard ringkasan dan tren yang mengambil metrik dari API.
- Catatan kehadiran, pencarian/filter, status data yang perlu ditinjau, dan ekspor CSV.
- Direktori anonim karyawan dengan tambah karyawan khusus HRD.
- Ringkasan shift pagi, sore, dan malam; shift malam menampilkan pergantian hari.
- Pengajuan, persetujuan, penolakan, pembatalan, dan saldo cuti tahunan. Server menghitung hari kerja Senin–Jumat, memakai kalender hari libur yang dapat dikonfigurasi di data, memecah pengajuan lintas tahun kalender, mendeteksi tanggal tumpang tindih, dan mengalokasikan pengajuan pending. Pembatalan cuti yang sudah disetujui memerlukan keputusan HRD/supervisor.
- Pengajuan serta persetujuan lembur.
- Laporan kehadiran/cuti/lembur dan ekspor CSV yang mengamankan teks berawalan formula spreadsheet.
- Impor CSV dengan pratinjau, validasi dasar, deteksi duplikasi, dan ringkasan kesalahan.
- Kebijakan kuota cuti dapat diubah HRD; aktivitas transaksi disimpan di audit log lokal.
- Lonceng notifikasi menampilkan contoh email pengajuan cuti; pengajuan baru memberi notifikasi internal ke HRD dan supervisor terkait. Pengiriman email eksternal belum dikonfigurasi.

Format CSV impor: `employee_code,date,clock_in,clock_out` dengan tanggal `YYYY-MM-DD`; jam memakai `HH:MM`.

## Batasan MVP

Versi ini memakai file JSON lokal agar dapat dijalankan dari repository dan dependensi yang tersedia. Ia belum memakai PostgreSQL/Prisma, migrasi database, mekanisme session produksi, kalender hari libur/shift yang dapat dikelola dari antarmuka, alur koreksi absensi, atau manajemen akun dan role. RBAC dan pembatasan cakupan record diterapkan pada endpoint inti, serta login dibatasi percobaannya secara sederhana dalam memori proses. Aplikasi ini belum siap untuk deployment atau data karyawan nyata; beberapa menu masih berupa ringkasan awal.

Tidak ada integrasi aktif ke Oracle ERP, fingerprint, atau face recognition. Untuk tahap berikutnya, perusahaan perlu menyediakan spesifikasi dan kredensial API resmi, pemetaan kode karyawan, mekanisme sinkronisasi yang disetujui, lingkungan PostgreSQL, serta kebijakan kalender/shift dan persetujuan.
