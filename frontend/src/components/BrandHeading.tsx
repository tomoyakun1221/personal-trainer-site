import { GYM_LABEL, GYM_NAME } from "../constants/brand";
import "./BrandHeading.css";

interface BrandHeadingProps {
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function BrandHeading({ subtitle, align = "left", light = false }: BrandHeadingProps) {
  return (
    <div className={`brand-heading brand-heading--${align} ${light ? "brand-heading--light" : ""}`}>
      <p className="brand-heading-label">{GYM_LABEL}</p>
      <p className="brand-heading-name">{GYM_NAME}</p>
      {subtitle && <p className="brand-heading-sub">{subtitle}</p>}
    </div>
  );
}
