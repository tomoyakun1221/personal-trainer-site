import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SocialContactBar } from "./SocialContactBar";
import { useSiteSetting } from "../hooks/useSiteSetting";
import "./Layout.css";
import "./LayoutTop.css";

export function Layout() {
  const { setting } = useSiteSetting();

  return (
    <div className="layout">
      <div className="layout-top">
        <SocialContactBar variant="top" compact />
        <Header />
      </div>
      <main className="layout-main">
        <Outlet />
      </main>
      <SocialContactBar variant="bottom" />
      <Footer setting={setting} />
    </div>
  );
}
