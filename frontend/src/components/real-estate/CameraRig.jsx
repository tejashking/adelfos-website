import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Camera path per scroll stage: [x, y, z] position and look-at target.
const PATH = [
  { pos: [14, 5.5, 16], look: [0, 0.8, 0] },
  { pos: [9, 3.5, 11], look: [0, 1, 0] },
  { pos: [6, 4.5, 8], look: [0.5, 1.6, 0] },
  { pos: [-9, 4.5, 11], look: [0, 1.4, 0] },
  { pos: [8, 2.6, 9], look: [0.5, 1.2, 0] },
  { pos: [12, 6, 14], look: [0, 1, 0] },
];

const lerp3 = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

export function CameraRig({ progress, pointer, distance = 1 }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const posV = useRef(new THREE.Vector3(...PATH[0].pos));
  const lookV = useRef(new THREE.Vector3(...PATH[0].look));

  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 0.999) * (PATH.length - 1);
    const i = Math.floor(p); const t = THREE.MathUtils.smoothstep(p - i, 0, 1);
    const pos = lerp3(PATH[i].pos, PATH[Math.min(i + 1, PATH.length - 1)].pos, t).map((v) => v * distance);
    const look = lerp3(PATH[i].look, PATH[Math.min(i + 1, PATH.length - 1)].look, t);
    const px = pointer.current.x, py = pointer.current.y;
    // pointer nudges orbit slightly: left/right rotates around Y, up/down lifts camera.
    const angle = px * 0.22;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const rx = pos[0] * cos - pos[2] * sin, rz = pos[0] * sin + pos[2] * cos;
    target.current.set(rx, pos[1] + py * 0.9, rz);
    const k = 1 - Math.exp(-delta * 3.2);
    posV.current.lerp(target.current, k);
    lookV.current.lerp(new THREE.Vector3(...look), k);
    camera.position.copy(posV.current);
    camera.lookAt(lookV.current);
  });
  return null;
}
