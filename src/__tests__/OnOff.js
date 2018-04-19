import React from "react";
import { render } from "react-dom";
import TestUtils from "react-dom/test-utils";

import OnOff from "..";

let container;
beforeEach(() => {
  container = document.createElement("div");
});

test("renders without crashing", () => {
  expect(() =>
    render(<OnOff>{() => <span>Hello, world!</span>}</OnOff>, container)
  ).not.toThrow();
});

test("state defaults to off", () => {
  const root = render(
    <OnOff>
      {({ on, off }) => (
        <>
          <span>{String(on)}</span>
          <span>{String(off)}</span>
        </>
      )}
    </OnOff>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const [spanOn, spanOff] = spans;

  expect(spanOn.textContent).toEqual("false");
  expect(spanOff.textContent).toEqual("true");
});

test("allows to set initial state", () => {
  const root = render(
    <OnOff defaultOn={true}>{({ on }) => <span>{String(on)}</span>}</OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");

  expect(span.textContent).toEqual("true");
});

test("allows state to be controlled", () => {
  let root = render(
    <OnOff on={true}>{({ on }) => <span>{String(on)}</span>}</OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");

  expect(span.textContent).toEqual("true");
  render(
    <OnOff on={false}>{({ on }) => <span>{String(on)}</span>}</OnOff>,
    container
  );
  expect(span.textContent).toEqual("false");
});

test("setOn updates the state to on", () => {
  const root = render(
    <OnOff>
      {({ on, setOn }) => (
        <>
          <span>{String(on)}</span>
          <button onClick={setOn}>Update</button>
        </>
      )}
    </OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");
  const button = TestUtils.findRenderedDOMComponentWithTag(root, "button");

  TestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("true");
});

test("setOff updates the state to off", () => {
  const root = render(
    <OnOff defaultOn={true}>
      {({ on, setOff }) => (
        <>
          <span>{String(on)}</span>
          <button onClick={setOff}>Update</button>
        </>
      )}
    </OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");
  const button = TestUtils.findRenderedDOMComponentWithTag(root, "button");

  TestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("false");
});

test("toggle toggles the state", () => {
  const root = render(
    <OnOff>
      {({ on, toggle }) => (
        <>
          <span>{String(on)}</span>
          <button onClick={toggle}>Toggle</button>
        </>
      )}
    </OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");
  const button = TestUtils.findRenderedDOMComponentWithTag(root, "button");

  TestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("true");
  TestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("false");
});

test("onChange is triggered only when state changes", () => {
  const onChange = jest.fn();
  const root = render(
    <OnOff onChange={onChange}>
      {({ setOn, setOff, toggle }) => (
        <>
          <button onClick={setOn}>setOn</button>
          <button onClick={setOff}>setOff</button>
          <button onClick={toggle}>toggle</button>
        </>
      )}
    </OnOff>,
    container
  );
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(root, "button");
  const [setOnButton, setOffButton, toggleButton] = buttons;

  TestUtils.Simulate.click(toggleButton);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(true);
  TestUtils.Simulate.click(setOffButton);
  TestUtils.Simulate.click(setOffButton);
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith(false);
  TestUtils.Simulate.click(setOnButton);
  TestUtils.Simulate.click(setOnButton);
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(onChange).toHaveBeenLastCalledWith(true);
});
