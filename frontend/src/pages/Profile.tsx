import { useSiteSetting } from "../hooks/useSiteSetting";
import { BrandHeading } from "../components/BrandHeading";
import {
  PROFILE_BIRTHDATE,
  PROFILE_CLOSING,
  PROFILE_CTA_QUESTIONS,
  PROFILE_IMAGE,
  PROFILE_NAME,
  PROFILE_QUALIFICATIONS,
  PROFILE_SECTIONS,
  PROFILE_SPECIALTIES,
  PROFILE_STATS,
  PROFILE_TAGLINE,
} from "../constants/profile";
import "./Profile.css";

export function Profile() {
  const { setting, loading } = useSiteSetting();

  if (loading && !setting) return <div className="loading">読み込み中...</div>;

  const profileImage = setting?.profile_image_url || PROFILE_IMAGE;

  return (
    <section className="section profile-page">
      <div className="container">
        <BrandHeading align="center" />
        <h1 className="section-title profile-page-title">トレーナー紹介</h1>

        <div className="profile-grid">
          <div className="profile-image-wrap card">
            <img src={profileImage} alt={PROFILE_NAME} />
          </div>

          <div className="profile-content">
            <h2 className="profile-name">{PROFILE_NAME}</h2>
            <p className="profile-tagline">{PROFILE_TAGLINE}</p>
            <p className="profile-birthdate">{PROFILE_BIRTHDATE}</p>

            <ul className="profile-credential-list">
              {PROFILE_QUALIFICATIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>

            {setting?.location && (
              <div className="profile-meta">
                <p>
                  <strong>所在地:</strong> {setting.location}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="profile-body">
          {PROFILE_SECTIONS.map((section, index) => (
            <div key={index} className="profile-body-block card">
              {section.title && <h3>{section.title}</h3>}
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {section.title === "自身のダイエット実績" && (
                <div className="profile-stats">
                  {PROFILE_STATS.map((stat) => (
                    <div key={stat.label} className="profile-stat">
                      <span className="profile-stat-value">{stat.value}</span>
                      <span className="profile-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="profile-cta card">
            <h3>こんな方におすすめ</h3>
            <ul className="profile-cta-list">
              {PROFILE_CTA_QUESTIONS.map((q) => (
                <li key={q}>「{q}」</li>
              ))}
            </ul>
            <p className="profile-closing">{PROFILE_CLOSING}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="card">
            <h3>得意分野</h3>
            <ul>
              {PROFILE_SPECIALTIES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
