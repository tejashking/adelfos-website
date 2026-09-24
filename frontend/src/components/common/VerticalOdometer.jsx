import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useAnimation";

const REEL_CYCLES = 2;

const DigitReel = ({ digit, animate }) => {
  const targetIndex = REEL_CYCLES * 10 + Number(digit);
  const digits = Array.from({ length: targetIndex + 1 }, (_, index) => index % 10);

  return (
    <span className="odometer-cell" aria-hidden="true">
      <span
        className={`odometer-reel ${animate ? "is-rolling" : ""}`}
        style={{ "--odometer-offset": `-${targetIndex}em` }}
      >
        {digits.map((value, index) => <span className="odometer-digit" key={`${value}-${index}`}>{value}</span>)}
      </span>
    </span>
  );
};

export const VerticalOdometer = ({ value, prefix = "", suffix = "", start = false }) => {
  const reduced = useReducedMotion();
  const hasStarted = useRef(false);
  const [animate, setAnimate] = useState(false);
  const valueText = String(value);

  useEffect(() => {
    if (!start || hasStarted.current) return undefined;
    hasStarted.current = true;
    if (reduced) {
      setAnimate(true);
      return undefined;
    }
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [reduced, start]);

  return (
    <span className="odometer" aria-label={`${prefix}${valueText}${suffix}`}>
      {prefix && <span aria-hidden="true">{prefix}</span>}
      {valueText.split("").map((character, index) => (
        /\d/.test(character)
          ? <DigitReel key={`${character}-${index}`} digit={character} animate={animate || reduced} />
          : <span className="odometer-static" aria-hidden="true" key={`${character}-${index}`}>{character}</span>
      ))}
      {suffix && <span className="text-[#ff3131]" aria-hidden="true">{suffix}</span>}
    </span>
  );
};
