import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const Breadcrumbs = ({ items, light = false }) => (
  <nav aria-label="Breadcrumb" data-testid="breadcrumbs" className={`font-mono text-[11px] uppercase tracking-[0.2em] ${light ? "text-neutral-500" : "text-neutral-500"}`}>
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <li key={it.to} className="flex items-center gap-2">
            {last ? <span aria-current="page" className={light ? "text-black" : "text-black"}>{it.label}</span> : <Link to={it.to} className={`link-underline ${"hover:text-black"}`}>{it.label}</Link>}
            {!last && <ChevronRight size={12} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
);
