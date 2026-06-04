import type { Testimonial } from "../types";

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    client_name: "お客様の声（男性ゲスト）",
    client_age: null,
    guest_type: "male",
    content: [
      "2ヶ月で3キロ！",
      "シェイプアップもできて良かったです！",
      "柔軟性アップや筋肉アップ、食事制限含めてありがたかったです！",
    ].join("\n"),
    rating: 5,
  },
  {
    id: 2,
    client_name: "お客様の声（女性ゲスト）",
    client_age: null,
    guest_type: "female",
    content: [
      "今までなかなか体重が減らず諦めかけていましたが、トレーナーさんのサポートのおかげで数値も見た目も変化を実感することができました。",
      "特に、体重が停滞したり少し増えてしまったりした時でも決して焦らせることなく真摯に寄り添ってくださったことが心強かったです。",
      "毎日の食事報告でもポジティブな言葉をいただけたので、モチベーションを高く維持できました。",
      "週一のトレーニングでは家でも実践しやすいメニューを中心に教えてくださり、疑問にもいつも丁寧に答えていただけたのも良かったです。",
    ].join("\n"),
    rating: 5,
  },
];

export function getHomeTestimonials(api: Testimonial[]): Testimonial[] {
  if (api.length === 0) return HOME_TESTIMONIALS;
  return [...api].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}
