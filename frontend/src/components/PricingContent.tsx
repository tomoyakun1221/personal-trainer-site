import type { ReactNode } from "react";
import type { PricingPlan } from "../types";
import { ContactCta, TrialCta } from "./ContactCta";
import { InstagramLink } from "./InstagramLink";
import { resolveBodymakePlans } from "../constants/bodymakePlans";
import { resolveTicketPlans } from "../constants/pricingPlans";
import { BrandHeading } from "./BrandHeading";
import "./PricingContent.css";

function PricingCtaRow({ children }: { children: ReactNode }) {
  return (
    <div className="pricing-cta-row">
      {children}
      <InstagramLink />
    </div>
  );
}

const TRIAL_POINTS = [
  {
    num: "①",
    title: "自分に合った痩せ方・鍛え方が分かる",
    body: "SNSやYouTubeには様々な情報がありますが、体型や生活習慣によって合う方法は人それぞれ違います。カウンセリングでは、なぜ痩せにくいのか・なぜ続かないのか・どんな運動が合っているかを確認しながら、お客様に合った最適な方法をご提案します。",
  },
  {
    num: "②",
    title: "運動初心者でも安心して始められる",
    body: "「ジムは怖そう」「何をすればいいか分からない」そんな方でも安心してスタートできるよう、体験トレーニングではフォームや身体の使い方を丁寧にサポートします。無理なトレーニングではなく、体力レベルに合わせて進めるので、運動経験が少ない方にもおすすめです。",
  },
  {
    num: "③",
    title: "ジムやトレーナーとの相性を確認できる",
    body: "パーソナルジムは「通いやすさ」や「相性」もとても重要です。体験を通して、ジムの雰囲気・トレーナーの指導スタイル・続けやすさを実際に確認できるため、納得した状態でスタートできます。",
  },
];

interface PricingContentProps {
  plans: PricingPlan[];
  showPageHeader?: boolean;
  showCta?: boolean;
  centered?: boolean;
}

function BodyMakeCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className="pricing-bodymake-card">
      <header className="pricing-bodymake-card-head">
        <h3>{plan.name}</h3>
        {plan.course_breakdown && <p>{plan.course_breakdown}</p>}
        {plan.bulk_offer && <p className="pricing-bodymake-sessions">{plan.bulk_offer}</p>}
      </header>

      <div className="pricing-bodymake-price">
        <span className="pricing-ticket-yen">¥</span>
        {plan.price.toLocaleString()}
        <span className="pricing-bodymake-tax">（{plan.period}）</span>
      </div>

      {plan.description && <p className="pricing-bodymake-frequency">{plan.description}</p>}

      {plan.features.length > 0 && (
        <ul className="pricing-bodymake-features">
          {plan.features.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

function TicketCard({ plan }: { plan: PricingPlan }) {
  const promoLines = plan.promotion?.split("\n").filter(Boolean) ?? [];

  return (
    <article className="pricing-ticket-card">
      <header className="pricing-ticket-card-head">
        <h3>{plan.name}</h3>
        {plan.course_breakdown && <p>{plan.course_breakdown}</p>}
      </header>

      <div className="pricing-ticket-price">
        <span className="pricing-ticket-yen">¥</span>
        {plan.price.toLocaleString()}
        <span className="pricing-ticket-unit">／{plan.period}</span>
      </div>

      {plan.description && (
        <div className="pricing-ticket-desc">
          {plan.description.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}

      {plan.bulk_offer && <p className="pricing-ticket-bulk">{plan.bulk_offer}</p>}

      {promoLines.length > 0 && (
        <div className="pricing-ticket-promo">
          {promoLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}

      {plan.includes_drink && (
        <p className="pricing-ticket-note">※当該コースにはアフタードリンクサービスが含まれます。</p>
      )}

      {plan.target_audience && <p className="pricing-ticket-target">{plan.target_audience}</p>}
    </article>
  );
}

export function PricingContent({
  plans,
  showPageHeader = false,
  showCta = true,
  centered = false,
}: PricingContentProps) {
  const bodymake = resolveBodymakePlans(plans);
  const tickets = resolveTicketPlans(plans);

  return (
    <div className={`pricing-content ${centered ? "pricing-content--centered" : ""}`}>
      {showPageHeader && (
        <div className="container pricing-content-page-header">
          <BrandHeading align="center" />
          <p className="pricing-content-page-lead">料金はすべて税込表示です</p>
          <nav className="pricing-content-jump" aria-label="料金セクション">
            <a href="#trial-course">カウンセリング・体験</a>
            <a href="#ticket-courses">回数券コース</a>
            <a href="#bodymake-courses">ボディメイクコース</a>
          </nav>
        </div>
      )}

      <section
        id="trial-course"
        className="pricing-block pricing-block--tickets"
        aria-labelledby="trial-heading"
      >
        <div className="container">
          <header className="pricing-block-header pricing-block-header--center">
            <h2 id="trial-heading" className="pricing-section-heading">
              カウンセリング／体験トレーニング
            </h2>
          </header>

          <div className="pricing-trial-card">
            <ul className="pricing-trial-list">
              {TRIAL_POINTS.map((point) => (
                <li key={point.num} className="pricing-trial-item">
                  <div className="pricing-trial-item-head">
                    <span className="pricing-trial-num">{point.num}</span>
                    <h3>{point.title}</h3>
                  </div>
                  <p>{point.body}</p>
                </li>
              ))}
            </ul>
            <div className="pricing-trial-action">
              <p className="pricing-trial-free-label">※無料で実施致します！！</p>
              {showCta && (
                <PricingCtaRow>
                  <TrialCta />
                </PricingCtaRow>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="ticket-courses"
        className="pricing-block pricing-block--tickets"
        aria-labelledby="tickets-heading"
      >
        <div className="container">
          <header className="pricing-block-header pricing-block-header--center">
            <h2 id="tickets-heading" className="pricing-section-heading">
              回数券コース
            </h2>
            <p className="pricing-block-lead">
              週1でトレーニングしたい方へ。まとめ買いでお得にご利用いただけます。
            </p>
          </header>

          <div className="pricing-tickets-grid">
            {tickets.map((plan) => (
              <TicketCard key={`${plan.id}-${plan.name}`} plan={plan} />
            ))}
          </div>

          <div className="pricing-campaign">
            <p className="pricing-campaign-lead">期間限定！！</p>
            <p className="pricing-campaign-fee">
              入会費 <s>33,000円</s> → <strong>0円</strong>
            </p>
            <ul className="pricing-campaign-notes">
              <li>※各コース、回数券の有効期限は４カ月間となります。</li>
              <li>※料金は全て税込です</li>
            </ul>
          </div>

          {showCta && (
            <div className="pricing-content-cta">
              <PricingCtaRow>
                <ContactCta
                  label="回数券コースについての問い合わせ"
                  subject="回数券コースについての問い合わせ"
                  className="btn btn-primary"
                />
              </PricingCtaRow>
            </div>
          )}
        </div>
      </section>

      <section
        id="bodymake-courses"
        className="pricing-block pricing-block--bodymake"
        aria-labelledby="bodymake-heading"
      >
        <div className="container">
          <header className="pricing-block-header pricing-block-header--center">
            <h2 id="bodymake-heading" className="pricing-section-heading">
              ボディメイクコース
            </h2>
            <div className="pricing-block-meta pricing-block-meta--center">
              <span className="pricing-meta-chip">週2回（月8回のトレーニング）</span>
            </div>
          </header>

          <div className="pricing-bodymake-grid">
            {bodymake.map((plan) => (
              <BodyMakeCard key={`${plan.id}-${plan.name}`} plan={plan} />
            ))}
          </div>

          <div className="pricing-campaign pricing-campaign--bodymake">
            <p className="pricing-campaign-lead">期間限定！！</p>
            <p className="pricing-campaign-fee">
              入会費 <s>33,000円</s> → <strong>0円</strong>
            </p>
            <ul className="pricing-campaign-notes">
              <li>全てのコースにアフタードリンクサービス／栄養と食事指導が付いております。</li>
              <li>特別価格となり、回数券コースよりもお得にレッスンを受けることが可能です。</li>
              <li>※料金は全て税込です</li>
            </ul>
          </div>

          {showCta && (
            <div className="pricing-content-cta">
              <PricingCtaRow>
                <ContactCta
                  label="ボディメイクコースについて問い合わせ"
                  subject="ボディメイクコースについて問い合わせ"
                  className="btn btn-primary"
                />
              </PricingCtaRow>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
