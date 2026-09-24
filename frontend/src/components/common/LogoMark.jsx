import { motion } from "framer-motion";

const TRIS = [
  "0,0 50,0 50,50",
  "50,0 100,0 100,50",
  "0,50 50,50 50,100",
  "50,50 100,50 100,100",
];

// SVG reconstruction of the official 4-triangle Adelfos mark, used ONLY for motion (loading, transitions, decoration).
export const LogoMark = ({ size = 40, color = "#ff3131", className = "", animate = false, spread = 0, ...rest }) => {
  const offsets = [[-spread, -spread], [spread, -spread], [-spread, spread], [spread, spread]];
  return (
    <svg width={size} height={size} viewBox="-20 -20 140 140" className={className} aria-hidden="true" {...rest}>
      {TRIS.map((pts, i) => (
        <motion.polygon
          key={i}
          points={pts}
          fill={color}
          style={{ x: offsets[i][0], y: offsets[i][1] }}
          animate={animate ? { opacity: [0.4, 1, 0.4] } : undefined}
          transition={animate ? { duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" } : undefined}
        />
      ))}
    </svg>
  );
};

export const TRIANGLES = TRIS;
