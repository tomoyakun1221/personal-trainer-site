import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SocialContactBar } from "./SocialContactBar";
import { useSiteSetting } from "../hooks/useSiteSetting";
import "./Layout.css";

export function Layout() {
  const { setting } = useSiteSetting();

  return (
    <div className="layout">
      <SocialContactBar variant="top" compact fixed />
      <div className="layout-below-contact">
        <Header />
        <main className="layout-main">
          <Outlet />
        </main>
        <SocialContactBar variant="bottom" />
        <Footer setting={setting} />
      </div>
    </div>
  );
}
