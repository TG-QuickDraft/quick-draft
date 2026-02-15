import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import Providers from "./components/providers/Providers.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <MainLayout>
          <App />
        </MainLayout>
      </Providers>
    </BrowserRouter>
  </StrictMode>,
);
