import type { Transformation } from "../types";
import { TRANSFORMATION_IMAGES } from "../constants/transformations";
import "./TransformationCard.css";

function resolveImageUrl(item: Transformation): string {
  const label = item.client_label ?? item.title ?? "";

  if (label.includes("女性")) return TRANSFORMATION_IMAGES.female;
  if (label.includes("男性")) return TRANSFORMATION_IMAGES.male;
  if (item.before_image_url?.includes("/images/transformation_")) {
    return item.before_image_url;
  }
  if (item.before_image_url) return item.before_image_url;

  return TRANSFORMATION_IMAGES.female;
}

export function TransformationCard({ item }: { item: Transformation }) {
  const imageUrl = resolveImageUrl(item);

  return (
    <article className="result-ba-card">
      <div className="result-ba-frame">
        <img
          src={imageUrl}
          alt={item.result_summary || item.title}
          className="result-ba-image"
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            const label = item.client_label ?? "";
            img.src = label.includes("男性")
              ? TRANSFORMATION_IMAGES.male
              : TRANSFORMATION_IMAGES.female;
          }}
        />
      </div>
    </article>
  );
}
