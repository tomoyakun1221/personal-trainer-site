import { Link } from "react-router-dom";
import { useSiteSetting } from "../hooks/useSiteSetting";
import { BrandHeading } from "../components/BrandHeading";
import { INSTAGRAM_URL } from "../constants/contact";
import { InstagramLink } from "../components/InstagramLink";
import { PricingContent } from "../components/PricingContent";
import { ResultsVoicesSection } from "../components/ResultsVoicesSection";
import { CaliforniaVibeSection } from "../components/CaliforniaVibeSection";
import { MachineIntroSection } from "../components/MachineIntroSection";
import "./Home.css";

export function Home() {
  const { setting } = useSiteSetting();
  const instagramUrl = setting?.instagram_url || INSTAGRAM_URL;

  return (
    <>
      <section className="hero hero--compact hero--centered">
        <div className="hero-accent" aria-hidden />
        <div className="container hero-content">
          <BrandHeading align="center" light />
        </div>
      </section>

      <CaliforniaVibeSection />

      <PricingContent plans={[]} homePreview showCta centered />

      <ResultsVoicesSection results={[]} testimonials={[]} homePreview />

      <MachineIntroSection />

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <h2>まずは無料カウンセリング・体験から</h2>
          <p>目標やお悩みをお聞かせください。あなたに合ったプランをご提案します。</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">
              予約・お問い合わせ
            </Link>
            <InstagramLink url={instagramUrl} />
          </div>
        </div>
      </section>
    </>
  );
}
