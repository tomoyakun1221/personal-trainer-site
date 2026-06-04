import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SocialContactBar } from "./SocialContactBar";
import { FixedContactBar } from "./FixedContactBar";
import { useSiteSetting } from "../hooks/useSiteSetting";
import "./Layout.css";

export function Layout() {
  const { setting } = useSiteSetting();

  return (
    <div className="layout">
      <FixedContactBar />
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <SocialContactBar variant="bottom" />
      <Footer setting={setting} />
    </div>
  );
}
