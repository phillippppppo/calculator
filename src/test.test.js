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




test("Display component renders correct value", () => {
  const display = testingLibrary.render(<Display value="5" />);
  const valueElement = display.getByText("5");
  expect(valueElement).toBeTruthy(); // Change expect to toBeTruthy()
});
test("calculate function clears data when 'AC' button is pressed", () => {
  const result = calculate({ total: "5", next: "2", operation: "+" }, "AC");
  expect(result).toEqual({ total: null, next: null, operation: null });
});

test("isNumber function correctly identifies non-number", () => {
  const result = isNumber("abc");
  expect(result).toBe(false);
});

test("operate function returns correct result for subtraction", () => {
  const result = operate("5", "2", "-");
  expect(result).toBe("3");
});

test("Button component with orange prop has 'orange' class", () => {
  const button = testingLibrary.render(<Button name="+" orange />);
  expect(button.container.firstChild.classList).toContain("orange");
});

test("ButtonPanel component calls clickHandler correctly for digit buttons", () => {
  const clickHandler = jest.fn();
  const buttonPanel = testingLibrary.render(<ButtonPanel clickHandler={clickHandler} />);
  const button = buttonPanel.getByText("7");
  testingLibrary.fireEvent.click(button);
  expect(clickHandler).toHaveBeenCalledWith("7");
});

test("calculate function correctly handles decimal numbers", () => {
  const result = calculate({ total: "2.5", next: "0.5", operation: "+" }, "=");
  expect(result.total).toBe("3");
});

test("isNumber function correctly identifies negative numbers", () => {
  const result = isNumber("-10");
  expect(result).toBe(true);
});

test("operate function returns correct result for multiplication", () => {
  const result = operate("2", "3", "x");
  expect(result).toBe("6");
});

test("Button component with wide prop has 'wide' class", () => {
  const button = testingLibrary.render(<Button name="0" wide />);
  expect(button.container.firstChild.classList).toContain("wide");
});

test("ButtonPanel component calls clickHandler correctly for AC button", () => {
  const clickHandler = jest.fn();
  const buttonPanel = testingLibrary.render(<ButtonPanel clickHandler={clickHandler} />);
  const button = buttonPanel.getByText("AC");
  testingLibrary.fireEvent.click(button);
  expect(clickHandler).toHaveBeenCalledWith("AC");
});

// Add more test cases if needed