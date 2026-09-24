"""Adelfos Marketing backend API tests (FastAPI /api/contact, /api/contact/count, static SEO files).

IMPORTANT: POST /api/contact is rate limited to 5 successful (non-honeypot, non-rejected)
submissions per IP per hour. This suite intentionally makes only 2 successful submissions
so the UI flow can also submit once.
"""
import re
import time

import pytest
import requests

VALID = {
    "name": "TEST_QA Bot",
    "email": "TEST_qa@example.com",
    "phone": "+1 403 000 0000",
    "company": "TEST_Co",
    "website": "https://example.com",
    "service": "seo",
    "budget": "5k-15k",
    "details": "We would like help ranking in Calgary for local search terms.",
}


def old_started_at():
    return int((time.time() - 10) * 1000)


# --- Module: health / root ---
class TestHealth:
    def test_api_root(self, api_client, api_url):
        r = api_client.get(f"{api_url}/api/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "ok"
        assert data["service"] == "adelfos-api"

    def test_contact_count(self, api_client, api_url):
        r = api_client.get(f"{api_url}/api/contact/count")
        assert r.status_code == 200, r.text
        assert isinstance(r.json()["count"], int)


# --- Module: contact validation (these do NOT consume rate limit) ---
class TestContactValidation:
    def test_missing_all_fields_422(self, api_client, api_url):
        r = api_client.post(f"{api_url}/api/contact", json={})
        assert r.status_code == 422, r.text
        assert "detail" in r.json()

    def test_invalid_service_422(self, api_client, api_url):
        payload = {**VALID, "service": "not-a-service", "started_at": old_started_at()}
        r = api_client.post(f"{api_url}/api/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_invalid_budget_422(self, api_client, api_url):
        payload = {**VALID, "budget": "1-million", "started_at": old_started_at()}
        r = api_client.post(f"{api_url}/api/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_invalid_email_422(self, api_client, api_url):
        payload = {**VALID, "email": "nope", "started_at": old_started_at()}
        r = api_client.post(f"{api_url}/api/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_short_name_and_details_422(self, api_client, api_url):
        payload = {**VALID, "name": "A", "details": "short", "started_at": old_started_at()}
        r = api_client.post(f"{api_url}/api/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_too_fast_submission_400(self, api_client, api_url):
        payload = {**VALID, "started_at": int(time.time() * 1000)}
        r = api_client.post(f"{api_url}/api/contact", json=payload)
        assert r.status_code == 400, r.text
        assert "quickly" in r.json()["detail"].lower()



# --- Module: contact creation + persistence (consumes 2 of 5 rate-limit slots) ---
class TestContactCreate:
    def test_honeypot_silently_accepted_not_stored(self, api_client, api_url):
        before = api_client.get(f"{api_url}/api/contact/count").json()["count"]
        payload = {**VALID, "website_url": "http://spam.example", "started_at": old_started_at()}
        r = api_client.post(f"{api_url}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["ok"] is True
        assert data["id"] is None
        after = api_client.get(f"{api_url}/api/contact/count").json()["count"]
        assert after == before, "honeypot submission must not be stored"

    def test_valid_submission_increments_count(self, api_client, api_url):
        before = api_client.get(f"{api_url}/api/contact/count").json()["count"]
        payload = {**VALID, "started_at": old_started_at()}
        r = api_client.post(f"{api_url}/api/contact", json=payload)
        if r.status_code == 429:
            pytest.skip("Rate limit already reached for this IP")
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["ok"] is True
        assert isinstance(data["id"], str) and len(data["id"]) > 10
        assert data["emailed"] is False  # Resend disabled intentionally
        assert "_id" not in data
        after = api_client.get(f"{api_url}/api/contact/count").json()["count"]
        assert after == before + 1

    def test_minimal_payload_without_started_at(self, api_client, api_url):
        payload = {
            "name": "TEST_Minimal",
            "email": "TEST_Minimal@Example.COM",
            "service": "not-sure",
            "budget": "undecided",
            "details": "Just exploring options for our Calgary storefront right now.",
        }
        r = api_client.post(f"{api_url}/api/contact", json=payload)
        if r.status_code == 429:
            pytest.skip("Rate limit already reached for this IP")
        assert r.status_code == 201, r.text
        assert r.json()["ok"] is True


# --- Module: audit creation + validation ---
class TestAuditCreate:
    def test_missing_audit_fields_422(self, api_client, api_url):
        r = api_client.post(f"{api_url}/api/audits", json={})
        assert r.status_code == 422, r.text

    def test_valid_audit_submission_creates_record(self, api_client, api_url):
        payload = {
            "business_name": "Northline Developments",
            "website": "https://northline.example",
            "industry": "real-estate",
            "city": "Calgary",
            "email": "hello@example.com",
            "phone": "+1 403 555 0123",
            "primary_goal": "Generate qualified buyer leads",
            "monthly_budget": "15k-50k",
            "current_channels": "Google Ads, Meta, SEO",
            "started_at": old_started_at(),
        }
        r = api_client.post(f"{api_url}/api/audits", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["ok"] is True
        assert data["score"] >= 0
        assert isinstance(data["issues"], list)
        assert isinstance(data["recommendations"], list)
        assert data["lead_id"]


# --- Module: protected audit dashboard ---
class TestAdminAudits:
    def test_audit_list_requires_admin_token(self, api_client, api_url):
        r = api_client.get(f"{api_url}/api/admin/audits")
        assert r.status_code == 401, r.text

    def test_contact_list_requires_admin_token(self, api_client, api_url):
        r = api_client.get(f"{api_url}/api/admin/contacts")
        assert r.status_code == 401, r.text

    def test_lead_status_update_requires_admin_token(self, api_client, api_url):
        r = api_client.patch(f"{api_url}/api/admin/leads/lead_test/status", json={"status": "qualified"})
        assert r.status_code == 401, r.text

# --- Module: static SEO files served by frontend ---
class TestStaticSeo:
    def test_sitemap(self, api_url):
        r = requests.get(f"{api_url}/sitemap.xml", timeout=30)
        assert r.status_code == 200
        locs = re.findall(r"<loc>(.*?)</loc>", r.text)
        assert len(locs) == 30, f"expected 30 loc entries, got {len(locs)}"

    def test_robots(self, api_url):
        r = requests.get(f"{api_url}/robots.txt", timeout=30)
        assert r.status_code == 200
        assert re.search(r"(?im)^Sitemap:\s*http", r.text)
