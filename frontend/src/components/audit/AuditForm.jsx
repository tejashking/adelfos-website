import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const schema = z.object({
  business_name: z.string().min(2, "Enter your business name").max(160),
  website: z.string().max(200).optional().or(z.literal("")),
  industry: z.string().min(2, "Select the industry").max(120),
  city: z.string().min(2, "Add your city or service area").max(120),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().max(40).optional().or(z.literal("")),
  primary_goal: z.string().min(10, "Tell us what growth goal matters most").max(500),
  monthly_budget: z.string().min(1, "Choose a budget range"),
  current_channels: z.string().min(2, "Tell us what channels you use today").max(500),
  website_url: z.string().max(0).optional(),
});

const BUDGETS = [
  ["under-5k", "Under $5,000"],
  ["5k-15k", "$5,000 – $15,000"],
  ["15k-50k", "$15,000 – $50,000"],
  ["50k-plus", "$50,000+"],
  ["undecided", "Not sure yet"],
];

const Field = ({ label, error, children, id }) => (
  <div className="relative">
    <label htmlFor={id} className="eyebrow block mb-2">{label}</label>
    {children}
    {error && <p role="alert" className="mt-2 text-xs text-[#ff3131]">{error.message}</p>}
  </div>
);

export const AuditForm = () => {
  const started = useRef(Date.now());
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const [result, setResult] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { monthly_budget: "", website: "", phone: "" },
  });

  const onSubmit = async (data) => {
    setStatus("loading");
    setServerError("");
    try {
      const response = await axios.post(`${API}/audits`, { ...data, started_at: started.current });
      setResult(response.data);
      setStatus("success");
      trackEvent("audit_submit", { business: data.business_name, budget: data.monthly_budget });
      reset();
    } catch (e) {
      setStatus("error");
      setServerError(e.response?.data?.detail?.[0]?.msg || e.response?.data?.detail || "Something went wrong. Please try again or email us directly.");
    }
  };

  if (status === "success" && result) {
    return (
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-3 text-[#ff3131]">
          <CheckCircle2 size={18} />
          <span className="eyebrow">Audit received</span>
        </div>
        <h3 className="display-md mt-6">Your growth score is <span className="text-[#ff3131]">{result.score}/100</span></h3>
        <p className="mt-4 text-neutral-600 max-w-xl">We have captured your business context and built a first-pass view of the biggest growth blockers and the fastest wins.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow text-neutral-500">Priority issues</p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              {result.issues.map((issue) => (
                <li key={issue} className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[#ff3131]" aria-hidden="true" />{issue}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-neutral-500">Recommended next moves</p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              {result.recommendations.map((item) => (
                <li key={item} className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-black" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <button type="button" onClick={() => setStatus("idle")} className="mt-10 link-underline font-mono text-xs uppercase tracking-[0.2em]" data-testid="audit-send-another">Submit another audit</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="audit-form" className="space-y-8 rounded-[2rem] border border-[#e5e5e5] bg-white p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)]">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
        <Field id="business_name" label="Business name *" error={errors.business_name}><input id="business_name" {...register("business_name")} className="field" placeholder="Northline Developments" autoComplete="organization" data-testid="input-business-name" /></Field>
        <Field id="website" label="Website" error={errors.website}><input id="website" type="url" {...register("website")} className="field" placeholder="https://company.com" autoComplete="url" data-testid="input-website" /></Field>
        <Field id="industry" label="Industry *" error={errors.industry}><input id="industry" {...register("industry")} className="field" placeholder="Real estate, home services, SaaS..." data-testid="input-industry" /></Field>
        <Field id="city" label="City / service area *" error={errors.city}><input id="city" {...register("city")} className="field" placeholder="Calgary, AB" data-testid="input-city" /></Field>
        <Field id="email" label="Email *" error={errors.email}><input id="email" type="email" {...register("email")} className="field" placeholder="you@company.com" autoComplete="email" data-testid="input-email" /></Field>
        <Field id="phone" label="Phone" error={errors.phone}><input id="phone" type="tel" {...register("phone")} className="field" placeholder="+1 (403) 000-0000" autoComplete="tel" data-testid="input-phone" /></Field>
        <Field id="monthly_budget" label="Monthly budget *" error={errors.monthly_budget}>
          <select id="monthly_budget" {...register("monthly_budget")} className="field" data-testid="select-budget">
            <option value="">Select a range</option>
            {BUDGETS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
      </div>

      <Field id="primary_goal" label="Primary growth goal *" error={errors.primary_goal}>
        <textarea id="primary_goal" rows={3} {...register("primary_goal")} className="field resize-none" placeholder="We want more qualified leads from local search, website conversion and paid campaigns." data-testid="textarea-goal" />
      </Field>

      <Field id="current_channels" label="Current channels *" error={errors.current_channels}>
        <textarea id="current_channels" rows={3} {...register("current_channels")} className="field resize-none" placeholder="Google Ads, Meta, SEO, referrals, email, organic social..." data-testid="textarea-channels" />
      </Field>

      <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website_url">Leave this empty</label>
        <input id="website_url" tabIndex={-1} autoComplete="off" {...register("website_url")} />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" className="border border-[#ff3131]/60 bg-[#fff3f3] text-[#ff3131] text-sm p-4 rounded-lg">{serverError}</motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <button type="submit" disabled={status === "loading"} data-testid="audit-submit" className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
          <span>{status === "loading" ? "Analyzing" : "Get my audit"}</span>
          {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} className="arrow" />}
        </button>
        <p className="text-xs text-neutral-500 max-w-xs">A quick review of your business, channels and goals. No sales pressure. Just a clear next step.</p>
      </div>
    </form>
  );
};
