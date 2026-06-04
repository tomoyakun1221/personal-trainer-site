import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Transformation } from "../types";
import { enrichTransformations, HOME_TRANSFORMATIONS } from "../constants/transformations";
import { BrandHeading } from "../components/BrandHeading";
import { TransformationCard } from "../components/TransformationCard";
import "./Results.css";

export function Results() {
  const [items, setItems] = useState<Transformation[]>(HOME_TRANSFORMATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTransformations()
      .then((data) => setItems(enrichTransformations(data)))
      .catch(() => setItems(HOME_TRANSFORMATIONS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="results-page">
      <section className="section results-hero">
        <div className="container">
          <BrandHeading align="center" />
          <h1 className="section-title">ビフォーアフター実績</h1>
          <p className="section-subtitle">
            お客様の許可を得た範囲で掲載しています。個人差があり、結果を保証するものではありません。
          </p>
        </div>
      </section>

      <section className="section results-body">
        <div className="container">
          {loading ? (
            <div className="loading">読み込み中...</div>
          ) : (
            <div className="results-grid">
              {items.map((item) => (
                <TransformationCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
