import { assetPath } from "../lib/assetPath";

export const CALIFORNIA_VIBE_IMAGES = {
  evening: {
    src: assetPath("images/california-vibe-03.png"),
    alt: "夕暮れにライトアップされた西海岸テイストの建物外観",
  },
  landscape: {
    src: assetPath("images/california-vibe-01.png"),
    alt: "夕暮れの光が差し込む、パームツリーと岩のカリフォルニア風ランドスケープ",
  },
  exterior: {
    src: assetPath("images/california-vibe-02.png"),
    alt: "白いサイディングとウッドデッキの西海岸テイストな建物外観",
  },
} as const;

export const CALIFORNIA_VIBE_PILLARS = [
  {
    title: "リゾートのような開放感",
    body: "西海岸を思わせる光と余白。閉ざされた空間ではなく、気分が自然と上がるトレーニング環境です。",
  },
  {
    title: "おしゃれで、通うのが楽しみに",
    body: "洗練されたインテリアと外観。写真を撮りたくなる空間だから、続けるモチベーションも違います。",
  },
  {
    title: "「また来たい」が続く場所",
    body: "頑張りすぎないのに、しっかり変わる。定期的に通いたくなる、自分らしいトレーニングライフを。",
  },
] as const;
