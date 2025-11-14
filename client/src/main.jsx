// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ai from "./images/ai.png";

import { PrivyProvider } from "@privy-io/react-auth";

// prefer env var; fallback to empty string (will disable login if not set)
const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID || "";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        // pick the login methods you enabled in your Privy dashboard
        loginMethods: ["email", "wallets", "google", "github"],
        appearance: {
          theme: "dark",
          accentColor: "#3740f1",
          logo: ai,
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
