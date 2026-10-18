import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const getCalendlyUrl = (value) => {
  if (!value) return "";
  try {
    const url = new URL(value);
    const isCalendlyHost = url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com");
    return url.protocol === "https:" && isCalendlyHost && url.pathname !== "/" ? url.toString() : "";
  } catch {
    return "";
  }
};

const calendlyUrl = getCalendlyUrl(process.env.REACT_APP_CALENDLY_URL || "https://calendly.com/darshiladelfos");

const ContactFallback = ({ message }) => (
  <div className="border border-[#e5e5e5] bg-[#f7f7f7] p-6 sm:p-8" role="status">
    <p className="font-display font-bold text-lg">{message}</p>
    <p className="mt-2 text-sm leading-relaxed text-neutral-600">Contact us directly and we will help schedule a time.</p>
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
      <a className="link-underline break-all" href={`mailto:${site.email}`}>Email {site.email}</a>
      <a className="link-underline" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
    </div>
  </div>
);

export const CalendlyEmbed = () => {
  const iframeRef = useRef(null);
  const openedTracked = useRef(false);
  const bookingTracked = useRef(false);
  const timeoutRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loadSlow, setLoadSlow] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!calendlyUrl) return undefined;

    if (!openedTracked.current) {
      openedTracked.current = true;
      trackEvent("calendly_opened", { page: "/book-a-call" });
    }

    const onMessage = (event) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      try {
        const hostname = new URL(event.origin).hostname;
        if (hostname !== "calendly.com" && !hostname.endsWith(".calendly.com")) return;
      } catch {
        return;
      }

      if (event.data?.event === "calendly.event_scheduled" && !bookingTracked.current) {
        bookingTracked.current = true;
        trackEvent("calendly_booking_completed", { source: "calendly" });
      }
    };

    if (!loaded) {
      timeoutRef.current = window.setTimeout(() => setLoadSlow(true), 15000);
    }
    window.addEventListener("message", onMessage);

    return () => {
      window.clearTimeout(timeoutRef.current);
      window.removeEventListener("message", onMessage);
    };
  }, [loaded]);

  if (!calendlyUrl) {
    return <ContactFallback message="Our booking calendar is not connected yet." />;
  }

  const embedUrl = new URL(calendlyUrl);
  embedUrl.searchParams.set("embed_domain", window.location.hostname);
  embedUrl.searchParams.set("embed_type", "Inline");

  const handleLoad = () => {
    window.clearTimeout(timeoutRef.current);
    setLoaded(true);
    setLoadSlow(false);
  };

  const handleError = () => {
    window.clearTimeout(timeoutRef.current);
    setLoadFailed(true);
  };

  return (
    <div>
      <div className="relative min-h-[760px] overflow-hidden border border-[#e5e5e5] bg-white sm:min-h-[820px]">
        {!loaded && !loadFailed && !loadSlow && <p className="absolute inset-x-0 top-5 z-10 text-center text-sm text-neutral-600" role="status">Loading the booking calendar…</p>}
        {(loadFailed || loadSlow) ? (
          <div className="absolute inset-x-4 top-4 z-10"><ContactFallback message="Unable to confirm that the booking calendar loaded." /></div>
        ) : (
          <iframe
            ref={iframeRef}
            title="Schedule a consultation with Adelfos Marketing"
            src={embedUrl.toString()}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            className="h-[760px] w-full border-0 sm:h-[820px]"
            allow="payment"
          />
        )}
      </div>
      <p className="mt-4 text-sm text-neutral-600">
        Prefer to open the calendar separately? <a className="link-underline font-semibold text-[#111]" href={calendlyUrl} target="_blank" rel="noopener noreferrer">Open Calendly in a new tab</a>.
      </p>
    </div>
  );
};