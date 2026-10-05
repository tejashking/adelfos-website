import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const dark = new THREE.MeshStandardMaterial({ color: "#151515", roughness: 0.55, metalness: 0.2 });
const concrete = new THREE.MeshStandardMaterial({ color: "#2a2a2a", roughness: 0.9 });
const glass = new THREE.MeshPhysicalMaterial({ color: "#0b0b0b", roughness: 0.05, metalness: 0.6, transmission: 0.2, transparent: true, opacity: 0.85, envMapIntensity: 1.2 });
const warm = new THREE.MeshStandardMaterial({ color: "#f5e9d0", emissive: "#f5c98a", emissiveIntensity: 0.8 });
const red = new THREE.MeshStandardMaterial({ color: "#ff3131", emissive: "#ff3131", emissiveIntensity: 0.35 });
const pale = new THREE.MeshStandardMaterial({ color: "#e8e8e8", roughness: 0.7 });

// Procedural placeholder home. To use a real asset, drop /public/models/real-estate.glb and swap this component for
// a <primitive object={useGLTF(url).scene} /> — the CameraRig and Hotspots read only `progress`, so nothing else changes.
export function BuildingModel({ progress }) {
  const upper = useRef(); const roof = useRef(); const glassRef = useRef(); const canopy = useRef(); const layers = useRef();
  const windows = useMemo(() => Array.from({ length: 6 }, (_, i) => [-2.4 + i * 0.96, 1.55, 2.02]), []);

  useFrame(() => {
    const p = progress.current;
    const sep = THREE.MathUtils.smoothstep(p, 0.34, 0.55) * (1 - THREE.MathUtils.smoothstep(p, 0.72, 0.9));
    const layerOpacity = THREE.MathUtils.clamp((sep - 0.08) / 0.42, 0, 1);
    if (upper.current) upper.current.position.y = 1.55 + sep * 0.9;
    if (roof.current) roof.current.position.y = 2.42 + sep * 1.9;
    if (glassRef.current) glassRef.current.position.z = 2.0 + sep * 1.3;
    if (canopy.current) canopy.current.position.x = 3.3 + sep * 1.4;
    if (layers.current) {
      layers.current.visible = sep > 0.08;
      layers.current.children.forEach((c, i) => {
        const material = c.material;
        material.transparent = true;
        material.depthWrite = false;
        material.opacity = layerOpacity * (0.2 + (1 - i / 3) * 0.25);
        c.position.y = 0.25 + i * 0.45 + sep * 0.7;
        c.position.z = i * 0.12;
      });
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow material={new THREE.MeshStandardMaterial({ color: "#050505", roughness: 1 })}><planeGeometry args={[60, 60]} /></mesh>
      <gridHelper args={[40, 40, "#1f1f1f", "#141414"]} position={[0, 0, 0]} />
      <mesh position={[0, 0.05, 0]} receiveShadow material={concrete}><boxGeometry args={[9, 0.1, 6]} /></mesh>
      <mesh position={[-0.6, 0.75, 0]} castShadow receiveShadow material={dark}><boxGeometry args={[6.4, 1.4, 4]} /></mesh>
      <mesh ref={glassRef} position={[-0.6, 0.75, 2.0]} material={glass}><boxGeometry args={[5.6, 1.2, 0.06]} /></mesh>
      <mesh position={[-3.7, 0.75, 0]} castShadow material={pale}><boxGeometry args={[0.3, 1.4, 4.2]} /></mesh>
      <group ref={upper} position={[0, 1.55, 0]}>
        <mesh position={[0.9, 0.7, -0.4]} castShadow receiveShadow material={pale}><boxGeometry args={[7, 1.4, 3.6]} /></mesh>
        <mesh position={[0.9, 0.7, 1.42]} material={glass}><boxGeometry args={[6.4, 1.1, 0.06]} /></mesh>
        {windows.map((pos, i) => <mesh key={i} position={[pos[0] + 1.2, 0.7, 1.46]} material={i % 2 ? warm : dark}><boxGeometry args={[0.7, 0.9, 0.02]} /></mesh>)}
      </group>
      <mesh ref={roof} position={[0.9, 2.42, -0.4]} castShadow material={dark}><boxGeometry args={[7.4, 0.14, 4]} /></mesh>
      <mesh position={[2.6, 2.6, -0.4]} material={red}><boxGeometry args={[0.5, 0.5, 0.5]} /></mesh>
      <mesh ref={canopy} position={[3.3, 1.35, 1.4]} castShadow material={dark}><boxGeometry args={[2.6, 0.1, 2.4]} /></mesh>
      <mesh position={[4.4, 0.7, 2.4]} material={dark}><boxGeometry args={[0.12, 1.3, 0.12]} /></mesh>
      <mesh position={[2.3, 0.7, 2.4]} material={dark}><boxGeometry args={[0.12, 1.3, 0.12]} /></mesh>
      <mesh position={[-1.5, 0.08, 3.4]} material={new THREE.MeshStandardMaterial({ color: "#123a4a", roughness: 0.1, metalness: 0.4 })}><boxGeometry args={[4.5, 0.06, 1.4]} /></mesh>
      <group ref={layers} visible={false}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[0, 0.4 + i * 0.5, 0]}
            material={new THREE.MeshBasicMaterial({
              color: "#ff3131",
              transparent: true,
              opacity: 0,
              depthWrite: false,
              side: THREE.DoubleSide,
              polygonOffset: true,
              polygonOffsetFactor: 1.5,
              polygonOffsetUnits: 1,
            })}
          >
            <boxGeometry args={[7.2, 0.02, 4.6]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
