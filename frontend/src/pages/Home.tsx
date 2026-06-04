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
  const instagramUrl = setting?.instagram_url || INSTAGRAM_URL;

  return (
    <>
      <section className="hero hero--compact hero--centered">
        <div className="hero-accent" aria-hidden />
        <div className="container hero-content">
          <BrandHeading align="center" light />
        </div>
      </section>

      <PricingContent plans={[]} homePreview showCta centered />

      <ResultsVoicesSection results={[]} testimonials={[]} homePreview />

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
