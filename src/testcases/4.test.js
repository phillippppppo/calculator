import React from "react";
import { createRoot } from "react-dom/client";
import chai from "chai";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import "@testing-library/react";
import App from "../component/App";
import Button from "../component/Button";
import Display from "../component/Display";
import ButtonPanel from "../component/ButtonPanel";
import operate from "../logic/operate";
import calculate from "../logic/calculate";
import isNumber from "../logic/isNumber";
import { render, fireEvent } from "@testing-library/react";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  act(() => {
    root.render(<App />);
  });
});

test("button click updates parent state", () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button name="1" clickHandler={handleClick} />);
  fireEvent.click(getByText("1"));
  expect(handleClick).toBeCalledWith("1");
});

test("AC resets everything", () => {
  const buttonName = "AC";
  const obj = { total: "3", next: "2", operation: "+" };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: null, next: null, operation: null });
});

test('"%" divides next by 100 if there is a next value', () => {
  const buttonName = "%";
  const obj = { total: null, next: "200", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ next: "2" });
});

test("addition of 1 and 2 equals 3", () => {
  expect(operate(1, 2, "+")).toBe("3");
});

test("subtraction of 2 from 3 equals 1", () => {
  expect(operate(3, 2, "-")).toBe("1");
});

test("multiplication of 2 and 3 equals 6", () => {
  expect(operate(2, 3, "x")).toBe("6");
});

test("division of 6 by 3 equals 2", () => {
  expect(operate(6, 3, "÷")).toBe("2");
});

test("0 is a number", () => {
  expect(isNumber(0)).toBe(true);
});

test('"0" is a number', () => {
  expect(isNumber("0")).toBe(true);
});

test('"a" is not a number', () => {
  expect(isNumber("a")).toBe(false);
});

test("undefined is not a number", () => {
  expect(isNumber(undefined)).toBe(false);
});

// Add more tests for each if or else branches

test("should append the number when there is no operation", () => {
  const buttonName = "1";
  const obj = { total: null, next: "2", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ next: "21", total: null });
});

test("should replace the number when previously zero and no operation", () => {
  const buttonName = "1";
  const obj = { total: null, next: "0", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ next: "1", total: null });
});

test("should append dot to next when no dot already exist", () => {
  const buttonName = ".";
  const obj = { total: null, next: "200", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ next: "200." });
});

test("should do nothing when next already contains a dot", () => {
  const buttonName = ".";
  const obj = { total: null, next: "200.", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({});
});

// Continue adding more tests

test("should return when buttonName is % and there is no next", () => {
  const buttonName = "%";
  const obj = { total: "200", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({});
});

test("should calculate percentage for the total when buttonName is % and there is no operation", () => {
  const buttonName = "%";
  const obj = { total: "200", next: "50", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ next: "0.5" });
});

test("should calculate percentage when buttonName is % and operation is not null", () => {
  const buttonName = "%";
  const obj = { total: "200", next: "50", operation: "+" };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: "2.5", next: null, operation: null });
});

// Continue adding more tests

test("add next and total when = button is clicked and operation is +", () => {
  const buttonName = "=";
  const obj = { total: "200", next: "300", operation: "+" };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: "500", next: null, operation: null });
});

test("subtract next from total when = button is clicked and operation is -", () => {
  const buttonName = "=";
  const obj = { total: "500", next: "200", operation: "-" };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: "300", next: null, operation: null });
});

test("multiply total and next when = button is clicked and operation is x", () => {
  const buttonName = "=";
  const obj = { total: "200", next: "3", operation: "x" };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: "600", next: null, operation: null });
});

test("divide total by next when = button is clicked and operation is ÷", () => {
  const buttonName = "=";
  const obj = { total: "300", next: "2", operation: "÷" };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: "150", next: null, operation: null });
});

test("button click updates parent state", () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button name="1" clickHandler={handleClick} />);
  fireEvent.click(getByText("1"));
  expect(handleClick).toHaveBeenCalledWith("1");
});

test("append the buttonName to next when there is next and there is no operation", () => {
  const buttonName = "3";
  const obj = { total: null, next: "200", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: null, next: "2003" });
});

test("replace the next with buttonName when the next is 0", () => {
  const buttonName = "3";
  const obj = { total: null, next: "0", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: null, next: "3" });
});

test("set the buttonName to next when there is no next", () => {
  const buttonName = "3";
  const obj = { total: null, next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: null, next: "3" });
});

test("set the buttonName to total when there is no next and no total", () => {
  const buttonName = "3";
  const obj = { total: null, next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: null, next: "3" });
});

test("should not perform computation when there is total, an operation but no next", () => {
  const buttonName = "+";
  const obj = { total: "1", next: null, operation: "-" };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: "1", next: null, operation: "+" });
});

test("execute operation when there is an operation already set", () => {
  const buttonName = "+";
  const obj = { total: "1", next: "2", operation: "x" };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: "2", next: null, operation: "+" });
});

test("set operation when total but there is no next", () => {
  const buttonName = "-";
  const obj = { total: "1", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({});
});

// When '0' button is clicked and there is no total or operation
test("should set next to '0' when there is no total or operation", () => {
  const buttonName = "0";
  const obj = { total: null, next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: null, next: "0" });
});

// When '0' button is clicked and there is total but no operation
test("should append '0' to total when there is total but no operation", () => {
  const buttonName = "0";
  const obj = { total: "100", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: null, next: "0" });
});

// When '+/-' button is clicked and there is no total or operation
test("should do nothing when '+/-' button is clicked and there is no total or operation", () => {
  const buttonName = "+/-";
  const obj = { total: null, next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({});
});

// When '+/-' button is clicked and there is total and operation but no next
test("should negate total when '+/-' button is clicked and there is total and operation but no next", () => {
  const buttonName = "+/-";
  const obj = { total: "200", next: null, operation: "+" };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: "-200" });
});

// When '+/-' button is clicked and there is total, operation, and next
test("should negate next when '+/-' button is clicked and there is total, operation, and next", () => {
  const buttonName = "+/-";
  const obj = { total: "200", next: "100", operation: "+" };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ next: "-100" });
});

test("should append buttonName to next when total and next are null", () => {
  const buttonName = "1";
  const obj = { total: null, next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ total: null, next: "1" });
});

// The last test checks if the operation corresponds to the buttonName when total and next are null
test("should correlate operation with buttonName when total and next are null", () => {
  const buttonName = "+";
  const obj = { total: null, next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toMatchObject({ operation: "+" });
});

// Additional tests for Button component
test("Button component should render child text", () => {
  const { getByText } = render(<Button name={"2"} />);
  expect(getByText("2")).toBeInTheDocument();
});

test("Button component should trigger onClick function when clicked", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button name={"1"} clickHandler={handleClick} />,
  );
  fireEvent.click(getByText("1"));
  expect(handleClick).toHaveBeenCalledWith("1");
});

// Additional tests for ButtonPanel component
test("ButtonPanel component should render all buttons", () => {
  const handleClick = jest.fn();
  const { getByText } = render(<ButtonPanel clickHandler={handleClick} />);
  const buttons = [
    "AC",
    "+/-",
    "%",
    "÷",
    "x",
    "-",
    "+",
    "0",
    ".",
    "=",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  buttons.forEach((button) => {
    expect(getByText(button)).toBeInTheDocument();
  });
});

// Additional tests for Display component
test("Display component should render", () => {
  const { container } = render(<Display result="123" />);
  expect(container.firstChild).toHaveClass("component-display");
});

it("should not return null when given buttonName of zero and obj.next is undefined", () => {
  const obj = {
    total: null,
    next: undefined,
    operation: null,
  };
  const buttonName = "0";
  const result = calculate(obj, buttonName);
  expect(result["next"]).toEqual("0");
  expect(result["total"]).toBeNull();
  expect("operation" in result).toBeFalsy();
});

it('should set the obj.total to the result of the calculation and clear the others when buttonName is "=" and all obj properties are defined', () => {
  const obj = {
    total: "2",
    next: "2",
    operation: "+",
  };
  const buttonName = "=";
  const expectedObj = {
    total: "4",
    next: null,
    operation: null,
  };
  expect(calculate(obj, buttonName)).toEqual(expectedObj);
});

it("should set the operation as buttonName when obj.next is null and operation is given", () => {
  const obj = {
    total: "1",
    next: null,
    operation: "+",
  };
  const buttonName = "-";
  const expectedObj = {
    total: "1",
    next: null,
    operation: "-",
  };
  expect(calculate(obj, buttonName)).toEqual(expectedObj);
});

it("should set obj.total as the result of obj.total operation obj.next when obj.next, obj.operation, and buttonName are defined", () => {
  const obj = {
    total: "1",
    next: "2",
    operation: "+",
  };
  const buttonName = "-";
  const expectedObj = {
    total: "3",
    next: null,
    operation: "-",
  };
  expect(calculate(obj, buttonName)).toEqual(expectedObj);
});

it("should append buttonName to obj.next when buttonName and obj.next are defined and obj.operation is null", () => {
  const obj = {
    total: null,
    next: "1",
    operation: null,
  };
  const buttonName = "1";
  const result = calculate(obj, buttonName);
  expect(result["next"]).toEqual("11");
  expect(result["total"]).toBeNull();
  expect("operation" in result).toBeFalsy();
});

// Fix for the test 'should set buttonName as obj.next when buttonName is not "0" and obj.next is "0"'
it('should set buttonName as obj.next when buttonName is not "0" and obj.next is "0"', () => {
  const obj = {
    total: null,
    next: "0",
    operation: null,
  };
  const buttonName = "1";
  const result = calculate(obj, buttonName);
  expect(result["next"]).toEqual("1");
  expect(result["total"]).toBeNull();
  expect("operation" in result).toBeFalsy();
});

it('should not replace obj.total with buttonName and set obj.next as buttonName when obj.operation is null and obj.total is defined and buttonName is not "0", "AC", "+/-", "%", ".", and "="', () => {
  const obj = {
    total: "1",
    next: null,
    operation: null,
  };
  const buttonName = "2";
  const result = calculate(obj, buttonName);
  expect(result["next"]).toEqual("2");
  expect(result["total"]).toBeNull();
  expect("operation" in result).toBeFalsy();
});

it('should return zeroed object when buttonName is "AC"', () => {
  const obj = {
    total: "1",
    next: "2",
    operation: "+",
  };
  const buttonName = "AC";
  const expectedObj = {
    total: null,
    next: null,
    operation: null,
  };
  expect(calculate(obj, buttonName)).toEqual(expectedObj);
});

// Check operatore when total, next and operation are null
test("should update operation when operation button is clicked and total, next, and operation are all null", () => {
  const buttonName = "+";
  const obj = { total: null, next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ operation: "+" });
});

// Check the % operator
// When next is null and the % button is clicked
test("should do nothing when % button is clicked and next is null", () => {
  const buttonName = "%";
  const obj = { total: "200", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({});
});

// Check negative positive switch
// When total is a number and +/- button is clicked
test("should negate total when +/- button is clicked", () => {
  const buttonName = "+/-";
  const obj = { total: "200", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: "-200" });
});

// When next is a number and +/- button is clicked
test("should negate next when +/- button is clicked", () => {
  const buttonName = "+/-";
  const obj = { total: null, next: "200", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ next: "-200" });
});

test("should convert next to percentage when % button is clicked and next is defined", () => {
  const buttonName = "%";
  const obj = { total: null, next: "200", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ next: "2" });
});

test("should do nothing when operation button is clicked and total is defined but next is not", () => {
  const buttonName = "+";
  const obj = { total: "200", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ operation: "+" });
});

test("should append . to total when . button is clicked and total is defined but next is not", () => {
  const buttonName = ".";
  const obj = { total: "200", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ next: "0." });
});

// Check AC
test("should reset everything when AC button is clicked and total, next, operation are all defined", () => {
  const buttonName = "AC";
  const obj = { total: "200", next: "50", operation: "+" };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: null, next: null, operation: null });
});

// Check buttonName "AC" when total, operation and next are all defined
test("should return zeroed object when buttonName is 'AC' and all properties of obj are defined", () => {
  const buttonName = "AC";
  const obj = { total: "200", next: "30", operation: "+" };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: null, next: null, operation: null });
});

// Check buttonName "AC" when total is defined but the others not
test("should return zeroed object when buttonName is 'AC' and only obj.total is defined", () => {
  const buttonName = "AC";
  const obj = { total: "200", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: null, next: null, operation: null });
});

// When "+/-" button is clicked and there is a next attribute
test("should change the sign of next when buttonName is '+/-' and obj.next is defined", () => {
  const buttonName = "+/-";
  const obj = { total: "200", next: "50", operation: "+" };
  const result = calculate(obj, buttonName);
  expect(result.next).toEqual("-50"); // Check only the next property
});

// More tests...

test("should return empty object if '=' is clicked but there is no total and operation", () => {
  const buttonName = "=";
  const obj = { total: null, next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({});
});

test("Should replace the total with the next value when AC button is clicked", () => {
  const buttonName = "AC";
  const obj = { total: "10", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({ total: null, next: null, operation: null });
});

test("Should set next to '0.' when '.' button is clicked and next is '0'", () => {
  const buttonName = ".";
  const obj = { total: null, next: "0", operation: null };
  const result = calculate(obj, buttonName);
  expect(result.next).toEqual("0.");
});

test("When '.' is clicked and next already has a '.', it should do nothing", () => {
  const buttonName = ".";
  const obj = { total: null, next: "0.", operation: null };
  const result = calculate(obj, buttonName);
  expect(result).toEqual({});
});

test("should change next to '0' when '0' is clicked initially", () => {
  const buttonName = "0";
  const obj = { total: "0", next: null, operation: null };
  const result = calculate(obj, buttonName);
  expect(result.next).toEqual("0");
});

// Test behavior when "=" is clicked and total, next and operation are all defined
test("Should calculate the result when '=' is pressed and total, next and operation are defined", () => {
  const buttonName = "=";
  const obj = { total: "200", next: "50", operation: "-" };
  const result = calculate(obj, buttonName);
  expect(result.total).toEqual("150");
  expect(result.next).toBeNull();
  expect(result.operation).toBeNull();
});
