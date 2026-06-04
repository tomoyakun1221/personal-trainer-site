import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SocialContactBar } from "./SocialContactBar";
import { LayoutTopSpacer } from "./LayoutTopSpacer";
import "./LayoutTopSpacer.css";
import { useSiteSetting } from "../hooks/useSiteSetting";
import "./Layout.css";

export function Layout() {
  const { setting } = useSiteSetting();

  return (
    <div className="layout">
      <LayoutTopSpacer />
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <SocialContactBar variant="bottom" />
      <Footer setting={setting} />
    </div>
  );
}
