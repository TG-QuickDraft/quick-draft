import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Container from "./components/common/Container.tsx";
import { BrowserRouter } from "react-router-dom";

import Providers from "./components/providers/Providers.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <Container>
          <MainLayout>
            <App />
          </MainLayout>
        </Container>
      </Providers>
    </BrowserRouter>
  </StrictMode>
);
