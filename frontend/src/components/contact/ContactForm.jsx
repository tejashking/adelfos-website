import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { services } from "@/data/services";
import { trackEvent } from "@/lib/analytics";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")),
  service: z.string().min(1, "Choose a service"),
  budget: z.string().min(1, "Choose a budget range"),
  details: z.string().min(10, "Tell us a little more (10+ characters)").max(4000),
  website_url: z.string().max(0).optional(),
});

const BUDGETS = [["under-5k", "Under $5,000"], ["5k-15k", "$5,000 – $15,000"], ["15k-50k", "$15,000 – $50,000"], ["50k-plus", "$50,000+"], ["undecided", "Not sure yet"]];

const Field = ({ label, error, children, id }) => (
  <div className="relative">
    <label htmlFor={id} className="eyebrow block mb-1">{label}</label>
    {children}
    {error && <p role="alert" data-testid={`error-${id}`} className="mt-2 text-xs text-[#ff3131]">{error.message}</p>}
  </div>
);

export const ContactForm = () => {
  const started = useRef(Date.now());
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema), defaultValues: { service: "", budget: "" } });

  const onSubmit = async (data) => {
    setStatus("loading"); setServerError("");
    try {
      await axios.post(`${API}/contact`, { ...data, started_at: started.current });
      setStatus("success"); trackEvent("contact_submit", { service: data.service }); reset();
    } catch (e) {
      setStatus("error");
      setServerError(e.response?.data?.detail?.[0]?.msg || e.response?.data?.detail || "Something went wrong. Email us directly and we will reply quickly.");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} data-testid="contact-success" className="border border-[#e5e5e5] p-10 lg:p-14">
        <p className="eyebrow">Received</p>
        <p className="display-md mt-6">Thank you.<br />We'll be in touch <span className="text-[#ff3131]">shortly.</span></p>
        <p className="mt-6 text-neutral-600 max-w-md">Expect a reply within one business day. If it is urgent, message us on WhatsApp.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 link-underline font-mono text-xs uppercase tracking-[0.2em]" data-testid="contact-send-another">Send another message</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="contact-form" className="space-y-10">
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
        <Field id="name" label="Name *" error={errors.name}><input id="name" {...register("name")} className="field" placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} data-testid="input-name" /></Field>
        <Field id="email" label="Email *" error={errors.email}><input id="email" type="email" {...register("email")} className="field" placeholder="you@company.com" autoComplete="email" aria-invalid={!!errors.email} data-testid="input-email" /></Field>
        <Field id="phone" label="Phone" error={errors.phone}><input id="phone" type="tel" {...register("phone")} className="field" placeholder="+1 (403) 000-0000" autoComplete="tel" data-testid="input-phone" /></Field>
        <Field id="company" label="Company" error={errors.company}><input id="company" {...register("company")} className="field" placeholder="Company name" autoComplete="organization" data-testid="input-company" /></Field>
        <Field id="website" label="Website" error={errors.website}><input id="website" type="url" {...register("website")} className="field" placeholder="https://" autoComplete="url" data-testid="input-website" /></Field>
        <Field id="service" label="Service *" error={errors.service}>
          <select id="service" {...register("service")} className="field" aria-invalid={!!errors.service} data-testid="select-service">
            <option value="">Select a service</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            <option value="not-sure">Not sure yet</option>
          </select>
        </Field>
        <Field id="budget" label="Budget *" error={errors.budget}>
          <select id="budget" {...register("budget")} className="field" aria-invalid={!!errors.budget} data-testid="select-budget">
            <option value="">Select a range</option>
            {BUDGETS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
      </div>
      <Field id="details" label="Project details *" error={errors.details}><textarea id="details" rows={5} {...register("details")} className="field resize-none" placeholder="What are you trying to achieve? What is the timeline?" aria-invalid={!!errors.details} data-testid="textarea-details" /></Field>
      <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true"><label htmlFor="website_url">Leave this empty</label><input id="website_url" tabIndex={-1} autoComplete="off" {...register("website_url")} /></div>
      <AnimatePresence>{status === "error" && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" data-testid="contact-error" className="border border-[#ff3131]/60 text-[#ff3131] text-sm p-4">{serverError}</motion.p>}</AnimatePresence>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <button type="submit" disabled={status === "loading"} data-testid="contact-submit" className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
          <span>{status === "loading" ? "Sending" : "Start the conversation"}</span>
          {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} className="arrow" />}
        </button>
        <p className="text-xs text-neutral-500 max-w-xs">By submitting you agree to be contacted about your inquiry. No newsletters, no spam.</p>
      </div>
    </form>
  );
};
