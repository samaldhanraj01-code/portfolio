# 🚀 Dhanraj Samal — Portfolio Website

Personal portfolio of **Dhanraj Samal**, an aspiring .NET & Software Developer from Ahmedabad, Gujarat.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/dhanraj-samal-627b73245)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail)](mailto:dhanrajsamal2002@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat-25D366?style=flat-square&logo=whatsapp)](https://wa.me/919376495990)

---

## 📁 Project Structure

```
portfolio/
│
├── 📄 README.md
├── 📄 .gitignore
│
├── 🌐 frontend/
│   ├── index.html          # Main HTML — all sections
│   ├── style.css           # Styles + full responsive CSS
│   └── script.js           # Animations, typing, form handler
│
├── 🖼️ assets/
│   └── images/
│       ├── profile.jpg     # Main profile photo
│       └── photo-resume.jpg
│
└── ⚙️ backend/
    ├── main.py             # FastAPI app — API routes
    ├── requirements.txt    # Python dependencies
    ├── .env.example        # Environment template
    ├── supabase_schema.sql # Supabase DB setup SQL
    └── README.md           # Backend setup guide
```

---

## 🌐 Frontend

Pure **HTML + CSS + JavaScript** — zero frameworks, zero dependencies.

| Feature | Details |
|---------|---------|
| Responsive | Mobile (320px) → Large Desktop (1400px+) |
| Animations | Scroll reveal, typing effect, progress bars |
| SEO | Open Graph, Twitter Card, meta tags |
| Performance | No JS frameworks, optimized CSS |
| Accessibility | ARIA labels, semantic HTML |

**Sections:** Hero · About · Skills · Experience · Education · Contact

---

## ⚙️ Backend

**FastAPI** + **Supabase** (PostgreSQL)

### Quick Start

```bash
# 1. Install dependencies
cd backend
pip install -r requirements.txt

# 2. Setup environment
cp .env.example .env
# Edit .env with your Supabase credentials

# 3. Setup database
# Go to Supabase Dashboard → SQL Editor
# Paste & run: backend/supabase_schema.sql

# 4. Start server
uvicorn main:app --reload
```

Server runs at: `http://localhost:8000`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/contact` | Submit contact form (rate limited: 5/min) |

---

## 🔒 Security

- ✅ Rate limiting — 5 requests/minute per IP
- ✅ Input validation & sanitization (Pydantic)
- ✅ CORS restricted to allowed origins
- ✅ `.env` excluded from git
- ✅ No hardcoded secrets in source code
- ✅ SQL injection protected via Supabase client

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS |
| Backend | Python, FastAPI, Uvicorn |
| Database | Supabase (PostgreSQL) |
| Hosting | GitHub Pages (frontend) |

---

## 📬 Contact

| | |
|---|---|
| 📧 Email | dhanrajsamal2002@gmail.com |
| 📱 Phone | +91 9376495990 |
| 💼 LinkedIn | [dhanraj-samal-627b73245](https://www.linkedin.com/in/dhanraj-samal-627b73245) |
| 💬 WhatsApp | [wa.me/919376495990](https://wa.me/919376495990) |
| 📍 Location | Ahmedabad, Gujarat, India |

---

© 2025 Dhanraj Samal. All rights reserved.
