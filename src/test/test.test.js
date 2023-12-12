import React from "react";
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from "../component/App";
import '@testing-library/jest-dom';


test("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  act(() => {
    root.render(<App />);
  });
});





