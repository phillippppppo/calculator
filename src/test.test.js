/**
 * @jest-environment jsdom
 */

import React from "react";
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from "./component/App";
import Button from "./component/Button";
import ButtonPanel from "./component/ButtonPanel";
import Display from "./component/Display";
import calculate from "./logic/calculate";
import isNumber from "./logic/isNumber";
import operate from "./logic/operate";
import chai from "chai";
import * as testingLibrary from '@testing-library/react';

test("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  
  act(() => {
    root.render(<App />);
  });
})


it("performs addition correctly", () => {
  const obj = {
    total: "10",
    next: "5",
    operation: "+",
  };
  const buttonName = "=";

  const result = calculate(obj, buttonName);

  expect(result).toEqual({
    total: "15",
    next: null,
    operation: null,
  });
});