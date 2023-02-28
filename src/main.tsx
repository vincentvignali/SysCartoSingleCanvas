import "./index.css";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
// Render top-level React component
render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
