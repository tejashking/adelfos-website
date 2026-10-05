from fastapi import FastAPI, APIRouter, Header, HTTPException, Query, Request
from fastapi.responses import FileResponse
from dotenv import dotenv_values, load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import html
import time
import asyncio
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = ROOT_DIR.parent
PUBLIC_DIR = PROJECT_ROOT / 'frontend' / 'public'
load_dotenv(ROOT_DIR / '.env')
load_dotenv(ROOT_DIR / '.env.local')
file_env = dotenv_values(ROOT_DIR / '.env')

MONGO_URL = os.environ.get('MONGO_URL')
DB_NAME = os.environ.get('DB_NAME') or 'adelfos'

if os.environ.get('APP_ENV') == 'production' and not MONGO_URL:
    raise RuntimeError('MONGO_URL is required in production to persist leads and audits.')


class MemoryCollection:
    def __init__(self):
        self._documents = []

    async def insert_one(self, document):
        self._documents.append(document)
        return type('InsertResult', (), {'inserted_id': str(uuid.uuid4())})()

    async def count_documents(self, filter=None):
        return len(self._documents)

    async def list_documents(self, limit=50):
        return list(reversed(self._documents[-limit:]))

    async def update_one(self, identifier, status):
        for document in self._documents:
            if document.get("id") == identifier or document.get("lead_id") == identifier:
                document["status"] = status
                return True
        return False


memory_db = type('MemoryDB', (), {
    'contact_submissions': MemoryCollection(),
    'leads': MemoryCollection(),
    'audits': MemoryCollection(),
})()
client = None
db = memory_db

if MONGO_URL:
    try:
        client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=2000)
        db = client[DB_NAME]
    except Exception as exc:
        logger = logging.getLogger(__name__)
        logger.warning('MongoDB unavailable, falling back to in-memory storage: %s', exc)
        db = memory_db

RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', '')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', '')
ADMIN_API_TOKEN = file_env.get('ADMIN_API_TOKEN') or os.environ.get('ADMIN_API_TOKEN', '')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(title="Adelfos Marketing API")
api_router = APIRouter(prefix="/api")

SERVICES = {
    "digital-advertising", "social-media-management", "seo", "brand-building",
    "web-design-development", "app-development", "conversion-rate-optimization",
    "marketing-advisory", "graphic-design", "2d-3d-design", "real-estate", "not-sure",
}
BUDGETS = {"under-5k", "5k-15k", "15k-50k", "50k-plus", "undecided"}

_rate: dict[str, list[float]] = {}


def clean(value: str, limit: int) -> str:
    value = re.sub(r"<[^>]*>", "", value or "")
    return html.escape(value.strip())[:limit]


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    company: Optional[str] = Field(default="", max_length=120)
    website: Optional[str] = Field(default="", max_length=200)
    service: str
    budget: str
    details: str = Field(min_length=10, max_length=4000)
    website_url: Optional[str] = ""  # honeypot
    started_at: Optional[int] = None

    @field_validator("service")
    @classmethod
    def valid_service(cls, v):
        if v not in SERVICES:
            raise ValueError("Unknown service")
        return v

    @field_validator("budget")
    @classmethod
    def valid_budget(cls, v):
        if v not in BUDGETS:
            raise ValueError("Unknown budget")
        return v


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    company: str = ""
    website: str = ""
    service: str
    budget: str
    details: str
    created_at: str
    emailed: bool = False
    status: str = "new"


class AuditCreate(BaseModel):
    business_name: str = Field(min_length=2, max_length=160)
    website: Optional[str] = Field(default="", max_length=200)
    industry: str = Field(min_length=2, max_length=120)
    city: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    primary_goal: str = Field(min_length=10, max_length=500)
    monthly_budget: str = Field(min_length=2, max_length=40)
    current_channels: str = Field(min_length=2, max_length=500)
    website_url: Optional[str] = ""
    started_at: Optional[int] = None

    @field_validator("monthly_budget")
    @classmethod
    def valid_budget(cls, v):
        if v not in {"under-5k", "5k-15k", "15k-50k", "50k-plus", "undecided"}:
            raise ValueError("Unknown budget")
        return v


class AuditSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    lead_id: str
    business_name: str
    website: str = ""
    industry: str
    city: str
    email: str
    phone: str = ""
    primary_goal: str
    monthly_budget: str
    current_channels: str
    score: int
    issues: list[str]
    recommendations: list[str]
    created_at: str
    status: str = "new"


class LeadStatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def valid_status(cls, v):
        if v not in {"new", "contacted", "qualified", "closed"}:
            raise ValueError("Unknown lead status")
        return v


def rate_limited(ip: str, scope: str = "generic") -> bool:
    now = time.time()
    key = f"{scope}:{ip}"
    hits = [t for t in _rate.get(key, []) if now - t < 3600]
    _rate[key] = hits
    if len(hits) >= 5:
        return True
    hits.append(now)
    return False


async def notify(sub: ContactSubmission) -> bool:
    if not (RESEND_API_KEY and SENDER_EMAIL and NOTIFY_EMAIL):
        return False
    rows = "".join(
        f"<tr><td style='padding:6px 12px;color:#888;font-size:12px;text-transform:uppercase'>{k}</td>"
        f"<td style='padding:6px 12px;color:#111'>{v or '—'}</td></tr>"
        for k, v in [("Name", sub.name), ("Email", sub.email), ("Phone", sub.phone), ("Company", sub.company),
                     ("Website", sub.website), ("Service", sub.service), ("Budget", sub.budget)]
    )
    body = (f"<div style='font-family:Arial,sans-serif;max-width:600px'>"
            f"<h2 style='margin:0 0 16px;color:#000'>New project inquiry</h2>"
            f"<table style='border-collapse:collapse;width:100%'>{rows}</table>"
            f"<p style='margin-top:20px;padding:16px;background:#f7f7f7;color:#111;white-space:pre-wrap'>{sub.details}</p></div>")
    params = {"from": SENDER_EMAIL, "to": [NOTIFY_EMAIL], "reply_to": sub.email,
              "subject": f"Adelfos inquiry — {sub.name} ({sub.service})", "html": body}
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:
        logger.error("Resend failed: %s", e)
        return False


@api_router.get("/")
async def root():
    return {"status": "ok", "service": "adelfos-api"}


@app.get("/")
async def api_landing():
    return {"status": "ok", "service": "adelfos-api", "health": "/api/", "docs": "/docs"}


@app.get("/robots.txt")
async def robots_txt():
    return FileResponse(PUBLIC_DIR / 'robots.txt')


@app.get("/sitemap.xml")
async def sitemap_xml():
    return FileResponse(PUBLIC_DIR / 'sitemap.xml')


@api_router.post("/contact", status_code=201)
async def create_contact(payload: ContactCreate, request: Request):
    if payload.website_url:
        return {"ok": True, "id": None}
    if payload.started_at and (time.time() * 1000 - payload.started_at) < 2500:
        raise HTTPException(status_code=400, detail="Form submitted too quickly")
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "unknown").split(",")[0].strip()
    if rate_limited(ip, "contact"):
        raise HTTPException(status_code=429, detail="Too many submissions. Please try again later.")
    sub = ContactSubmission(
        name=clean(payload.name, 120), email=payload.email.lower(), phone=clean(payload.phone, 40),
        company=clean(payload.company, 120), website=clean(payload.website, 200), service=payload.service,
        budget=payload.budget, details=clean(payload.details, 4000),
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    global db
    sub.emailed = await notify(sub)
    try:
        await db.contact_submissions.insert_one(sub.model_dump())
    except Exception as exc:
        logger.warning('MongoDB write failed, retrying with in-memory store: %s', exc)
        db = memory_db
        await memory_db.contact_submissions.insert_one(sub.model_dump())
    return {"ok": True, "id": sub.id, "emailed": sub.emailed}


@api_router.get("/contact/count")
async def contact_count():
    global db
    try:
        count = await db.contact_submissions.count_documents({})
    except Exception as exc:
        logger.warning('MongoDB count failed, reading in-memory store: %s', exc)
        db = memory_db
        count = await memory_db.contact_submissions.count_documents({})
    return {"count": count}


def build_audit_analysis(payload: AuditCreate) -> tuple[int, list[str], list[str]]:
    score = 35
    issues: list[str] = []
    recommendations: list[str] = []

    if payload.website and payload.website.startswith(("http://", "https://")):
        score += 15
    else:
        issues.append("Website URL is missing or incomplete.")
        recommendations.append("Add a primary website URL and basic landing page tracking.")

    if payload.primary_goal and len(payload.primary_goal) >= 10:
        score += 15
    else:
        issues.append("Primary business objective is unclear.")
        recommendations.append("Define a concrete growth goal such as leads, conversions, or local visibility.")

    if payload.current_channels and len(payload.current_channels.strip()) >= 2:
        score += 15
    else:
        issues.append("Current marketing channels are not clearly documented.")
        recommendations.append("List the channels already driving traffic and the gaps between them.")

    if payload.city and len(payload.city.strip()) >= 2:
        score += 10
    else:
        issues.append("City or service area is not specified.")
        recommendations.append("Clarify your primary service area so the strategy is local and relevant.")

    if payload.monthly_budget and payload.monthly_budget != "undecided":
        score += 10
    else:
        issues.append("Marketing budget is not yet defined.")
        recommendations.append("Confirm budget range so channel and landing page priorities are realistic.")

    if score < 50:
        issues.insert(0, "The current acquisition engine is not fully defined yet.")
        recommendations.insert(0, "Start with a focused local growth plan, conversion review and channel prioritisation.")
    elif score < 75:
        recommendations.insert(0, "Focus on the highest‑impact channels first and fix the conversion path before scaling spend.")
    else:
        recommendations.insert(0, "Keep momentum by tightening the offer, tracking quality, and increasing conversion efficiency.")

    score = max(0, min(100, score))
    return score, issues[:4], recommendations[:4]


@api_router.post("/audits", status_code=201)
async def create_audit(payload: AuditCreate, request: Request):
    global db
    if payload.website_url:
        return {"ok": True, "audit_id": None, "lead_id": None, "score": 0, "issues": [], "recommendations": []}
    if payload.started_at and (time.time() * 1000 - payload.started_at) < 2500:
        raise HTTPException(status_code=400, detail="Form submitted too quickly")

    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "unknown").split(",")[0].strip()
    if rate_limited(ip, "audit"):
        raise HTTPException(status_code=429, detail="Too many submissions. Please try again later.")

    score, issues, recommendations = build_audit_analysis(payload)
    lead_id = f"lead_{uuid.uuid4().hex[:8]}"
    audit = AuditSubmission(
        lead_id=lead_id,
        business_name=clean(payload.business_name, 160),
        website=clean(payload.website, 200),
        industry=clean(payload.industry, 120),
        city=clean(payload.city, 120),
        email=payload.email.lower(),
        phone=clean(payload.phone, 40),
        primary_goal=clean(payload.primary_goal, 500),
        monthly_budget=payload.monthly_budget,
        current_channels=clean(payload.current_channels, 500),
        score=score,
        issues=issues,
        recommendations=recommendations,
        created_at=datetime.now(timezone.utc).isoformat(),
    )

    lead_document = {
        "id": lead_id,
        "business_name": audit.business_name,
        "email": audit.email,
        "phone": audit.phone,
        "industry": audit.industry,
        "city": audit.city,
        "source": "audit",
        "score": score,
        "status": "new",
        "created_at": audit.created_at,
    }
    try:
        await db.leads.insert_one(lead_document)
        await db.audits.insert_one(audit.model_dump())
    except Exception as exc:
        logger.warning('MongoDB audit write failed, retrying with in-memory store: %s', exc)
        db = memory_db
        await memory_db.leads.insert_one(lead_document)
        await memory_db.audits.insert_one(audit.model_dump())

    return {
        "ok": True,
        "audit_id": audit.id,
        "lead_id": lead_id,
        "score": audit.score,
        "issues": audit.issues,
        "recommendations": audit.recommendations,
    }


@api_router.get("/admin/audits")
async def list_admin_audits(
    x_admin_token: Optional[str] = Header(default=None),
    limit: int = Query(default=50, ge=1, le=100),
):
    if not ADMIN_API_TOKEN or not x_admin_token or not secrets.compare_digest(x_admin_token, ADMIN_API_TOKEN):
        raise HTTPException(status_code=401, detail="Admin authentication required")

    global db
    try:
        if db is memory_db:
            audits = await db.audits.list_documents(limit)
        else:
            audits = await db.audits.find({}, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(length=limit)
    except Exception as exc:
        logger.warning('MongoDB audit list failed, reading in-memory store: %s', exc)
        db = memory_db
        audits = await memory_db.audits.list_documents(limit)

    return {"ok": True, "count": len(audits), "audits": audits}


@api_router.get("/admin/contacts")
async def list_admin_contacts(
    x_admin_token: Optional[str] = Header(default=None),
    limit: int = Query(default=50, ge=1, le=100),
):
    if not ADMIN_API_TOKEN or not x_admin_token or not secrets.compare_digest(x_admin_token, ADMIN_API_TOKEN):
        raise HTTPException(status_code=401, detail="Admin authentication required")

    global db
    try:
        if db is memory_db:
            contacts = await db.contact_submissions.list_documents(limit)
        else:
            contacts = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(length=limit)
    except Exception as exc:
        logger.warning('MongoDB contact list failed, reading in-memory store: %s', exc)
        db = memory_db
        contacts = await memory_db.contact_submissions.list_documents(limit)

    return {"ok": True, "count": len(contacts), "contacts": contacts}


@api_router.patch("/admin/leads/{lead_id}/status")
async def update_lead_status(
    lead_id: str,
    payload: LeadStatusUpdate,
    x_admin_token: Optional[str] = Header(default=None),
):
    if not ADMIN_API_TOKEN or not x_admin_token or not secrets.compare_digest(x_admin_token, ADMIN_API_TOKEN):
        raise HTTPException(status_code=401, detail="Admin authentication required")

    global db
    try:
        if db is memory_db:
            updated = await db.leads.update_one(lead_id, payload.status)
            updated = await db.audits.update_one(lead_id, payload.status) or updated
            updated = await db.contact_submissions.update_one(lead_id, payload.status) or updated
            if not updated:
                raise HTTPException(status_code=404, detail="Lead not found")
        else:
            result = await db.leads.update_one({"id": lead_id}, {"$set": {"status": payload.status}})
            await db.audits.update_one({"lead_id": lead_id}, {"$set": {"status": payload.status}})
            await db.contact_submissions.update_one({"id": lead_id}, {"$set": {"status": payload.status}})
            if result.matched_count == 0:
                raise HTTPException(status_code=404, detail="Lead not found")
    except HTTPException:
        raise
    except Exception as exc:
        logger.warning('MongoDB lead status update failed, retrying in-memory store: %s', exc)
        db = memory_db
        updated = await memory_db.leads.update_one(lead_id, payload.status)
        updated = await memory_db.audits.update_one(lead_id, payload.status) or updated
        updated = await memory_db.contact_submissions.update_one(lead_id, payload.status) or updated
        if not updated:
            raise HTTPException(status_code=404, detail="Lead not found")

    return {"ok": True, "lead_id": lead_id, "status": payload.status}


app.include_router(api_router)
cors_origins = [
    origin.strip() for origin in os.environ.get(
        'CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000'
    ).split(',') if origin.strip()
]
if not cors_origins:
    cors_origins = ['http://localhost:3000']
allow_all_origins = '*' in cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_credentials=not allow_all_origins,
    allow_origins=['*'] if allow_all_origins else cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()
