import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { TRIANGLES } from "@/components/common/LogoMark";

const OFFSETS = [
  { x: -34, y: -26, rotate: -14 },
  { x: 34, y: -26, rotate: 12 },
  { x: -34, y: 26, rotate: 10 },
  { x: 34, y: 26, rotate: -12 },
];

const LOGO_PARTS = TRIANGLES.map((points, index) => ({
  id: `triangle-${index + 1}`,
  points,
  label: ["top left", "top right", "bottom left", "bottom right"][index],
  start: OFFSETS[index],
  delay: index * 0.16,
}));

const SPARKS = [
  { id: 1, left: "24%", top: "30%", delay: 0.1 },
  { id: 2, left: "76%", top: "34%", delay: 0.7 },
];

const createAssemblyIntro = (part) => ({
  x: [part.start.x, 0],
  y: [part.start.y, 0],
  rotate: [part.start.rotate, 0],
  scale: [0.76, 1],
  opacity: [0.25, 1],
  transition: {
    duration: 1.35,
    delay: part.delay,
    ease: [0.2, 0.9, 0.2, 1],
  },
});

const KEY_NUDGES = {
  ArrowLeft: { x: -22, y: 0 },
  ArrowRight: { x: 22, y: 0 },
  ArrowUp: { x: 0, y: -22 },
  ArrowDown: { x: 0, y: 22 },
};

const GAME_DRAG_THRESHOLD = 28;

const InteractiveTriangle = ({ part, boundsRef, reducedMotion, onInteract, onGameTrigger }) => {
  const controls = useAnimationControls();
  const pointerDrag = useRef(null);

  const snapBack = () => {
    controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 25 },
    });
  };

  useEffect(() => {
    if (reducedMotion) {
      controls.set({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
      return undefined;
    }

    controls.start(createAssemblyIntro(part));
    return () => controls.stop();
  }, [controls, part, reducedMotion]);

  const moveWithKeyboard = (event) => {
    const nudge = KEY_NUDGES[event.key];
    if (!nudge) return;

    event.preventDefault();
    controls.stop();
    onInteract();
    controls.start({
      x: nudge.x,
      y: nudge.y,
      scale: 1.14,
      transition: { duration: reducedMotion ? 0 : 0.16 },
    }).then(snapBack);
  };

  const beginPointerDrag = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    controls.stop();

    const rect = event.currentTarget.getBoundingClientRect();
    const viewport = boundsRef.current?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
    };
    const transform = getComputedStyle(event.currentTarget).transform;
    const matrix = transform === "none" ? { e: 0, f: 0 } : new DOMMatrix(transform);

    pointerDrag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      translateX: matrix.e,
      translateY: matrix.f,
      shouldLaunchGame: false,
      minX: viewport.left - (rect.left - matrix.e),
      maxX: viewport.right - (rect.right - matrix.e),
      minY: viewport.top - (rect.top - matrix.f),
      maxY: viewport.bottom - (rect.bottom - matrix.f),
    };
  };

  const movePointerDrag = (event) => {
    const drag = pointerDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) >= GAME_DRAG_THRESHOLD) {
      drag.shouldLaunchGame = true;
    }

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    controls.set({
      x: clamp(drag.translateX + event.clientX - drag.startX, drag.minX, drag.maxX),
      y: clamp(drag.translateY + event.clientY - drag.startY, drag.minY, drag.maxY),
      opacity: 1,
    });
  };

  const endPointerDrag = (event) => {
    const drag = pointerDrag.current;
    if (drag?.pointerId !== event.pointerId) return;
    pointerDrag.current = null;
    if (drag.shouldLaunchGame) {
      onGameTrigger();
      return;
    }
    snapBack();
    onInteract();
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      initial={reducedMotion ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 } : { x: part.start.x, y: part.start.y, rotate: part.start.rotate, scale: 0.76, opacity: 0.25 }}
      animate={controls}
      onPointerDown={beginPointerDrag}
      onPointerMove={movePointerDrag}
      onPointerUp={endPointerDrag}
      onPointerCancel={endPointerDrag}
      onKeyDown={moveWithKeyboard}
      onTap={() => {
        controls.stop();
        onInteract();
        snapBack();
      }}
      role="button"
      tabIndex={0}
      aria-label={`Move the ${part.label} Adelfos logo triangle`}
      aria-roledescription="draggable logo piece"
      className="absolute inset-0 h-full w-full cursor-grab overflow-visible outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:cursor-grabbing"
      style={{ transformOrigin: "50% 50%", touchAction: "none", pointerEvents: "none" }}
      whileDrag={{ scale: 1.08, filter: "drop-shadow(0 0 8px rgba(255,49,49,0.9))" }}
    >
      <polygon points={part.points} fill="#ff3131" style={{ pointerEvents: "visiblePainted" }} />
    </motion.svg>
  );
};

export const LogoAssemblyScene = ({ boundsRef, onGameTrigger }) => {
  const shouldReduceMotion = useReducedMotion();
  const [hint, setHint] = useState("Drag a triangle to play · Arrow keys to nudge");

  const showSnapHint = () => {
    setHint("Snapped into place");
    window.setTimeout(() => setHint("Drag a triangle to play · Arrow keys to nudge"), 1500);
  };

  return (
    <section className="mx-auto w-full max-w-[360px]" aria-label="Interactive Adelfos logo">
      <div className="relative mx-auto aspect-square w-[min(54vw,150px)] touch-none sm:w-[min(24vw,176px)]">
        {!shouldReduceMotion && SPARKS.map((spark) => (
          <motion.span
            key={spark.id}
            className="pointer-events-none absolute z-0 h-1.5 w-1.5 rounded-full bg-[#ff8b8b] shadow-[0_0_12px_rgba(255,49,49,0.95)]"
            style={{ left: spark.left, top: spark.top }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6], y: [0, -10, -18] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8, delay: spark.delay }}
            aria-hidden="true"
          />
        ))}

        <div className="absolute inset-0 z-10 drop-shadow-[0_0_18px_rgba(255,49,49,0.3)]" role="group" aria-label="Four draggable pieces of the Adelfos logo">
          {LOGO_PARTS.map((part) => (
            <InteractiveTriangle
              key={part.id}
              part={part}
              boundsRef={boundsRef}
              reducedMotion={shouldReduceMotion}
              onInteract={showSnapHint}
              onGameTrigger={onGameTrigger}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 min-h-5 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-white/50" aria-live="polite">
        {hint}
      </p>
    </section>
  );
};
