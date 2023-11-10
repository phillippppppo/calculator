import React from "react";
import { createRoot } from "react-dom/client"; // Import from "react-dom/client" instead of "react-dom"
import App from "./component/App";
import "./index.css";
import "github-fork-ribbon-css/gh-fork-ribbon.css";

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
