import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import attendanceApi from './server/attendance.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',').map((origin) => origin.trim()).filter(Boolean);

// Setup multipart form data handling
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    // Allow common document types
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});

app.use(express.json({ limit: '2mb' }));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use('/api', attendanceApi);

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const emailFrom = process.env.EMAIL_FROM;
const emailTo = process.env.EMAIL_TO;
const smtpSecure = process.env.SMTP_SECURE === 'true';

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[char]));

if (!smtpHost || !smtpUser || !smtpPass || !emailFrom || !emailTo) {
  console.warn('⚠️  Missing SMTP environment variables. Please configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, and EMAIL_TO in .env.');
  console.warn('    Pesan akan dikirim ke: ' + emailTo);
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

app.post('/api/send-email', upload.array('attachments', 5), async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const subject = String(req.body.subject || '').trim().replace(/[\r\n]+/g, ' ').slice(0, 160);
  const message = String(req.body.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nama, email, dan pesan wajib diisi.' });
  }
  if (name.length > 120 || email.length > 254 || message.length > 10000) {
    return res.status(400).json({ error: 'Nama, email, atau pesan terlalu panjang.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Alamat email tidak valid.' });
  }
  if (!smtpHost || !smtpUser || !smtpPass || !emailFrom || !emailTo) {
    return res.status(503).json({ error: 'Layanan email belum dikonfigurasi. Silakan hubungi melalui email yang tertera.' });
  }

  try {
    // Prepare attachments
    const attachments = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        attachments.push({
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        });
      });
    }

    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: subject || `Pesan baru dari portfolio: ${name}`,
      text: `Nama: ${name}\nEmail: ${email}\nSubjek: ${subject || '-'}\n\nPesan:\n${message}`,
      html: `<div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;"><h2 style="color: #1E3A8A;">Pesan baru dari portfolio</h2><p><strong>Nama:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p><p><strong>Subjek:</strong> ${escapeHtml(subject || '-')}</p><p><strong>Pesan:</strong></p><div style="background-color: #f5f5f5; padding: 12px; border-radius: 6px; border-left: 3px solid #1E3A8A;">${escapeHtml(message).replace(/\n/g, '<br>')}</div>${attachments.length > 0 ? `<p><strong>Lampiran:</strong> ${attachments.map((a) => escapeHtml(a.filename)).join(', ')}</p>` : ''}</div>`,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Pesan berhasil dikirim!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return res.status(500).json({ error: 'Gagal mengirim pesan. Silakan cek konfigurasi SMTP.' });
  }
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'Ukuran lampiran maksimal 10 MB per file.'
      : 'Lampiran tidak valid atau batas jumlah file terlampaui.';
    return res.status(400).json({ error: message });
  }
  if (error) {
    return res.status(400).json({ error: error.message || 'Permintaan tidak valid.' });
  }
  next();
});

app.listen(port, () => {
  console.log(`\n✅ Email backend berjalan di http://localhost:${port}`);
  console.log(`📨 Pesan akan dikirim ke: ${emailTo}\n`);
});
