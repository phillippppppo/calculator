import React from "react";
import { createRoot } from "react-dom";
import App from "./component/App";
import "./index.css";
import "github-fork-ribbon-css/gh-fork-ribbon.css";

const { render } = createRoot(document.getElementById("root"));

render(<App />);
