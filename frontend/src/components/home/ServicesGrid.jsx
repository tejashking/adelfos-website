import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Share2, Search, Fingerprint, Monitor, Smartphone, TrendingUp, Compass, PenTool, Box, Building2 } from "lucide-react";
import { services } from "@/data/services";
import { Stagger, StaggerItem } from "@/components/common/Motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/common/Button";

export const SERVICE_ICONS = { "digital-advertising": Megaphone, "social-media-management": Share2, seo: Search, "brand-building": Fingerprint, "web-design-development": Monitor, "app-development": Smartphone, "conversion-rate-optimization": TrendingUp, "marketing-advisory": Compass, "graphic-design": PenTool, "2d-3d-design": Box, "real-estate": Building2 };

export const ServicesGrid = () => (
  <section data-testid="services-grid-section" className="bg-white">
    <div className="container-x section-pad">
      <SectionHeader eyebrow="What we do" title={["Our digital marketing services"]} body="Eleven disciplines that work as one system. Strategy decides the sequence, creative and technology deliver it, performance proves it." />
      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14" stagger={0.05}>
        {services.map((s) => {
          const Icon = SERVICE_ICONS[s.slug];
          return (
            <StaggerItem key={s.slug}>
              <Link to={`/services/${s.slug}`} data-testid={`service-card-${s.slug}`} className="card group block h-full p-7 lg:p-8">
                <span className="w-11 h-11 rounded-md bg-white border border-[#e5e5e5] flex items-center justify-center text-[#ff3131] group-hover:bg-[#ff3131] group-hover:text-white group-hover:border-[#ff3131] transition-colors duration-500"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
                <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight mt-6 text-[#111]">{s.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{s.shortDescription}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#111] group-hover:text-[#ff3131] transition-colors">Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></span>
              </Link>
            </StaggerItem>
          );
        })}
        <StaggerItem>
          <div className="card h-full p-7 lg:p-8 bg-[#111] text-white flex flex-col justify-between border-[#111]">
            <div><p className="eyebrow">Not sure where to start?</p><h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight mt-4">Get a growth plan tailored to your business.</h3></div>
            <div className="mt-8"><Button to="/contact" data-testid="services-grid-cta" track="services-grid-cta">Start a project</Button></div>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  </section>
);
