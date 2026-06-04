import type { PricingPlan } from "../types";

const BODYMAKE_BREAKDOWN = "75分トレーニング + 15分ボディケア";

/** ボディメイクコース（チラシ準拠・API未取得時） */
export const BODYMAKE_PLANS_FALLBACK: PricingPlan[] = [
  {
    id: 0,
    name: "2ヶ月コース",
    price: 95000,
    period: "税込",
    plan_category: "bodymake",
    course_breakdown: BODYMAKE_BREAKDOWN,
    bulk_offer: "全16回",
    description: "週2回（月8回のトレーニング）を2ヶ月間実施していきます",
    target_audience: null,
    includes_drink: true,
    featured: true,
    position: 1,
    features: [
      "長年スポーツジムに通っているのに、なかなか理想の身体にならない…という方へ向けた、目標に直結するボディメイクを行うプログラムです。",
      "体力・目的に合わせてトレーニングの量や頻度、強度を細かく調整し、効率よく体を作っていくサポートをします。",
      "基本から正しいフォームを身につけながら、今の自分の課題を見つけ、続けられるトレーニングの習慣を定着させます。",
      "限られた期間で、遠回りせずに理想の身体を目指したい方におすすめです。",
    ],
  },
  {
    id: 0,
    name: "3ヶ月コース",
    price: 145000,
    period: "税込",
    plan_category: "bodymake",
    course_breakdown: BODYMAKE_BREAKDOWN,
    bulk_offer: "全24回",
    description: "週2回（月8回のトレーニング）を3ヶ月間実施していきます",
    target_audience: null,
    includes_drink: true,
    featured: false,
    position: 2,
    features: [
      "運動を「特別なこと」ではなく、日常生活の中で自然に続けられる健康的な習慣を身につけることを目指します。",
      "自宅で取り入れやすいトレーニングや、効率的に筋肉を増やしながらダイエットする方法なども合わせて伝えていきます。",
      "食事や睡眠、活動量など、生活全体のバランスを整えながら、根本から体質を変えていくサポートを行います。",
      "「一時的なダイエット」ではなく、長く健康な身体を維持したい方に最適なプログラムです。",
    ],
  },
  {
    id: 0,
    name: "4ヶ月コース",
    price: 180000,
    period: "税込",
    plan_category: "bodymake",
    course_breakdown: BODYMAKE_BREAKDOWN,
    bulk_offer: "全32回",
    description: "週2回（月8回のトレーニング）を4ヶ月間実施していきます",
    target_audience: null,
    includes_drink: true,
    featured: false,
    position: 3,
    features: [
      "ボディメイクを「つらい努力」ではなく、「楽しいライフスタイル」に変えていくことを重視したプログラムです。",
      "通常のトレーニング指導に加え、身体を動かす時間そのものを楽しめる遊び的な要素も取り入れていきます。",
      "運動初心者の方でも、気づけば「体を動かすことが好きだ」と感じられるような環境づくりを目指します。",
      "食事や運動を前向きに楽しみながら、ライフスタイルそのものを豊かにしていきたい方に向けたオリジナルプログラムです。",
    ],
  },
];

export function resolveBodymakePlans(plans: PricingPlan[]): PricingPlan[] {
  const fromApi = plans
    .filter((p) => p.plan_category === "bodymake")
    .sort((a, b) => a.position - b.position);

  if (fromApi.length >= 3) return fromApi;
  if (fromApi.length > 0) return fromApi;

  return BODYMAKE_PLANS_FALLBACK;
}
