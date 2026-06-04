import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { PricingPlan } from "../types";
import { PricingContent } from "../components/PricingContent";

export function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPricingPlans().then(setPlans).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading section">読み込み中...</div>;
  }

  return <PricingContent plans={plans} showPageHeader showCta />;
}
