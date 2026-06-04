import type { Transformation } from "../types";

export const TRANSFORMATION_IMAGES = {
  female: "/images/transformation_female.png",
  male: "/images/transformation_male.png",
} as const;

export const HOME_TRANSFORMATIONS: Transformation[] = [
  {
    id: 1,
    title: "女性ゲストの変化",
    client_label: "女性ゲスト",
    description: null,
    before_weight: 85.4,
    after_weight: 78.6,
    result_summary: "2ヶ月で6.8kg減！",
    composite_display: true,
    before_image_url: TRANSFORMATION_IMAGES.female,
    after_image_url: null,
    duration_weeks: 8,
  },
  {
    id: 2,
    title: "男性ゲストの変化",
    client_label: "男性ゲスト",
    description: null,
    before_weight: 84,
    after_weight: 81,
    result_summary: "2ヶ月で3kg減！",
    composite_display: true,
    before_image_url: TRANSFORMATION_IMAGES.male,
    after_image_url: null,
    duration_weeks: 8,
  },
];

function enrichTransformation(item: Transformation): Transformation {
  const label = item.client_label ?? item.title ?? "";
  let image = item.before_image_url;

  if (label.includes("女性")) image = TRANSFORMATION_IMAGES.female;
  else if (label.includes("男性")) image = TRANSFORMATION_IMAGES.male;
  else if (!image || image.includes("localhost:3000")) {
    image = TRANSFORMATION_IMAGES.female;
  }

  return {
    ...item,
    before_image_url: image,
    composite_display: true,
  };
}

export function enrichTransformations(apiResults: Transformation[]): Transformation[] {
  if (apiResults.length === 0) return HOME_TRANSFORMATIONS;
  return apiResults.map(enrichTransformation);
}

export function getHomeTransformations(apiResults: Transformation[]): Transformation[] {
  return enrichTransformations(apiResults).slice(0, 2);
}
