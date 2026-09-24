const GA4 = process.env.REACT_APP_GA4_ID;
const ADS = process.env.REACT_APP_GOOGLE_ADS_ID;
const ADS_LABEL = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_LABEL;
const PIXEL = process.env.REACT_APP_META_PIXEL_ID;

let initialised = false;

export function initAnalytics() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;
  if (GA4 || ADS) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4 || ADS}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    if (GA4) window.gtag("config", GA4, { send_page_view: false });
    if (ADS) window.gtag("config", ADS);
  }
  if (PIXEL) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", PIXEL);
  }
}

export function trackPageView(path) {
  if (window.gtag && GA4) window.gtag("event", "page_view", { page_path: path });
  if (window.fbq) window.fbq("track", "PageView");
}

export function trackEvent(name, params = {}) {
  if (window.gtag) window.gtag("event", name, params);
  if (window.fbq && name === "contact_submit") window.fbq("track", "Lead", params);
  if (window.gtag && ADS && ADS_LABEL && name === "contact_submit") {
    window.gtag("event", "conversion", { send_to: `${ADS}/${ADS_LABEL}` });
  }
}
