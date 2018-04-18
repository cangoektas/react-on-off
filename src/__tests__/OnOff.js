import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";

import { OnOff } from "..";

let container;
beforeEach(() => {
  container = document.createElement("div");
});

test("renders without crashing", () => {
  expect(() =>
    ReactDOM.render(
      <OnOff>{() => <span>Hello, world!</span>}</OnOff>,
      container
    )
  ).not.toThrow();
});

test("state defaults to off", () => {
  const root = ReactDOM.render(
    <OnOff>
      {({ on, off }) => (
        <>
          <span className="on">{String(on)}</span>
          <span className="off">{String(off)}</span>
        </>
      )}
    </OnOff>,
    container
  );
  const spanOn = ReactTestUtils.findRenderedDOMComponentWithClass(root, "on");
  const spanOff = ReactTestUtils.findRenderedDOMComponentWithClass(root, "off");

  expect(spanOn.textContent).toEqual("false");
  expect(spanOff.textContent).toEqual("true");
});

test("allows to set initial state", () => {
  const root = ReactDOM.render(
    <OnOff defaultOn={true}>{({ on }) => <span>{String(on)}</span>}</OnOff>,
    container
  );
  const span = ReactTestUtils.findRenderedDOMComponentWithTag(root, "span");

  expect(span.textContent).toEqual("true");
});

test("allows state to be controlled", () => {
  let root = ReactDOM.render(
    <OnOff on={true}>{({ on }) => <span>{String(on)}</span>}</OnOff>,
    container
  );
  const span = ReactTestUtils.findRenderedDOMComponentWithTag(root, "span");

  expect(span.textContent).toEqual("true");
  ReactDOM.render(
    <OnOff on={false}>{({ on }) => <span>{String(on)}</span>}</OnOff>,
    container
  );
  expect(span.textContent).toEqual("false");
});

test("setOn updates the state to on", () => {
  const root = ReactDOM.render(
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
  const span = ReactTestUtils.findRenderedDOMComponentWithTag(root, "span");
  const button = ReactTestUtils.findRenderedDOMComponentWithTag(root, "button");

  ReactTestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("true");
});

test("setOff updates the state to off", () => {
  const root = ReactDOM.render(
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
  const span = ReactTestUtils.findRenderedDOMComponentWithTag(root, "span");
  const button = ReactTestUtils.findRenderedDOMComponentWithTag(root, "button");

  ReactTestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("false");
});

test("toggle toggles the state", () => {
  const root = ReactDOM.render(
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
  const span = ReactTestUtils.findRenderedDOMComponentWithTag(root, "span");
  const button = ReactTestUtils.findRenderedDOMComponentWithTag(root, "button");

  ReactTestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("true");
  ReactTestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("false");
});

test("onChange is triggered only when state changes", () => {
  const onChange = jest.fn();
  const root = ReactDOM.render(
    <OnOff onChange={onChange}>
      {({ setOn, setOff, toggle }) => (
        <>
          <button className="setOn" onClick={setOn}>
            setOn
          </button>
          <button className="setOff" onClick={setOff}>
            setOff
          </button>
          <button className="toggle" onClick={toggle}>
            toggle
          </button>
        </>
      )}
    </OnOff>,
    container
  );
  const setOnButton = ReactTestUtils.findRenderedDOMComponentWithClass(
    root,
    "setOn"
  );
  const setOffButton = ReactTestUtils.findRenderedDOMComponentWithClass(
    root,
    "setOff"
  );
  const toggleButton = ReactTestUtils.findRenderedDOMComponentWithClass(
    root,
    "toggle"
  );

  ReactTestUtils.Simulate.click(toggleButton);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(true);
  ReactTestUtils.Simulate.click(setOffButton);
  ReactTestUtils.Simulate.click(setOffButton);
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith(false);
  ReactTestUtils.Simulate.click(setOnButton);
  ReactTestUtils.Simulate.click(setOnButton);
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(onChange).toHaveBeenLastCalledWith(true);
});
