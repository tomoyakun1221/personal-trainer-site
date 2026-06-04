import { Link } from "react-router-dom";
import type { Testimonial, Transformation } from "../types";
import { TransformationCard } from "./TransformationCard";
import { TestimonialCard } from "./TestimonialCard";
import "./ResultsVoicesSection.css";

interface ResultsVoicesSectionProps {
  results: Transformation[];
  testimonials: Testimonial[];
  /** トップ用: 実績ページへ誘導 */
  homePreview?: boolean;
}

function ResultsPreviewBlock({
  title,
  lead,
  to,
  linkLabel,
  accent,
}: {
  title: string;
  lead: string;
  to: string;
  linkLabel: string;
  accent?: boolean;
}) {
  return (
    <div className="results-voices-preview-block">
      <header className="results-voices-header">
        <h2 className={`home-section-heading ${accent ? "home-section-heading--accent" : ""}`}>
          {title}
        </h2>
        <p className="home-section-lead">{lead}</p>
      </header>
      <Link to={to} className="btn btn-primary">
        {linkLabel}
      </Link>
    </div>
  );
}

export function ResultsVoicesSection({
  results,
  testimonials,
  homePreview = false,
}: ResultsVoicesSectionProps) {
  if (homePreview) {
    return (
      <section className="results-voices results-voices--preview">
        <div className="container results-voices-inner">
          <ResultsPreviewBlock
            title="ビフォーアフター実績"
            lead="お客様の変化をご紹介（許可を得た範囲で掲載）"
            to="/results#before-after"
            linkLabel="ビフォーアフター実績を見る"
          />
          <ResultsPreviewBlock
            title="お客様の声"
            lead="実際にトレーニングされた方の感想"
            to="/results#voices"
            linkLabel="お客様の声を見る"
            accent
          />
        </div>
      </section>
    );
  }

  return (
    <section className="results-voices" id="results-voices">
      <div className="container results-voices-inner results-voices-inner--page">
        <div id="before-after" className="results-voices-block">
          <header className="results-voices-header">
            <h2 className="home-section-heading">ビフォーアフター実績</h2>
            <p className="home-section-lead">お客様の変化をご紹介（許可を得た範囲で掲載）</p>
          </header>

          <div className="results-voices-ba-grid">
            {results.map((item) => (
              <TransformationCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div id="voices" className="results-voices-block results-voices-block--voices">
          <header className="results-voices-header results-voices-header--voices">
            <h2 className="home-section-heading home-section-heading--accent">お客様の声</h2>
            <p className="home-section-lead">実際にトレーニングされた方の感想</p>
          </header>

          <div className="results-voices-testimonials">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
