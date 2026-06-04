import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { FixedContactOverlay } from "./components/FixedContactOverlay";
import "./styles/global.css";
import "./styles/mobile.css";

const contactMount = document.getElementById("tsp-fixed-contact");
if (contactMount) {
  createRoot(contactMount).render(
    <StrictMode>
      <FixedContactOverlay />
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
