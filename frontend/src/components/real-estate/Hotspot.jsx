import { useState } from "react";
import { Html } from "@react-three/drei";

export const HOTSPOTS = [
  { id: "facade", label: "Facade", tip: "Turn architecture into visual identity.", position: [0.9, 2.0, 1.6], stage: [0.2, 0.75] },
  { id: "presentation", label: "Presentation", tip: "Show buyers what words cannot.", position: [-3.4, 1.4, 2.4], stage: [0.35, 0.8] },
  { id: "location", label: "Location", tip: "Turn location into a marketing advantage.", position: [4.6, 0.6, 3.4], stage: [0.5, 0.9] },
];

export function Hotspot({ h, progress, onHover }) {
  const [open, setOpen] = useState(false);
  const visible = progress >= h.stage[0] && progress <= h.stage[1];
  if (!visible) return null;
  return (
    <Html position={h.position} center zIndexRange={[20, 0]} style={{ pointerEvents: "auto" }}>
      <div className="relative" onMouseEnter={() => { setOpen(true); onHover?.(true); }} onMouseLeave={() => { setOpen(false); onHover?.(false); }}>
        <button type="button" aria-describedby={`tip-${h.id}`} aria-label={`${h.label}: ${h.tip}`} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen((v) => !v)} data-testid={`hotspot-${h.id}`} className="w-8 h-8 flex items-center justify-center group">
          <span className="w-3 h-3 bg-[#ff3131] rotate-45 group-hover:scale-125 transition-transform" />
          <span className="absolute inset-0 border border-[#ff3131]/50 rotate-45 animate-ping [animation-duration:2.4s]" aria-hidden="true" />
        </button>
        <div id={`tip-${h.id}`} role="tooltip" className={`absolute left-10 top-1/2 -translate-y-1/2 w-56 bg-black/90 backdrop-blur border border-[#2a2a2a] p-4 transition-all duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff3131]">{h.label}</p>
          <p className="mt-1 text-sm text-white leading-snug">{h.tip}</p>
        </div>
      </div>
    </Html>
  );
}
