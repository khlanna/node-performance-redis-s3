import "materialize-css/dist/css/materialize.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
