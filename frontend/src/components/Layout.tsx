import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LayoutContactSpacer } from "./LayoutContactSpacer";
import "./LayoutContactSpacer.css";
import { useSiteSetting } from "../hooks/useSiteSetting";
import "./Layout.css";

export function Layout() {
  const { setting } = useSiteSetting();

  return (
    <div className="layout">
      <LayoutContactSpacer />
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer setting={setting} />
    </div>
  );
}
