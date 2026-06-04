import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../lib/api";
import type { PricingPlan } from "../types";
import { ALL_PRICING_PLANS_FALLBACK } from "../constants/pricingPlans";
import { PricingContent } from "../components/PricingContent";

const isStaticSite = import.meta.env.VITE_STATIC_SITE === "true";

export function Pricing() {
  const location = useLocation();
  const [plans, setPlans] = useState<PricingPlan[]>(
    isStaticSite ? ALL_PRICING_PLANS_FALLBACK : []
  );
  const [loading, setLoading] = useState(!isStaticSite);

  useEffect(() => {
    if (isStaticSite) return;
    api
      .getPricingPlans()
      .then(setPlans)
      .catch(() => setPlans(ALL_PRICING_PLANS_FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, loading]);

  if (loading) {
    return <div className="loading section">読み込み中...</div>;
  }

  return <PricingContent plans={plans} showPageHeader showCta />;
}
