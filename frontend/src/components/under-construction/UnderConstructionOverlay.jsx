import {
  UNDER_CONSTRUCTION_EMAIL,
  UNDER_CONSTRUCTION_MESSAGE,
  UNDER_CONSTRUCTION_PHONE,
  UNDER_CONSTRUCTION_WHATSAPP,
} from "@/config/underConstruction";

export const UnderConstructionOverlay = () => {
  const publicUrl = process.env.PUBLIC_URL || "";
  const logoSrc = `${publicUrl}/images/brand/logo-mark-transparent.png`;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,49,49,0.18),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.06),_transparent_35%)]" />
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <img
          src={logoSrc}
          alt="Adelfos Marketing"
          width="80"
          height="80"
          className="mx-auto h-16 w-16 sm:h-20 sm:w-20"
        />

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.38em] text-[#ff3131]">
          Adelfos Marketing
        </p>

        <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Website under construction
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-300 sm:text-lg">
          {UNDER_CONSTRUCTION_MESSAGE}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${UNDER_CONSTRUCTION_EMAIL}`}
            className="inline-flex items-center justify-center rounded-full border border-[#ff3131] bg-[#ff3131] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff1d1d]"
          >
            Email us
          </a>
          <a
            href={UNDER_CONSTRUCTION_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            WhatsApp
          </a>
        </div>

        <p className="mt-8 text-sm text-neutral-400">
          For immediate inquiries: <a href={`mailto:${UNDER_CONSTRUCTION_EMAIL}`} className="text-white underline underline-offset-4">{UNDER_CONSTRUCTION_EMAIL}</a>
          <span className="mx-2 text-neutral-600">•</span>
          <a href={`tel:${UNDER_CONSTRUCTION_PHONE.replace(/\s+/g, "")}`} className="text-white underline underline-offset-4">{UNDER_CONSTRUCTION_PHONE}</a>
        </p>
      </div>
    </main>
  );
};
