import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { BuildingModel } from "./BuildingModel";
import { CameraRig } from "./CameraRig";
import { Hotspot, HOTSPOTS } from "./Hotspot";

export default function RealEstateScene({ progressMV, mobile = false }) {
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [p, setP] = useState(0);
  const wrap = useRef(null);

  useEffect(() => progressMV.on("change", (v) => { progress.current = v; setP(Math.round(v * 40) / 40); }), [progressMV]);

  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      pointer.current.x = Math.max(-1, Math.min(1, (cx / r.width) * 2 - 1));
      pointer.current.y = Math.max(-1, Math.min(1, -((cy / r.height) * 2 - 1)));
    };
    const reset = () => { pointer.current.x = 0; pointer.current.y = 0; };
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("touchmove", onMove); el.removeEventListener("mouseleave", reset); };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" data-cursor="3d" data-testid="real-estate-canvas">
      <Canvas dpr={mobile ? [1, 1.25] : [1, 1.75]} shadows={!mobile} camera={{ fov: mobile ? 45 : 32, position: [14, 5.5, 16], near: 0.1, far: 100 }} gl={{ antialias: !mobile, powerPreference: "high-performance", alpha: true }} style={{ background: "transparent" }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 18, 42]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[8, 12, 6]} intensity={1.6} castShadow={!mobile} shadow-mapSize={[1024, 1024]} color="#fff4e6" />
        <directionalLight position={[-10, 6, -6]} intensity={0.5} color="#ff3131" />
        <pointLight position={[-2, 1.2, 3.5]} intensity={mobile ? 2 : 4} color="#ffcf9a" distance={10} />
        <Suspense fallback={null}>
          <BuildingModel progress={progress} />
          {!mobile && <ContactShadows position={[0, -0.6, 0]} opacity={0.6} scale={30} blur={2.4} far={6} />}
        </Suspense>
        <hemisphereLight args={["#2a2a33", "#000000", 0.5]} />
        <CameraRig progress={progress} pointer={pointer} distance={mobile ? 1.5 : 1} />
        {!mobile && HOTSPOTS.map((h) => <Hotspot key={h.id} h={h} progress={p} />)}
      </Canvas>
    </div>
  );
}
