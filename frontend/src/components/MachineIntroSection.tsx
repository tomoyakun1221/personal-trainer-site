import { Link } from "react-router-dom";
import { MACHINE_IMAGE, MACHINE_TRAINING_EXAMPLES } from "../constants/machine";
import "./MachineIntroSection.css";

export function MachineIntroSection() {
  return (
    <section className="machine-intro" id="machine">
      <div className="container machine-intro-inner">
        <header className="machine-intro-header">
          <p className="machine-intro-eyebrow">EQUIPMENT</p>
          <h2 className="home-section-heading home-section-heading--accent">マシン紹介</h2>
        </header>

        <div className="machine-intro-grid">
          <div className="machine-intro-visual">
            <div className="machine-intro-frame">
              <img src={MACHINE_IMAGE} alt="最新型オールインワンマシン" loading="lazy" />
              <span className="machine-intro-badge">5 in 1</span>
            </div>
          </div>

          <div className="machine-intro-copy">
            <p className="machine-intro-lead">
              <strong>5つのマシン機能がひとつに集約された最新型のオールインワンマシン</strong>を導入。
            </p>
            <p>
              様々なトレーニング・ニーズに応えるマシンをぜひ体験してください！
            </p>

            <h3 className="machine-intro-subtitle">＜主なトレーニング例＞</h3>
            <ul className="machine-intro-tags">
              {MACHINE_TRAINING_EXAMPLES.map((name) => (
                <li key={name}>{name}</li>
              ))}
              <li className="machine-intro-tags-more">など</li>
            </ul>

            <div className="machine-intro-footer">
              <Link to="/equipment" className="btn btn-primary">
                トレーニング設備の詳細を見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
