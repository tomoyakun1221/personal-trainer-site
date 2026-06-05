import { Link } from "react-router-dom";
import { BrandHeading } from "../components/BrandHeading";
import { InstagramLink } from "../components/InstagramLink";
import { MACHINE_IMAGE, MACHINE_TRAINING_EXAMPLES } from "../constants/machine";
import { EQUIPMENT_AUDIENCE_TAGS, EQUIPMENT_ITEMS } from "../constants/equipment";
import "./Equipment.css";

export function Equipment() {
  return (
    <div className="equipment-page">
      <section id="equipment-top" className="section equipment-hero">
        <div className="container equipment-hero-inner">
          <BrandHeading align="center" />
          <h1 className="section-title">トレーニング設備・器具</h1>
          <p className="section-subtitle equipment-hero-lead">
            運動初心者からパフォーマンス向上・ダイエットまで。
            目的に合わせて選べる、こだわりの設備をご紹介します。
          </p>
          <ul className="equipment-audience-tags" aria-label="こんな方におすすめ">
            {EQUIPMENT_AUDIENCE_TAGS.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="equipment-all-in-one">
        <div className="container equipment-all-in-one-inner">
          <div className="equipment-all-in-one-visual">
            <img
              src={MACHINE_IMAGE}
              alt="オールインワン・マルチファンクションマシン（パワーラック＋ケーブル）"
              loading="lazy"
            />
            <span className="equipment-all-in-one-badge">5 in 1</span>
          </div>
          <div className="equipment-all-in-one-copy">
            <h2 className="equipment-section-title">オールインワンマシン</h2>
            <p className="equipment-all-in-one-lead">
              <strong>5つのマシン機能がひとつに集約された最新型</strong>
              のオールインワンマシンも導入。ベンチプレスからケーブル種目まで、多彩なメニューに対応します。
            </p>
            <ul className="equipment-tag-list">
              {MACHINE_TRAINING_EXAMPLES.map((name) => (
                <li key={name}>{name}</li>
              ))}
              <li className="equipment-tag-list-more">など</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="equipment-list" aria-labelledby="equipment-list-heading">
        <div className="container">
          <h2 id="equipment-list-heading" className="equipment-section-title equipment-section-title--center">
            充実のトレーニング器具
          </h2>
          <p className="equipment-list-lead">
            フォーム重視の指導と組み合わせて、初心者の方でも効果的に、経験者の方でもさらに高いレベルへ。
          </p>

          <div className="equipment-cards">
            {EQUIPMENT_ITEMS.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                className={`equipment-card equipment-card--${item.accent} ${index % 2 === 1 ? "equipment-card--reverse" : ""}`}
              >
                <div
                  className={`equipment-card-visual ${item.imageFit === "contain" ? "equipment-card-visual--contain" : ""} ${item.id === "hex-bar" || item.id === "punching" ? "equipment-card-visual--tall" : ""}`}
                >
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                </div>
                <div className="equipment-card-body">
                  <p className="equipment-card-eyebrow">{item.subtitle}</p>
                  <h3 className="equipment-card-title">{item.title}</h3>
                  {item.paragraphs.map((p) => (
                    <p key={p.slice(0, 20)} className="equipment-card-text">
                      {p}
                    </p>
                  ))}
                  {item.audienceBlocks && item.audienceBlocks.length > 0 && (
                    <div className="equipment-audience-blocks">
                      {item.audienceBlocks.map((block) => (
                        <div key={block.title} className="equipment-audience-block">
                          <h4 className="equipment-audience-block-title">{block.title}</h4>
                          <p className="equipment-audience-block-text">{block.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <ul className="equipment-card-highlights">
                    {item.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="equipment-cta section">
        <div className="container equipment-cta-inner">
          <h2>設備を実際に体験してみませんか？</h2>
          <p>まずは無料カウンセリング・体験トレーニングで、ジムの雰囲気と器具をご確認ください。</p>
          <div className="equipment-cta-actions">
            <div className="equipment-cta-row">
              <Link to="/contact" className="btn btn-primary">
                体験・カウンセリングのご予約
              </Link>
              <InstagramLink />
            </div>
            <Link to="/pricing" className="btn btn-outline">
              料金を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
