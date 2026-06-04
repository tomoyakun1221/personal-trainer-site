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
      const h = shell.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--social-bar-h", `${h}px`);
    };

    syncHeight();

    const ro = new ResizeObserver(syncHeight);
    ro.observe(shell);

    window.addEventListener("resize", syncHeight);
    window.visualViewport?.addEventListener("resize", syncHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncHeight);
      window.visualViewport?.removeEventListener("resize", syncHeight);
    };
  }, []);

  return (
    <div ref={shellRef} className="tsp-fixed-contact-shell">
      <SocialContactBar variant="top" compact />
    </div>
  );
}
