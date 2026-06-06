import type { PricingPlan } from "../types";
import { BODYMAKE_PLANS_FALLBACK } from "./bodymakePlans";

/** 回数券コース（API未取得時のフォールバック・スクショ準拠） */
export const TICKET_PLANS_FALLBACK: PricingPlan[] = [
  {
    id: 0,
    name: "50分コース",
    price: 4300,
    period: "回",
    plan_category: "ticket",
    course_breakdown: "40分トレーニング + 10分ボディケア",
    description: "週１でトレーニング受けたい方\nまとめ買いでお得にご利用いただけます",
    bulk_offer: "4回分 ¥15,500",
    promotion:
      "《期間限定OPEN記念》当該コース限定！\n3回限定の2,100円／回でお試しいただけます！\nパーソナルトレーニング受けたいけど不安でどんなものなのか、まずは体験したい方におすすめのコースです！",
    target_audience: null,
    includes_drink: false,
    featured: false,
    position: 1,
    features: [],
  },
  {
    id: 0,
    name: "70分コース",
    price: 6400,
    period: "回",
    plan_category: "ticket",
    course_breakdown: "60分トレーニング + 10分ボディケア",
    description: "週１でトレーニング受けたい方\nまとめ買いでお得にご利用いただけます",
    bulk_offer: "4回分 ¥24,000",
    promotion: null,
    target_audience: "栄養補給したい方 一息休憩入れたい方におすすめのコースです。",
    includes_drink: true,
    featured: false,
    position: 2,
    features: [],
  },
  {
    id: 0,
    name: "90分コース",
    price: 8400,
    period: "回",
    plan_category: "ticket",
    course_breakdown: "80分トレーニング + 10分ボディケア",
    description: "週１でトレーニング受けたい方\nまとめ買いでお得にご利用いただけます",
    bulk_offer: "4回分 ¥32,000",
    promotion: null,
    target_audience: "栄養補給したい方 一息休憩入れたい方におすすめのコースです。",
    includes_drink: true,
    featured: false,
    position: 3,
    features: [],
  },
];

/** GitHub Pages 等・APIなし運用時の全料金プラン */
export const ALL_PRICING_PLANS_FALLBACK: PricingPlan[] = [
  {
    id: 0,
    name: "カウンセリング／体験トレーニング",
    price: 0,
    period: "回",
    plan_category: "trial",
    course_breakdown: null,
    description: "※初回限定・無料で実施致します！！",
    target_audience: null,
    featured: true,
    position: 0,
    features: [],
  },
  ...TICKET_PLANS_FALLBACK,
  ...BODYMAKE_PLANS_FALLBACK,
];

export function resolveAllPlans(plans: PricingPlan[]): PricingPlan[] {
  if (plans.length === 0) return ALL_PRICING_PLANS_FALLBACK;
  return plans;
}

export function resolveTicketPlans(plans: PricingPlan[]): PricingPlan[] {
  const fromApi = plans
    .filter((p) => p.plan_category === "ticket")
    .sort((a, b) => a.position - b.position);

  if (fromApi.length >= 3) return fromApi;
  if (fromApi.length > 0) return fromApi;

  return TICKET_PLANS_FALLBACK;
}
