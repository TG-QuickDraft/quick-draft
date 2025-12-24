import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Container from "./components/common/Container.tsx";

import Providers from "./components/providers/Providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Container>
        <App />
      </Container>
    </Providers>
  </StrictMode>
);
