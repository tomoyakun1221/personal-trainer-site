import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollHashManager } from "./ScrollHashManager";
import { useSiteSetting } from "../hooks/useSiteSetting";
import "./Layout.css";

export function Layout() {
  const { setting } = useSiteSetting();

  return (
    <div className="layout">
      <ScrollHashManager />
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer setting={setting} />
    </div>
  );
}
