import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { PricingPlan, Testimonial, Transformation } from "../types";
import { getHomeTransformations, HOME_TRANSFORMATIONS } from "../constants/transformations";
import { getHomeTestimonials, HOME_TESTIMONIALS } from "../constants/testimonials";
import { useSiteSetting } from "../hooks/useSiteSetting";
import { BrandHeading } from "../components/BrandHeading";
import { ContactCta } from "../components/ContactCta";
import { INSTAGRAM_URL } from "../constants/contact";
import { InstagramLink } from "../components/InstagramLink";
import { PricingContent } from "../components/PricingContent";
import { ResultsVoicesSection } from "../components/ResultsVoicesSection";
import { MachineIntroSection } from "../components/MachineIntroSection";
import { GYM_LABEL } from "../constants/brand";
import "./Home.css";

export function Home() {
  const { setting } = useSiteSetting();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [results, setResults] = useState<Transformation[]>(HOME_TRANSFORMATIONS);
  const [voices, setVoices] = useState<Testimonial[]>(HOME_TESTIMONIALS);

  useEffect(() => {
    api
      .getTransformations()
      .then((r) => setResults(getHomeTransformations(r)))
      .catch(() => setResults(HOME_TRANSFORMATIONS));

    api.getPricingPlans().then(setPlans).catch(() => {});

    api
      .getTestimonials()
      .then((v) => setVoices(getHomeTestimonials(v)))
      .catch(() => setVoices(HOME_TESTIMONIALS));
  }, []);

  const instagramUrl = setting?.instagram_url || INSTAGRAM_URL;

  return (
    <>
      <section className="hero hero--compact hero--centered">
        <div className="hero-accent" aria-hidden />
        <div className="container hero-content">
          <BrandHeading align="center" light />
          <div className="hero-actions">
            <ContactCta label="無料カウンセリング・体験" subject="無料カウンセリング・体験の申込" />
            <InstagramLink url={instagramUrl} />
          </div>
        </div>
      </section>

      <PricingContent plans={plans} showCta centered />

      <ResultsVoicesSection results={results} testimonials={voices} />

      <MachineIntroSection />

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <p className="cta-banner-label">{GYM_LABEL}</p>
          <h2>まずは無料カウンセリング・体験から</h2>
          <p>目標やお悩みをお聞かせください。あなたに合ったプランをご提案します。</p>
          <div className="hero-actions">
            <ContactCta label="メールでお問い合わせ" />
            <InstagramLink url={instagramUrl} />
          </div>
        </div>
      </section>
    </>
  );
}
