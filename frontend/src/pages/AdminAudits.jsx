import { useState } from "react";
import axios from "axios";
import { ArrowRight, Loader2, LockKeyhole, RefreshCw, Search } from "lucide-react";
import { SEO } from "@/components/layout/SEO";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;
const STATUS_OPTIONS = [["new", "New"], ["contacted", "Contacted"], ["qualified", "Qualified"], ["closed", "Closed"]];

const formatDate = (value) => {
  if (!value) return "Unknown date";
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
};

export default function AdminAudits() {
  const [token, setToken] = useState("");
  const [draftToken, setDraftToken] = useState("");
  const [audits, setAudits] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [minimumScore, setMinimumScore] = useState("0");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const loadAudits = async (adminToken = draftToken) => {
    setStatus("loading");
    setError("");
    try {
      const headers = { "X-Admin-Token": adminToken };
      const [auditResponse, contactResponse] = await Promise.all([
        axios.get(`${API}/admin/audits`, { headers, params: { limit: 100 } }),
        axios.get(`${API}/admin/contacts`, { headers, params: { limit: 100 } }),
      ]);
      setToken(adminToken);
      setAudits(auditResponse.data.audits || []);
      setContacts(contactResponse.data.contacts || []);
      setStatus("ready");
    } catch (requestError) {
      setStatus("error");
      setError(requestError.response?.data?.detail || "Could not load audits. Check the admin token and try again.");
    }
  };

  const updateStatus = async (leadId, nextStatus, collection) => {
    setError("");
    try {
      await axios.patch(`${API}/admin/leads/${leadId}/status`, { status: nextStatus }, { headers: { "X-Admin-Token": token } });
      const update = (item) => item.id === leadId || item.lead_id === leadId ? { ...item, status: nextStatus } : item;
      if (collection === "audit") setAudits((items) => items.map(update));
      if (collection === "contact") setContacts((items) => items.map(update));
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Could not update lead status.");
    }
  };

  const visibleAudits = audits.filter((audit) => {
    const haystack = [audit.business_name, audit.email, audit.industry, audit.city].join(" ").toLowerCase();
    return haystack.includes(query.toLowerCase()) && audit.score >= Number(minimumScore);
  });
  const visibleContacts = contacts.filter((contact) => {
    const haystack = [contact.name, contact.email, contact.company, contact.service].join(" ").toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <>
      <SEO title="Audit Dashboard | Adelfos Marketing" description="Internal audit dashboard" path="/admin/audits" noindex />
      <main className="min-h-screen bg-[#f7f7f7] pt-32 pb-20">
        <div className="container-x">
          <div className="flex flex-col gap-8 border-b border-[#dcdcdc] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Internal workspace</p>
              <h1 className="display-lg mt-5">Audit leads.</h1>
              <p className="mt-5 max-w-xl text-neutral-600">Review captured audit submissions, qualification scores and the context behind each lead.</p>
            </div>
            <form className="flex w-full max-w-md gap-3" onSubmit={(event) => { event.preventDefault(); loadAudits(); }}>
              <label htmlFor="admin-token" className="sr-only">Admin API token</label>
              <input id="admin-token" type="password" value={draftToken} onChange={(event) => setDraftToken(event.target.value)} className="field bg-white" placeholder="Admin API token" autoComplete="current-password" />
              <button type="submit" disabled={!draftToken || status === "loading"} className="btn btn-dark shrink-0 disabled:opacity-50">
                {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <LockKeyhole size={16} />}
                <span>Unlock</span>
              </button>
            </form>
          </div>

          {status === "error" && <p role="alert" className="mt-8 border border-[#ff3131]/60 bg-[#fff3f3] p-4 text-sm text-[#c52525]">{error}</p>}

          {status === "ready" && (
            <>
              <div className="mt-8 flex justify-end">
                <button type="button" onClick={() => loadAudits(token)} disabled={status === "loading"} className="btn btn-outline-dark disabled:opacity-50">
                  <RefreshCw size={16} className={status === "loading" ? "animate-spin" : ""} />
                  <span>Refresh leads</span>
                </button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="border border-[#e5e5e5] bg-white p-6"><p className="eyebrow text-neutral-500">Visible leads</p><p className="mt-3 text-4xl font-semibold">{visibleAudits.length}</p></div>
                <div className="border border-[#e5e5e5] bg-white p-6"><p className="eyebrow text-neutral-500">Average score</p><p className="mt-3 text-4xl font-semibold">{audits.length ? Math.round(audits.reduce((sum, audit) => sum + audit.score, 0) / audits.length) : 0}</p></div>
                <div className="border border-[#e5e5e5] bg-white p-6"><p className="eyebrow text-neutral-500">Highest score</p><p className="mt-3 text-4xl font-semibold text-[#ff3131]">{audits.length ? Math.max(...audits.map((audit) => audit.score)) : 0}</p></div>
              </div>
              <div className="mt-4 border border-[#e5e5e5] bg-white p-6"><p className="eyebrow text-neutral-500">Project inquiries</p><p className="mt-3 text-4xl font-semibold">{visibleContacts.length}</p></div>

              <div className="mt-12 flex flex-col gap-4 border-b border-[#dcdcdc] pb-6 sm:flex-row">
                <label className="relative flex-1"><Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" /><span className="sr-only">Search leads</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="field bg-white pl-11" placeholder="Search business, email, industry or city" /></label>
                <label className="sm:w-52"><span className="sr-only">Minimum score</span><select value={minimumScore} onChange={(event) => setMinimumScore(event.target.value)} className="field bg-white"><option value="0">All scores</option><option value="50">50+ score</option><option value="75">75+ score</option></select></label>
              </div>

              <div className="mt-8 space-y-4">
                {visibleAudits.length === 0 && <p className="border border-dashed border-[#cfcfcf] p-10 text-center text-neutral-500">No matching audit leads.</p>}
                {visibleAudits.map((audit) => (
                  <article key={audit.id} className="border border-[#e5e5e5] bg-white p-6 lg:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-semibold">{audit.business_name}</h2><span className="rounded-full bg-[#fff0f0] px-3 py-1 text-xs font-semibold text-[#ff3131]">{audit.score}/100</span></div><p className="mt-2 text-sm text-neutral-500">{audit.industry} · {audit.city} · {formatDate(audit.created_at)}</p></div>
                      <select aria-label={`Status for ${audit.business_name}`} value={audit.status || "new"} onChange={(event) => updateStatus(audit.lead_id, event.target.value, "audit")} className="field w-auto bg-white"><option disabled>Status</option>{STATUS_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
                      <a href={`mailto:${audit.email}`} className="btn btn-outline-dark self-start"><span>{audit.email}</span><ArrowRight size={16} /></a>
                    </div>
                    <div className="mt-6 grid gap-6 border-t border-[#ededed] pt-6 md:grid-cols-3"><div><p className="eyebrow text-neutral-500">Goal</p><p className="mt-2 text-sm text-neutral-700">{audit.primary_goal}</p></div><div><p className="eyebrow text-neutral-500">Budget</p><p className="mt-2 text-sm text-neutral-700">{audit.monthly_budget}</p></div><div><p className="eyebrow text-neutral-500">Channels</p><p className="mt-2 text-sm text-neutral-700">{audit.current_channels}</p></div></div>
                  </article>
                ))}
              </div>

              <div className="mt-16 border-t border-[#dcdcdc] pt-10">
                <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Contact pipeline</p><h2 className="mt-3 text-2xl font-semibold">Project inquiries.</h2></div><span className="text-sm text-neutral-500">{visibleContacts.length} visible</span></div>
                <div className="mt-6 space-y-4">
                  {visibleContacts.length === 0 && <p className="border border-dashed border-[#cfcfcf] p-10 text-center text-neutral-500">No matching project inquiries.</p>}
                  {visibleContacts.map((contact) => (
                    <article key={contact.id} className="border border-[#e5e5e5] bg-white p-6 lg:p-8">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"><div><h3 className="text-xl font-semibold">{contact.name}{contact.company ? ` · ${contact.company}` : ""}</h3><p className="mt-2 text-sm text-neutral-500">{contact.service} · {contact.budget} · {formatDate(contact.created_at)}</p></div><div className="flex flex-wrap gap-3"><select aria-label={`Status for ${contact.name}`} value={contact.status || "new"} onChange={(event) => updateStatus(contact.id, event.target.value, "contact")} className="field w-auto bg-white"><option disabled>Status</option>{STATUS_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><a href={`mailto:${contact.email}`} className="btn btn-outline-dark self-start"><span>{contact.email}</span><ArrowRight size={16} /></a></div></div>
                      <p className="mt-6 border-t border-[#ededed] pt-6 text-sm leading-relaxed text-neutral-700">{contact.details}</p>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}

          {status === "idle" && <div className="mt-16 border border-dashed border-[#cfcfcf] p-12 text-center text-neutral-500">Enter the admin token to load audit leads.</div>}
        </div>
      </main>
    </>
  );
}
