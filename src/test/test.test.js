import React from "react";
import { createRoot } from 'react-dom/client';
import chai from "chai";
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import '@testing-library/react'
import App from "../component/App";
import Button from "../component/Button";
import Display from "../component/Display";
import ButtonPanel from "../component/ButtonPanel";
import operate from "../logic/operate";
import calculate from "../logic/calculate";
import isNumber from "../logic/isNumber";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  act(() => {
    root.render(<App />);
  });
});

