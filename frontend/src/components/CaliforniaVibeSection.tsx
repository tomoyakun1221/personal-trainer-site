import {
  CALIFORNIA_VIBE_IMAGES,
  CALIFORNIA_VIBE_PILLARS,
} from "../constants/californiaVibe";
import "./CaliforniaVibeSection.css";

export function CaliforniaVibeSection() {
  return (
    <section className="california-vibe" id="space" aria-labelledby="california-vibe-heading">
      <div className="california-vibe-glow" aria-hidden />
      <div className="container california-vibe-inner">
        <header className="california-vibe-header">
          <p className="california-vibe-eyebrow">WEST COAST · CALIFORNIA</p>
          <h2 id="california-vibe-heading" className="california-vibe-title">
            西海岸テイストの空間で、
            <br className="california-vibe-title-br" />
            また来たくなるトレーニングへ
          </h2>
          <p className="california-vibe-lead">
            カリフォルニア（アメリカ西海岸）のリゾートを思わせる、おしゃれで心地よい空間。
            厳しいジムの暗さではなく、光と余白があるから——トレーニングが「習慣」に、通うことが「楽しみ」に変わります。
          </p>
        </header>

        <div className="california-vibe-main">
          <div className="california-vibe-gallery" aria-label="ジムの空間イメージ">
            <div className="california-vibe-collage">
              <figure className="california-vibe-photo california-vibe-photo--tall">
                <img
                  src={CALIFORNIA_VIBE_IMAGES.evening.src}
                  alt={CALIFORNIA_VIBE_IMAGES.evening.alt}
                  loading="lazy"
                />
              </figure>
              <figure className="california-vibe-photo california-vibe-photo--top">
                <img
                  src={CALIFORNIA_VIBE_IMAGES.exterior.src}
                  alt={CALIFORNIA_VIBE_IMAGES.exterior.alt}
                  loading="lazy"
                />
              </figure>
              <figure className="california-vibe-photo california-vibe-photo--bottom">
                <img
                  src={CALIFORNIA_VIBE_IMAGES.landscape.src}
                  alt={CALIFORNIA_VIBE_IMAGES.landscape.alt}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>

          <div className="california-vibe-copy">
            <blockquote className="california-vibe-quote">
              <p>
                「行かなきゃ」ではなく、
                <strong>「行きたい」</strong>
                から始める。
              </p>
            </blockquote>

            <ul className="california-vibe-pillars">
              {CALIFORNIA_VIBE_PILLARS.map((item, index) => (
                <li key={item.title} className="california-vibe-pillar">
                  <span className="california-vibe-pillar-num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="california-vibe-closing">
              肩の力を抜いて、自分らしく鍛える。
              <span className="california-vibe-closing-accent">TSP</span>
              は、おしゃれでカッコいい空間のまま、結果もしっかり出すパーソナルジムです。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
