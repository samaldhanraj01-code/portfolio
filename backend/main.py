from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel, EmailStr, field_validator
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import re

load_dotenv()

# ── Rate Limiter ──────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Dhanraj Samal Portfolio API",
    docs_url=None,   # Disable /docs in production
    redoc_url=None,  # Disable /redoc in production
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS ──────────────────────────────────────────────────────────────────────
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# ── Supabase ──────────────────────────────────────────────────────────────────
SUPABASE_URL: str = os.getenv("SUPABASE_URL")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_KEY must be set in .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# ── Models ────────────────────────────────────────────────────────────────────

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str = ""
    message: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v):
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        if len(v) > 100:
            raise ValueError("Name too long")
        return v

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, v):
        return v.strip()[:200]

    @field_validator("message")
    @classmethod
    def validate_message(cls, v):
        v = v.strip()
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters")
        if len(v) > 2000:
            raise ValueError("Message too long (max 2000 chars)")
        return v


# ── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "ok", "message": "Portfolio API running"}


@app.post("/contact")
@limiter.limit("5/minute")
async def submit_contact(request: Request, data: ContactMessage):
    """Save contact form submission to Supabase. Rate limited: 5/min per IP."""
    try:
        supabase.table("contact_messages").insert({
            "name": data.name,
            "email": data.email,
            "subject": data.subject,
            "message": data.message,
        }).execute()

        return {"success": True, "message": "Message sent successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again.")
