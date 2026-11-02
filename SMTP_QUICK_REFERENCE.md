# Quick Reference - SMTP Settings

## Gmail (Easiest for beginners)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=your_email@gmail.com
```
**Setup:** Enable 2FA → Get App Password from https://myaccount.google.com/apppasswords

---

## Outlook
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
EMAIL_FROM=your_email@outlook.com
EMAIL_TO=lucasnbl111@gmail.com
```

---

## Zoho
```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@zoho.com
SMTP_PASS=your_password
EMAIL_FROM=your_email@zoho.com
EMAIL_TO=lucasnbl111@gmail.com
```

---

## SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.your_api_key
EMAIL_FROM=noreply@domain.com
EMAIL_TO=lucasnbl111@gmail.com
```

---

## Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=postmaster@yourdomain.mailgun.org
SMTP_PASS=your_password
EMAIL_FROM=noreply@yourdomain.mailgun.org
EMAIL_TO=lucasnbl111@gmail.com
```

---

## Your Own Domain (cPanel/Plesk)
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@yourdomain.com
SMTP_PASS=your_password
EMAIL_FROM=your_email@yourdomain.com
EMAIL_TO=your_email@yourdomain.com
```
**Note:** Contact your hosting provider for correct SMTP host & port

---

## Key Points
- **EMAIL_FROM**: Must be valid SMTP authenticated user
- **EMAIL_TO**: Can be any email address (where you receive messages)
- **SMTP_SECURE**: true = port 465 (SSL), false = port 587 (TLS)
- **SMTP_PASS**: Use App Password for Gmail, not your actual password

Run backend:
```bash
npm run backend
```

Run frontend:
```bash
npm run dev
```
