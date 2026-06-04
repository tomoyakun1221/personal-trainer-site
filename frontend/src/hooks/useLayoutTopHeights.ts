import { useEffect } from "react";

const MAX_SOCIAL_BAR_H = 120;

/** 固定連絡先バーの高さのみ CSS 変数に反映 */
export function useLayoutTopHeights() {
  useEffect(() => {
    let disposed = false;
    let ro: ResizeObserver | null = null;

    const sync = () => {
      const shell = document.querySelector(".tsp-fixed-contact-shell");
      if (!shell) return false;

      const measured = Math.ceil(shell.getBoundingClientRect().height);
      const socialH = Math.min(Math.max(measured, 48), MAX_SOCIAL_BAR_H);

      document.documentElement.style.setProperty("--social-bar-h", `${socialH}px`);
      return true;
    };

    const scheduleSync = () => {
      requestAnimationFrame(() => {
        if (!disposed) sync();
      });
    };

    const attach = () => {
      const shell = document.querySelector(".tsp-fixed-contact-shell");
      if (!shell) return false;

      sync();
      ro = new ResizeObserver(scheduleSync);
      ro.observe(shell);
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
    document.fonts?.ready.then(scheduleSync).catch(() => undefined);

    return () => {
      disposed = true;
      ro?.disconnect();
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("load", scheduleSync);
    };
  }, []);
}
