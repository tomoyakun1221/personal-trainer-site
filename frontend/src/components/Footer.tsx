import { Link } from "react-router-dom";
import type { SiteSetting } from "../types";
import { GYM_LABEL, GYM_NAME } from "../constants/brand";
import "./Footer.css";

interface FooterProps {
  setting: SiteSetting | null;
}

export function Footer({ setting }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">
            <span className="footer-brand-sub">{GYM_LABEL}</span>
            <span className="footer-brand-main">{GYM_NAME}</span>
          </p>
          {setting?.location && <p className="footer-muted">{setting.location}</p>}
        </div>
        <div className="footer-links">
          <Link to="/">トップ</Link>
          <Link to="/profile">プロフィール</Link>
          <Link to="/pricing">料金</Link>
          <Link to="/results">実績</Link>
          <Link to="/about">会社概要</Link>
          <Link to="/equipment">設備</Link>
          <Link to="/contact">予約・お問い合わせ</Link>
        </div>
      </div>
      <div className="container footer-copy">
        <small>
          © {new Date().getFullYear()} {GYM_NAME}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
