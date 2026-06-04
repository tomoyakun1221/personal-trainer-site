import { useEffect, useRef } from "react";
import { SocialContactBar } from "./SocialContactBar";
import "./FixedContactOverlay.css";

/** 画面上部に常時固定する連絡先バー（ズーム・画面サイズに依存しない） */
export function FixedContactOverlay() {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const syncHeight = () => {
      const h = Math.ceil(shell.getBoundingClientRect().height);
      const headerH =
        getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim() || "56px";

      document.documentElement.style.setProperty("--social-bar-h", `${h}px`);
      document.documentElement.style.setProperty("--layout-top-h", `calc(${h}px + ${headerH})`);
    };

    const scheduleSync = () => {
      requestAnimationFrame(syncHeight);
    };

    scheduleSync();

    const ro = new ResizeObserver(scheduleSync);
    ro.observe(shell);

    window.addEventListener("resize", scheduleSync);
    window.addEventListener("load", scheduleSync);
    window.visualViewport?.addEventListener("resize", scheduleSync);
    window.visualViewport?.addEventListener("scroll", scheduleSync);
    document.fonts?.ready.then(scheduleSync).catch(() => undefined);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("load", scheduleSync);
      window.visualViewport?.removeEventListener("resize", scheduleSync);
      window.visualViewport?.removeEventListener("scroll", scheduleSync);
    };
  }, []);

  return (
    <div ref={shellRef} className="tsp-fixed-contact-shell">
      <SocialContactBar variant="top" compact />
    </div>
  );
}
