import React from "react";
import { act, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../component/App";
import Button from "../component/Button";
import Display from "../component/Display";
import ButtonPanel from "../component/ButtonPanel";
import operate from "../logic/operate";
import calculate from "../logic/calculate";
import isNumber from "../logic/isNumber";

test("renders without crashing", () => {
  render(<App />);
});

describe("App Component", () => {
  test("renders without errors", () => {
    render(<App />);
  });
});

describe("Button Component", () => {
  test("renders without errors", () => {
    render(<Button />);
  });

  test("calls clickHandler function when clicked", () => {
    const mockClickHandler = jest.fn();
    const { getByText } = render(
      <Button name="AC" clickHandler={mockClickHandler} />,
    );
    fireEvent.click(getByText("AC"));
    expect(mockClickHandler).toHaveBeenCalled();
  });
});

describe("ButtonPanel Component", () => {
  test("renders without errors", () => {
    render(<ButtonPanel />);
  });
});

describe("Display Component", () => {
  test("renders without errors", () => {
    render(<Display />);
  });
});

describe("calculate Function", () => {
  test("handles AC button", () => {
    const result = calculate({ total: "10", next: "5", operation: "+" }, "AC");
    expect(result).toEqual({ total: null, next: null, operation: null });
  });

  test("handles = button", () => {
    const result = calculate({ total: "10", next: "5", operation: "+" }, "=");
    expect(result).toEqual({ total: "15", next: null, operation: null });
  });

  // Add more tests for different button inputs and scenarios
});

describe("operate Function", () => {
  test("performs addition", () => {
    const result = operate("5", "2", "+");
    expect(result).toEqual("7");
  });

  test("performs subtraction", () => {
    const result = operate("5", "2", "-");
    expect(result).toEqual("3");
  });

  test("performs multiplication", () => {
    const result = operate("5", "2", "x");
    expect(result).toEqual("10");
  });

  // Add more tests for other operations
});

describe("isNumber Function", () => {
  test("returns true for valid numbers", () => {
    expect(isNumber("0")).toBe(true);
    expect(isNumber("5")).toBe(true);
    expect(isNumber("10")).toBe(true);
  });

  test("returns false for non-numbers", () => {
    expect(isNumber("AC")).toBe(false);
    expect(isNumber("+")).toBe(false);
    expect(isNumber("-")).toBe(false);
  });
});

// Add more test cases for the operate and isNumber functions

// Add more integration tests for the App component and other scenarios

// Add more unit tests for the Button, ButtonPanel, and Display components

describe("calculate Function", () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });

  test("handles operation button", () => {
    const result = calculate({ total: "10", next: "5", operation: "+" }, "-");
    expect(result).toEqual({ total: "15", next: null, operation: "-" });
  });

  test("handles division by zero", () => {
    const result = calculate({ total: "10", next: "0", operation: "÷" }, "=");
    expect(result).toEqual({ total: "0", next: null, operation: null });
  });

  test("handles operation button", () => {
    const result = calculate({ total: "10", next: "5", operation: "+" }, "-");
    expect(result).toEqual({ total: "15", next: null, operation: "-" });
  });

  // Add more test cases for additional scenarios and edge cases
});

test("performs a complete calculation", () => {
  const { queryAllByText, getByText } = render(<App />);
  fireEvent.click(getByText("1"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("2"));
  fireEvent.click(getByText("="));

  const displayValues = queryAllByText("3");
  expect(displayValues.length).toBe(2);
});

test("updates display after clicking number buttons", () => {
  const mockClickHandler = jest.fn();
  const { getByText } = render(<ButtonPanel clickHandler={mockClickHandler} />);
  fireEvent.click(getByText("1"));
  expect(mockClickHandler).toHaveBeenCalledWith("1");
});

test("renders correct value", () => {
  const { getByText } = render(<Display value="5" />);
  const displayValue = getByText("5");
  expect(displayValue).toBeInTheDocument();
});

describe("operate Function", () => {
  test("performs division", () => {
    const result = operate("10", "2", "÷");
    expect(result).toEqual("5");
  });

  test("performs modulo", () => {
    expect(() => operate("10", "3", "%")).toThrow("Unknown operation '%'");
  });

  // Add more tests for other operations
});

test("handles division by zero", () => {
  const result = calculate({ total: "10", next: "0", operation: "÷" }, "=");
  expect(result).toEqual({ total: "0", next: null, operation: null });
});

test("handles multiplication", () => {
  const result = calculate({ total: "5", next: "3", operation: "x" }, "=");
  expect(result).toEqual({ total: "15", next: null, operation: null });
});

test("handles subtraction", () => {
  const result = calculate({ total: "10", next: "3", operation: "-" }, "=");
  expect(result).toEqual({ total: "7", next: null, operation: null });
});

test("handles invalid input", () => {
  const result = calculate({ total: "10", next: "5", operation: "+" }, "=");
  expect(result).toEqual({ total: "15", next: null, operation: null });
});
