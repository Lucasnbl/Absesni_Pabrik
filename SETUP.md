# 📧 Setup Email Backend - Portfolio Lucas Vincent Kurniawan

## 🎯 Ringkas
Pesan dari form contact akan dikirim ke **EMAIL_TO** di `.env` file kamu menggunakan akun SMTP **EMAIL_FROM** atau **SMTP_USER**.

---

## 📮 Flow Pengiriman Email

```
[Contact Form] 
    ↓ (POST /api/send-email)
[Express Backend: server.js] 
    ↓ (nodemailer)
[SMTP Server] 
    ↓
[EMAIL_TO - Inbox Kamu] ✅
```

**Contoh:**
- Visitor mengisi form dengan nama "Budi", email "budi@example.com", pesan "Halo"
- Server backend mengirim email ke: `lucasnbl111@gmail.com` (EMAIL_TO)
- Email tersebut akan terlihat dari: "Budi <smtp_user@domain.com>" (EMAIL_FROM)
- Reply-To field: budi@example.com

---

## ⚙️ Setup SMTP Untuk Berbagai Provider

### 1️⃣ **GMAIL** (Rekomendasi untuk awal)

**Langkah:**

1. Buka https://myaccount.google.com/security
2. Scroll ke "How you sign in to Google"
3. Aktifkan **2-Step Verification**
4. Setelah itu, buka https://myaccount.google.com/apppasswords
5. Pilih "Mail" dan "Windows Computer" (atau device kamu)
6. Google akan generate **App Password** (16 karakter)
7. Copy app password tersebut

**Isi di `.env`:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_16_digit
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=your_email@gmail.com
```

**Note:** Jangan pakai password Gmail biasa, harus App Password

---

### 2️⃣ **OUTLOOK / MICROSOFT 365**

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_outlook_password
EMAIL_FROM=your_email@outlook.com
EMAIL_TO=lucasnbl111@gmail.com
```

---

### 3️⃣ **ZOHO MAIL**

```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@zoho.com
SMTP_PASS=your_zoho_password
EMAIL_FROM=your_email@zoho.com
EMAIL_TO=lucasnbl111@gmail.com
```

---

### 4️⃣ **SENDGRID**

1. Buat akun di https://sendgrid.com
2. Generate API Key di Settings → API Keys
3. Username selalu: `apikey`

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.your_sendgrid_api_key_long_string
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=lucasnbl111@gmail.com
```

---

### 5️⃣ **CUSTOM DOMAIN** (Hosting Cpanel, Plesk, etc)

Hubungi hosting provider untuk mendapatkan:
- SMTP Host (biasanya `mail.yourdomain.com` atau `smtp.yourdomain.com`)
- SMTP Port (biasanya 465 atau 587)
- Username & Password

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@yourdomain.com
SMTP_PASS=your_email_password
EMAIL_FROM=your_email@yourdomain.com
EMAIL_TO=your_email@yourdomain.com
```

---

## 🚀 Cara Menjalankan

### 1. Setup Environment File

```bash
# Copy contoh file
cp .env.example .env

# Edit .env dengan text editor
# Pilih salah satu konfigurasi SMTP di atas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Backend (Terminal 1)

```bash
npm run backend
```

Output:
```
✅ Email backend berjalan di http://localhost:4000
📨 Pesan akan dikirim ke: lucasnbl111@gmail.com
```

### 4. Jalankan Frontend (Terminal 2)

```bash
npm run dev
```

Output:
```
  VITE v6.3.5  ready in 123 ms
  ➜  Local:   http://localhost:5173/
```

### 5. Test Form

1. Buka http://localhost:5173/
2. Scroll ke section "Contact"
3. Isi form dengan data kamu
4. Upload file (opsional)
5. Klik "Kirim Pesan"
6. Cek inbox email kamu untuk verifikasi

### Deploy ke GitHub Pages atau Hosting Static

GitHub Pages hanya menayangkan frontend dan tidak bisa menjalankan backend SMTP. Agar form tetap mengirim email di situs publik:

1. Deploy `server.js` ke hosting Node.js dan tambahkan kredensial SMTP sebagai environment variables di hosting tersebut.
2. Set `EMAIL_TO` ke `lucasnbl111@gmail.com` (atau inbox tujuan yang kamu pilih).
3. Set `CORS_ORIGINS` ke origin situs portfolio, misalnya `https://username.github.io`.
4. Set `VITE_API_BASE_URL` ke URL publik backend, lalu build dan deploy ulang frontend.

Jangan taruh `SMTP_PASS` di variabel frontend `VITE_*` atau di source code. Form mengirim email setelah pengunjung menekan tombol **Kirim Pesan**.

---

## 📎 Fitur File Upload

### Support Format:
- PDF (`.pdf`)
- Word (`.doc`, `.docx`)
- Excel (`.xls`, `.xlsx`)
- Text (`.txt`)
- Image (`.jpg`, `.jpeg`, `.png`, `.gif`)

### Batasan:
- Max 5 file per form
- Max 10MB per file
- Total max ~50MB

### Penggunaan:
1. Klik tombol "Klik untuk upload file atau drag & drop"
2. Atau drag & drop file langsung ke area tersebut
3. File akan terlihat di list bawah
4. Klik X untuk remove file
5. Submit form - file akan dikirim sebagai attachment

---

## ✅ Checklist Setup Pertama Kali

- [ ] Copy `.env.example` → `.env`
- [ ] Pilih SMTP provider dan isi data di `.env`
- [ ] Test SMTP (https://www.gmass.co/smtp-test untuk Gmail)
- [ ] `npm install`
- [ ] `npm run backend` (Terminal 1)
- [ ] `npm run dev` (Terminal 2)
- [ ] Test form di Contact section
- [ ] Cek email masuk di inbox

---

## 🐛 Troubleshooting

### Email tidak terkirim
1. Cek `.env` - pastikan semua field terisi
2. Cek terminal backend - ada error message?
3. Untuk Gmail: pastikan sudah 2FA + App Password
4. Cek firewall - port 587/465 terbuka?

### Port 4000 sudah digunakan
```bash
# Gunakan port lain
PORT=5000 npm run backend
```

### File terlalu besar
- Max 10MB per file
- Compress file terlebih dahulu jika > 10MB

---

## 📧 Pesan Sample yang Diterima

Subject: `Pesan baru dari portfolio: Nama Visitor`

Body (plain text):
```
Nama: Budi Santoso
Email: budi@example.com
Subjek: Kolaborasi Project

Pesan:
Halo Lucas, saya tertarik berkolaborasi untuk project web app...
```

Body (HTML) dengan styling dan preview attachment nama file.

---

## 🔒 Keamanan

- File upload terbatas ukuran & type
- SMTP credentials di `.env` (excluded dari git)
- Form validation di frontend & backend
- CORS whitelist untuk localhost hanya

---

## 💬 Q&A

**Q: Pesan dikirim ke email mana?**
A: Ke `EMAIL_TO` di `.env` kamu. Default: `lucasnbl111@gmail.com` (bisa diubah)

**Q: Dari email mana pesan dikirim?**
A: Dari `EMAIL_FROM` (harus SMTP authenticated user)

**Q: Visitor bisa kirim lampiran?**
A: Ya, 5 file max, 10MB per file, format PDF/DOC/IMG/TXT

**Q: Perlu database?**
A: Tidak, semua langsung ke email

**Q: Deploy ke production bagaimana?**
A: Backend harus running di server. Bisa pakai:
- Railway.app (free tier)
- Render.com
- Replit
- VPS dengan Node.js

---

Jika ada pertanyaan, tanya aja! 🚀
