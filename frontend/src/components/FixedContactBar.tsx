import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SocialContactBar } from "./SocialContactBar";
import "./FixedContactBar.css";

/**
 * 連絡先バーを document.body 直下に固定表示（スクロールしても常に表示）
 */
export function FixedContactBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="layout-contact-spacer" aria-hidden />
      {mounted &&
        createPortal(<SocialContactBar variant="top" compact fixed />, document.body)}
    </>
  );
}
