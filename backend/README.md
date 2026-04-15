# Portfolio Backend — FastAPI + Supabase

## Setup Steps

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) → Create new project
2. Go to **SQL Editor** → paste contents of `supabase_schema.sql` → Run
3. Go to **Settings → API** → copy:
   - `Project URL` → paste as `SUPABASE_URL` in `.env`
   - `anon public` key → paste as `SUPABASE_KEY` in `.env`

### 2. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure .env
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=your_anon_key_here
```

### 4. Run Server
```bash
cd backend
uvicorn main:app --reload
```

Server runs at: http://localhost:8000

### 5. API Docs
Visit: http://localhost:8000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/contact` | Submit contact form |
| GET | `/contact/messages` | Get all messages (admin) |

## Frontend
In `script.js`, change `API_URL` to your deployed backend URL when going live.
