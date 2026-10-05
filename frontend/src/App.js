import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { UnderConstructionOverlay } from "@/components/construction/UnderConstructionOverlay";
import { UNDER_CONSTRUCTION_MODE } from "@/config/construction";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Work = lazy(() => import("@/pages/Work"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const Insights = lazy(() => import("@/pages/Insights"));
const Article = lazy(() => import("@/pages/Article"));
const Contact = lazy(() => import("@/pages/Contact"));
const Audit = lazy(() => import("@/pages/Audit"));
const AdminAudits = lazy(() => import("@/pages/AdminAudits"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Fallback = () => <div className="min-h-screen bg-black" aria-busy="true" />;

export default function App() {
  if (UNDER_CONSTRUCTION_MODE) {
    return <UnderConstructionOverlay />;
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || "/"}>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<CaseStudy />} />
            <Route path="insights" element={<Insights />} />
            <Route path="insights/:slug" element={<Article />} />
            <Route path="contact" element={<Contact />} />
            <Route path="audit" element={<Audit />} />
            <Route path="admin/audits" element={<AdminAudits />} />
            <Route path="privacy" element={<Legal kind="privacy" />} />
            <Route path="terms" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
