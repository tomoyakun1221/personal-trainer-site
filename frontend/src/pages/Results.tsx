import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../lib/api";
import type { Testimonial, Transformation } from "../types";
import { enrichTransformations, HOME_TRANSFORMATIONS } from "../constants/transformations";
import { getHomeTestimonials, HOME_TESTIMONIALS } from "../constants/testimonials";
import { BrandHeading } from "../components/BrandHeading";
import { ResultsVoicesSection } from "../components/ResultsVoicesSection";
import "./Results.css";

const isStaticSite = import.meta.env.VITE_STATIC_SITE === "true";

export function Results() {
  const location = useLocation();
  const [results, setResults] = useState<Transformation[]>(
    isStaticSite ? HOME_TRANSFORMATIONS : []
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    isStaticSite ? HOME_TESTIMONIALS : []
  );
  const [loading, setLoading] = useState(!isStaticSite);

  useEffect(() => {
    if (isStaticSite) return;

    Promise.all([api.getTransformations(), api.getTestimonials()])
      .then(([transformations, voices]) => {
        setResults(enrichTransformations(transformations));
        setTestimonials(getHomeTestimonials(voices));
      })
      .catch(() => {
        setResults(HOME_TRANSFORMATIONS);
        setTestimonials(HOME_TESTIMONIALS);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || !location.hash) return;
    const id = location.hash;
    const scrollToTarget = () => document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

    requestAnimationFrame(scrollToTarget);
    const timer = window.setTimeout(scrollToTarget, 250);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname, loading]);

  return (
    <div className="results-page">
      <section className="section results-hero">
        <div className="container">
          <BrandHeading align="center" />
          <h1 className="section-title">ビフォーアフター実績</h1>
          <p className="section-subtitle">
            お客様の許可を得た範囲で掲載しています。個人差があり、結果を保証するものではありません。
          </p>
        </div>
      </section>

      {loading ? (
        <div className="loading section">読み込み中...</div>
      ) : (
        <ResultsVoicesSection results={results} testimonials={testimonials} />
      )}
    </div>
  );
}
