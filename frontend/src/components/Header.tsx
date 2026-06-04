import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GYM_LABEL, GYM_NAME } from "../constants/brand";
import "./Header.css";

const navItems = [
  { to: "/", label: "トップ" },
  { to: "/profile", label: "プロフィール" },
  { to: "/pricing", label: "料金" },
  { to: "/results", label: "実績" },
  { to: "/about", label: "会社概要" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="header-logo" onClick={() => setOpen(false)}>
          <span className="header-logo-mark" aria-hidden />
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
