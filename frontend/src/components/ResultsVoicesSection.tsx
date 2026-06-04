import { Link } from "react-router-dom";
import type { Testimonial, Transformation } from "../types";
import { TransformationCard } from "./TransformationCard";
import { TestimonialCard } from "./TestimonialCard";
import "./ResultsVoicesSection.css";

interface ResultsVoicesSectionProps {
  results: Transformation[];
  testimonials: Testimonial[];
}

export function ResultsVoicesSection({ results, testimonials }: ResultsVoicesSectionProps) {
  return (
    <section className="results-voices" id="results-voices">
      <div className="container results-voices-inner">
        <header className="results-voices-header">
          <h2 className="home-section-heading">ビフォーアフター実績</h2>
          <p className="home-section-lead">お客様の変化をご紹介（許可を得た範囲で掲載）</p>
        </header>

        <div className="results-voices-ba-grid">
          {results.map((item) => (
            <TransformationCard key={item.id} item={item} />
          ))}
        </div>

        <header className="results-voices-header results-voices-header--voices">
          <h2 className="home-section-heading home-section-heading--accent">お客様の声</h2>
          <p className="home-section-lead">実際にトレーニングされた方の感想</p>
        </header>

        <div className="results-voices-testimonials">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        <div className="results-voices-footer">
          <Link to="/results" className="btn btn-outline">
            実績をもっと見る
          </Link>
        </div>
      </div>
    </section>
  );
}
