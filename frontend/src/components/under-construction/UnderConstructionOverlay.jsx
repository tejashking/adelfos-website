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
          opacity: 0.95;
        }
        .construction-scene .base {
          position: absolute;
          left: 50%;
          bottom: 16%;
          transform: translateX(-50%);
          width: min(52vw, 680px);
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
        }
        .construction-scene .logo-assembly {
          position: absolute;
          left: 50%;
          bottom: 18%;
          transform: translateX(-50%);
          width: min(42vw, 520px);
          height: 180px;
        }
        .construction-scene .logo-assembly .block {
          position: absolute;
          bottom: 0;
          width: 120px;
          height: 120px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.02);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 24px rgba(255, 49, 49, 0.08);
        }
        .construction-scene .logo-assembly .block.left { left: 0; }
        .construction-scene .logo-assembly .block.mid { left: 50%; transform: translateX(-50%); }
        .construction-scene .logo-assembly .block.right { right: 0; }
        .construction-scene .logo-assembly .block::before,
        .construction-scene .logo-assembly .block::after {
          content: "";
          position: absolute;
          background: rgba(255, 49, 49, 0.92);
          box-shadow: 0 0 18px rgba(255, 49, 49, 0.35);
        }
        .construction-scene .logo-assembly .block.left::before {
          left: 18px;
          top: 20px;
          width: 84px;
          height: 16px;
          transform: rotate(28deg);
        }
        .construction-scene .logo-assembly .block.left::after {
          left: 18px;
          top: 82px;
          width: 84px;
          height: 16px;
          transform: rotate(-28deg);
        }
        .construction-scene .logo-assembly .block.mid::before {
          left: 18px;
          top: 18px;
          width: 84px;
          height: 16px;
          transform: rotate(25deg);
        }
        .construction-scene .logo-assembly .block.mid::after {
          left: 18px;
          top: 82px;
          width: 84px;
          height: 16px;
          transform: rotate(-25deg);
        }
        .construction-scene .logo-assembly .block.right::before {
          left: 18px;
          top: 28px;
          width: 84px;
          height: 18px;
          transform: rotate(18deg);
        }
        .construction-scene .logo-assembly .block.right::after {
          left: 18px;
          top: 78px;
          width: 84px;
          height: 18px;
          transform: rotate(-18deg);
        }
        .construction-scene .logo-assembly .beam {
          position: absolute;
          left: 50%;
          bottom: 80px;
          transform: translateX(-50%);
          width: min(32vw, 420px);
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.7), rgba(255,255,255,0.2));
          box-shadow: 0 0 18px rgba(255,255,255,0.2);
        }
        .construction-scene .logo-assembly .beam::before,
        .construction-scene .logo-assembly .beam::after {
          content: "";
          position: absolute;
          top: -16px;
          width: 2px;
          height: 42px;
          background: rgba(255,255,255,0.72);
        }
        .construction-scene .logo-assembly .beam::before { left: 18%; }
        .construction-scene .logo-assembly .beam::after { right: 18%; }

        .construction-scene .worker {
          position: absolute;
          bottom: 14%;
          width: 92px;
          height: 130px;
          animation: bob 3.8s ease-in-out infinite;
        }
        .construction-scene .worker.left { left: 15%; }
        .construction-scene .worker.right { right: 15%; animation-delay: 1.1s; }
        .construction-scene .worker .head {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f4d7b2;
          box-shadow: 0 0 14px rgba(244, 215, 178, 0.4);
        }
        .construction-scene .worker .body {
          position: absolute;
          left: 50%;
          top: 20px;
          transform: translateX(-50%);
          width: 38px;
          height: 42px;
          border-radius: 11px;
          background: linear-gradient(180deg, #ff3131, #b81010);
          box-shadow: 0 0 18px rgba(255, 49, 49, 0.25);
        }
        .construction-scene .worker .arm,
        .construction-scene .worker .leg {
          position: absolute;
          background: #f7f7f7;
          border-radius: 999px;
        }
        .construction-scene .worker .arm {
          top: 28px;
          width: 46px;
          height: 8px;
        }
        .construction-scene .worker.left .arm.left { left: 8px; transform: rotate(38deg); }
        .construction-scene .worker.left .arm.right { right: 8px; transform: rotate(-25deg); }
        .construction-scene .worker.right .arm.left { left: 8px; transform: rotate(25deg); }
        .construction-scene .worker.right .arm.right { right: 8px; transform: rotate(-38deg); }
        .construction-scene .worker .leg {
          top: 60px;
          width: 10px;
          height: 46px;
        }
        .construction-scene .worker.left .leg.left { left: 28px; transform: rotate(18deg); }
        .construction-scene .worker.left .leg.right { right: 28px; transform: rotate(-16deg); }
        .construction-scene .worker.right .leg.left { left: 28px; transform: rotate(-18deg); }
        .construction-scene .worker.right .leg.right { right: 28px; transform: rotate(16deg); }
        .construction-scene .worker .tool {
          position: absolute;
          top: 36px;
          width: 58px;
          height: 7px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.9), rgba(255,255,255,0.2));
          box-shadow: 0 0 10px rgba(255,255,255,0.18);
        }
        .construction-scene .worker.left .tool {
          left: 18px;
          transform: rotate(-18deg);
        }
        .construction-scene .worker.right .tool {
          right: 18px;
          transform: rotate(18deg);
        }
        .construction-scene .glow {
          position: absolute;
          top: 12%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 49, 49, 0.9);
          box-shadow: 0 0 14px rgba(255, 49, 49, 0.7), 0 0 42px rgba(255, 49, 49, 0.55);
          animation: pulse 2.3s ease-in-out infinite alternate;
        }
        .construction-scene .glow.one { left: 28%; }
        .construction-scene .glow.two { left: 50%; animation-delay: 0.9s; }
        .construction-scene .glow.three { right: 28%; animation-delay: 1.5s; }
        @keyframes bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <div className="construction-scene" aria-hidden="true">
        <div className="base" />
        <div className="glow one" />
        <div className="glow two" />
        <div className="glow three" />

        <div className="logo-assembly">
          <div className="beam" />
          <div className="block left" />
          <div className="block mid" />
          <div className="block right" />
        </div>

        <div className="worker left">
          <div className="head" />
          <div className="body" />
          <div className="arm left" />
          <div className="arm right" />
          <div className="leg left" />
          <div className="leg right" />
          <div className="tool" />
        </div>

        <div className="worker right">
          <div className="head" />
          <div className="body" />
          <div className="arm left" />
          <div className="arm right" />
          <div className="leg left" />
          <div className="leg right" />
          <div className="tool" />
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
