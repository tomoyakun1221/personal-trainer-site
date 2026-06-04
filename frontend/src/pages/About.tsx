import type { ReactNode } from "react";
import { BrandHeading } from "../components/BrandHeading";
import { ContactCta } from "../components/ContactCta";
import { InstagramLink } from "../components/InstagramLink";
import {
  COMPANY_CLOSED,
  COMPANY_EMAIL,
  COMPANY_HOURS,
  COMPANY_NAME,
  COMPANY_SERVICES,
  COMPANY_TEL,
  COMPANY_WEBSITE_NOTE,
} from "../constants/company";
import "./About.css";

const rows: { label: string; content: ReactNode }[] = [
  { label: "事業所名", content: COMPANY_NAME },
  {
    label: "事業内容",
    content: (
      <ul className="about-services">
        {COMPANY_SERVICES.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  { label: "営業時間", content: COMPANY_HOURS },
  { label: "定休日", content: COMPANY_CLOSED },
  { label: "ホームページ", content: COMPANY_WEBSITE_NOTE },
  {
    label: "TEL",
    content: (
      <a href={`tel:${COMPANY_TEL.replace(/-/g, "")}`} className="about-link">
        {COMPANY_TEL}
      </a>
    ),
  },
  {
    label: "メール",
    content: (
      <a href={`mailto:${COMPANY_EMAIL}`} className="about-link">
        {COMPANY_EMAIL}
      </a>
    ),
  },
];

export function About() {
  return (
    <section className="section about-page">
      <div className="container">
        <BrandHeading align="center" />
        <header className="about-header">
          <h1 className="section-title">会社概要</h1>
          <p className="section-subtitle">Company Profile</p>
        </header>

        <div className="about-table card">
          <dl className="about-dl">
            {rows.map((row) => (
              <div key={row.label} className="about-row">
                <dt>{row.label}</dt>
                <dd>{row.content}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="about-actions">
          <ContactCta label="メールでお問い合わせ" />
          <a href={`tel:${COMPANY_TEL.replace(/-/g, "")}`} className="btn btn-outline">
            {COMPANY_TEL} に電話
          </a>
          <InstagramLink />
        </div>
      </div>
    </section>
  );
}
