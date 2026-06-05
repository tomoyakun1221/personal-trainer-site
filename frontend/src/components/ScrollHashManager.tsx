import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** ルート遷移時にページ先頭、または #hash 位置へスクロール */
export function ScrollHashManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash;
      const scrollToTarget = () => {
        const target = document.querySelector(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      if (scrollToTarget()) return;

      const timer = window.setTimeout(() => {
        scrollToTarget();
      }, 200);

      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return null;
}
