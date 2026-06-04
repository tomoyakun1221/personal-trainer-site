import { useEffect } from "react";

/** 固定連絡先バーとヘッダーの実高さを CSS 変数に反映（全画面サイズ） */
export function useLayoutTopHeights() {
  useEffect(() => {
    let disposed = false;
    let ro: ResizeObserver | null = null;

    const sync = () => {
      const shell = document.querySelector(".tsp-fixed-contact-shell");
      const header = document.querySelector(".header");
      if (!shell || !header) return false;
      const socialH = Math.ceil(shell.getBoundingClientRect().height);
      const headerH = Math.ceil(header.getBoundingClientRect().height);

      document.documentElement.style.setProperty("--social-bar-h", `${socialH}px`);
      document.documentElement.style.setProperty("--header-h", `${headerH}px`);
      document.documentElement.style.setProperty("--layout-top-h", `${socialH + headerH}px`);
      return true;
    };

    const scheduleSync = () => {
      requestAnimationFrame(() => {
        if (!disposed) sync();
      });
    };

    const attach = () => {
      const shell = document.querySelector(".tsp-fixed-contact-shell");
      const header = document.querySelector(".header");
      if (!shell || !header) return false;

      sync();
      ro = new ResizeObserver(scheduleSync);
      ro.observe(shell);
      ro.observe(header);
      return true;
    };

    if (!attach()) {
      let attempts = 0;
      const retry = () => {
        if (disposed || attach() || attempts++ > 20) return;
        requestAnimationFrame(retry);
      };
      requestAnimationFrame(retry);
    }

    window.addEventListener("resize", scheduleSync);
    window.addEventListener("load", scheduleSync);
    window.visualViewport?.addEventListener("resize", scheduleSync);
    document.fonts?.ready.then(scheduleSync).catch(() => undefined);

    return () => {
      disposed = true;
      ro?.disconnect();
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("load", scheduleSync);
      window.visualViewport?.removeEventListener("resize", scheduleSync);
    };
  }, []);
}
