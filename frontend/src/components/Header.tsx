import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GYM_LABEL, GYM_NAME } from "../constants/brand";
import { assetPath } from "../lib/assetPath";
import "./Header.css";

const navItems = [
  { to: "/", label: "トップ" },
  { to: "/profile", label: "トレーナー紹介" },
  { to: "/pricing", label: "料金" },
  { to: "/equipment", label: "設備" },
  { to: "/results", label: "実績" },
  { to: "/contact", label: "予約・お問い合わせ" },
  { to: "/about", label: "会社概要" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="header-logo" onClick={() => setOpen(false)}>
          <img
            src={assetPath("favicon-32x32.png")}
            alt=""
            className="header-logo-mark"
            width={36}
            height={36}
            decoding="async"
          />
          <span className="header-logo-text">
            <span className="header-logo-sub">{GYM_LABEL}</span>
            <span className="header-logo-main">{GYM_NAME}</span>
          </span>
        </NavLink>
        <button
          type="button"
          className="header-toggle"
          aria-label="メニュー"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`header-nav ${open ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
