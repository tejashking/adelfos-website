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
      <style>{`
        .construction-scene {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.9;
        }
        .construction-scene .frame {
          position: absolute;
          inset: auto 0 0 0;
          height: 38%;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.08));
        }
        .construction-scene .beam {
          position: absolute;
          bottom: 20%;
          width: 2px;
          height: 130px;
          background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.45), rgba(255,255,255,0));
          animation: sway 11s ease-in-out infinite alternate;
        }
        .construction-scene .beam:nth-child(2) { left: 18%; }
        .construction-scene .beam:nth-child(3) { left: 42%; animation-delay: 1.5s; }
        .construction-scene .beam:nth-child(4) { left: 68%; animation-delay: 3s; }
        .construction-scene .beam:nth-child(5) { left: 82%; animation-delay: 2s; }
        .construction-scene .guy {
          position: absolute;
          bottom: 13%;
          width: 76px;
          height: 120px;
          animation: bob 4s ease-in-out infinite;
        }
        .construction-scene .guy.left { left: 20%; animation-delay: 0.5s; }
        .construction-scene .guy.right { left: 72%; animation-delay: 1.5s; }
        .construction-scene .guy .head {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f3d4b5;
          box-shadow: 0 0 10px rgba(243, 212, 181, 0.5);
        }
        .construction-scene .guy .body {
          position: absolute;
          left: 50%;
          top: 18px;
          transform: translateX(-50%);
          width: 34px;
          height: 40px;
          border-radius: 10px;
          background: #ff3131;
          box-shadow: 0 0 15px rgba(255, 49, 49, 0.3);
        }
        .construction-scene .guy .arm,
        .construction-scene .guy .leg {
          position: absolute;
          background: #ffffff;
          border-radius: 999px;
          transform-origin: top center;
        }
        .construction-scene .guy .arm {
          top: 26px;
          width: 48px;
          height: 8px;
        }
        .construction-scene .guy .arm.left { left: 8px; transform: rotate(22deg); }
        .construction-scene .guy .arm.right { right: 8px; transform: rotate(-22deg); }
        .construction-scene .guy .leg {
          top: 52px;
          width: 10px;
          height: 42px;
        }
        .construction-scene .guy .leg.left { left: 22px; transform: rotate(12deg); }
        .construction-scene .guy .leg.right { right: 22px; transform: rotate(-12deg); }
        .construction-scene .guy .tool {
          position: absolute;
          left: 50%;
          top: 50px;
          width: 58px;
          height: 6px;
          transform: translateX(-50%) rotate(12deg);
          background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.85), rgba(255,255,255,0.2));
          border-radius: 999px;
        }
        .construction-scene .light {
          position: absolute;
          top: 11%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 49, 49, 0.9);
          box-shadow: 0 0 18px rgba(255, 49, 49, 0.8), 0 0 42px rgba(255, 49, 49, 0.6);
          animation: pulse 2.4s ease-in-out infinite alternate;
        }
        .construction-scene .light:nth-child(6) { left: 28%; }
        .construction-scene .light:nth-child(7) { left: 58%; animation-delay: 0.9s; }
        .construction-scene .light:nth-child(8) { left: 76%; animation-delay: 1.6s; }
        @keyframes sway {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <div className="construction-scene" aria-hidden="true">
        <div className="frame" />
        <div className="beam" />
        <div className="beam" />
        <div className="beam" />
        <div className="beam" />
        <div className="light" />
        <div className="light" />
        <div className="light" />

        <div className="guy left">
          <div className="head" />
          <div className="body" />
          <div className="arm left" />
          <div className="arm right" />
          <div className="leg left" />
          <div className="leg right" />
          <div className="tool" />
        </div>

        <div className="guy right">
          <div className="head" />
          <div className="body" />
          <div className="arm left" />
          <div className="arm right" />
          <div className="leg left" />
          <div className="leg right" />
        </div>
      </div>

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
