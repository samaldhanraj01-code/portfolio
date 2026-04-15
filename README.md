# 🚀 Dhanraj Samal — Portfolio Website

Personal portfolio website of **Dhanraj Samal**, an aspiring .NET & Software Developer from Ahmedabad, Gujarat.

[![Live Demo](https://img.shields.io/badge/Live-Demo-38BDF8?style=for-the-badge)](https://dhanrajsamal.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/dhanraj-samal-627b73245)

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML — all sections
├── style.css               # All styles + responsive CSS
├── script.js               # Animations, typing effect, form handler
├── profile.jpg             # Profile photo
├── photo.jpg               # Resume photo
├── .gitignore
├── README.md
│
└── backend/                # FastAPI + Supabase backend
    ├── main.py             # API routes
    ├── requirements.txt    # Python dependencies
    ├── .env.example        # Environment template (copy to .env)
    ├── supabase_schema.sql # Database setup SQL
    └── README.md           # Backend setup guide
```

---

## 🌐 Frontend

Pure HTML, CSS, JavaScript — no frameworks.

**Features:**
- Fully responsive (mobile, tablet, desktop, large screens)
- Smooth scroll animations & reveal effects
- Typing animation in hero section
- Animated skill progress bars
- Contact form connected to backend API
- SEO optimized with Open Graph & Twitter Card meta tags

**Sections:**
1. Hero — Name, photo, typing animation, stats
2. About — Bio, contact info card
3. Skills — .NET, SQL, Java, JavaScript, C++, Soft Skills
4. Experience — Timeline (Internship + Work history)
5. Education — BCA, 12th, Certifications
6. Contact — Form + Social links

---

## ⚙️ Backend Setup

### Requirements
- Python 3.10+
- Supabase account

### Steps

**1. Install dependencies**
```bash
cd backend
pip install -r requirements.txt
```

**2. Setup environment**
```bash
cp backend/.env.example backend/.env
# Fill in your Supabase URL and Key
```

**3. Setup Supabase database**
- Go to [supabase.com](https://supabase.com) → Your Project → SQL Editor
- Paste and run `backend/supabase_schema.sql`

**4. Run server**
```bash
cd backend
uvicorn main:app --reload
```

Server: `http://localhost:8000`

---

## 🔒 Security

- Rate limiting: 5 requests/minute per IP on `/contact`
- Input validation & sanitization via Pydantic
- CORS restricted to allowed origins
- `.env` excluded from git via `.gitignore`
- No sensitive keys in source code

---

## 📬 Contact

| | |
|---|---|
| 📧 Email | dhanrajsamal2002@gmail.com |
| 📱 Phone | +91 9376495990 |
| 💼 LinkedIn | [dhanraj-samal-627b73245](https://www.linkedin.com/in/dhanraj-samal-627b73245) |
| 💬 WhatsApp | [Chat Now](https://wa.me/919376495990) |

---

## 📄 License

This project is open source. Feel free to use it as a reference.
