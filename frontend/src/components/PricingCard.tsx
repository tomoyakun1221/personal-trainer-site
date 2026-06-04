import type { PricingPlan } from "../types";
import { ContactCta } from "./ContactCta";
import "./PricingCard.css";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const isTrial = plan.plan_category === "trial" || plan.price === 0;
  const isTicket = plan.plan_category === "ticket";

  return (
    <article className={`pricing-card card ${plan.featured ? "is-featured" : ""} ${isTrial ? "is-trial" : ""}`}>
      {plan.featured && <span className="pricing-badge">おすすめ</span>}
      <h3>{plan.name}</h3>
      {plan.course_breakdown && <p className="pricing-breakdown">{plan.course_breakdown}</p>}
      <p className="pricing-price">
        {isTrial ? (
          <span className="pricing-free">無料</span>
        ) : (
          <>
            ¥{plan.price.toLocaleString()}
            <span>／{plan.period}</span>
          </>
        )}
      </p>
      {plan.description && <p className="pricing-desc">{plan.description}</p>}
      {plan.bulk_offer && <p className="pricing-bulk">{plan.bulk_offer}</p>}
      {plan.promotion && <p className="pricing-promo">{plan.promotion}</p>}
      {plan.includes_drink && <p className="pricing-note">※アフタードリンクサービス付き</p>}
      {plan.features.length > 0 && (
        <ul>
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
      {plan.target_audience && <p className="pricing-target">{plan.target_audience}</p>}
      <ContactCta
        className="btn btn-primary pricing-cta"
        label={isTrial ? "体験を申し込む" : isTicket ? "お問い合わせ" : "無料相談する"}
        subject={isTrial ? "体験の申込" : "お問い合わせ"}
      />
    </article>
  );
}
