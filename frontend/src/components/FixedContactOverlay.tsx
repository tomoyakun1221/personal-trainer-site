import { SocialContactBar } from "./SocialContactBar";
import "./FixedContactOverlay.css";

/** 画面上部に常時固定する連絡先バー（高さ同期は useLayoutTopHeights） */
export function FixedContactOverlay() {
  return (
    <div className="tsp-fixed-contact-shell">
      <SocialContactBar variant="top" compact />
    </div>
  );
}
