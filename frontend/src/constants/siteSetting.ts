import type { SiteSetting } from "../types";
import { assetPath } from "../lib/assetPath";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "./contact";

export const STATIC_SITE_SETTING: SiteSetting = {
  id: 1,
  trainer_name: "TSP",
  tagline: "一人ひとりに寄り添い、「続けられるボディメイク」をサポートします",
  hero_description:
    "カウンセリングと体験トレーニングで、ジムやトレーナーとの相性も確認できます。運動初心者の方も安心して始められます。",
  profile_title: "トレーナー紹介",
  profile_body:
    "NSCA-CPT資格保有。フリーランスエンジニア兼パーソナルトレーナーとして活動。科学的根拠に基づいた指導と、続けやすい食事・トレーニングをご提案します。",
  qualifications: "NSCA-CPT（全米ストレングス＆コンディショニング協会認定パーソナルトレーナー）",
  specialties:
    "ダイエット・ボディメイク\n運動初心者サポート\nサーフィンパフォーマンス向上\n自宅トレーニング・ボディケア",
  line_url: null,
  instagram_url: INSTAGRAM_URL,
  email: CONTACT_EMAIL,
  phone: "090-5408-6445",
  location: null,
  profile_image_url: assetPath("images/trainer_profile.png"),
  hero_image_url: null,
};
