import React from "react";
import { render } from "react-dom";
import TestUtils from "react-dom/test-utils";

import { OnOff } from "..";

let container;
beforeEach(() => {
  container = document.createElement("div");
});

test("renders without crashing", () => {
  expect(() =>
    render(<OnOff>{() => <span>Hello, world!</span>}</OnOff>, container)
  ).not.toThrow();
});

test("initial state is off", () => {
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

test("initial state can be set", () => {
  const root = render(
    <OnOff defaultOn>{({ on }) => <span>{String(on)}</span>}</OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");

  expect(span.textContent).toEqual("true");
});

test("state can be controlled", () => {
  const root = render(
    <OnOff on={true} defaultOn={false}>
      {({ on }) => <span>{String(on)}</span>}
    </OnOff>,
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

test("`setOn` updates the state to on", () => {
  const root = render(
    <OnOff>
      {({ on, setOn }) => (
        <>
          <span>{String(on)}</span>
          <button onClick={setOn}>setOn</button>
        </>
      )}
    </OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");
  const setOnButton = TestUtils.findRenderedDOMComponentWithTag(root, "button");

  expect(span.textContent).toEqual("false");
  TestUtils.Simulate.click(setOnButton);
  expect(span.textContent).toEqual("true");
});

test("`setOff` updates the state to off", () => {
  const root = render(
    <OnOff defaultOn>
      {({ on, setOff }) => (
        <>
          <span>{String(on)}</span>
          <button onClick={setOff}>setOff</button>
        </>
      )}
    </OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");
  const button = TestUtils.findRenderedDOMComponentWithTag(root, "button");

  expect(span.textContent).toEqual("true");
  TestUtils.Simulate.click(button);
  expect(span.textContent).toEqual("false");
});

test("`toggle` toggles the state", () => {
  const root = render(
    <OnOff>
      {({ on, toggle }) => (
        <>
          <span>{String(on)}</span>
          <button onClick={toggle}>toggle</button>
        </>
      )}
    </OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");
  const toggleButton = TestUtils.findRenderedDOMComponentWithTag(
    root,
    "button"
  );

  expect(span.textContent).toEqual("false");
  TestUtils.Simulate.click(toggleButton);
  expect(span.textContent).toEqual("true");
  TestUtils.Simulate.click(toggleButton);
  expect(span.textContent).toEqual("false");
});

test("state doesn't change when component is controlled", () => {
  const root = render(
    <OnOff on={false}>
      {({ on, setOn }) => (
        <>
          <span>{String(on)}</span>
          <button onClick={setOn}>setOn</button>
        </>
      )}
    </OnOff>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");
  const setOnButton = TestUtils.findRenderedDOMComponentWithTag(root, "button");

  expect(span.textContent).toEqual("false");
  TestUtils.Simulate.click(setOnButton);
  expect(span.textContent).toEqual("false");
});

test("`onChange` is called only when state changes", () => {
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

  expect(onChange).toHaveBeenCalledTimes(0);
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

test("doesn't re-render when the state doesn't change", () => {
  const onRender = jest.fn();
  const root = render(
    <OnOff>
      {({ setOn, setOff }) => {
        onRender();

        return (
          <>
            <button onClick={setOn}>setOn</button>
            <button onClick={setOff}>setOff</button>
          </>
        );
      }}
    </OnOff>,
    container
  );
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(root, "button");
  const [setOnButton, setOffButton] = buttons;

  expect(onRender).toHaveBeenCalledTimes(1);
  TestUtils.Simulate.click(setOffButton);
  TestUtils.Simulate.click(setOffButton);
  expect(onRender).toHaveBeenCalledTimes(1);
  TestUtils.Simulate.click(setOnButton);
  TestUtils.Simulate.click(setOnButton);
  expect(onRender).toHaveBeenCalledTimes(2);
});

test("doesn't re-render when the `on` prop doesn't change", () => {
  const onRender = jest.fn();
  render(
    <OnOff on={false} defaultOn={false} onChange={() => {}}>
      {({ on }) => {
        onRender();

        return <span>{String(on)}</span>;
      }}
    </OnOff>,
    container
  );
  render(
    <OnOff on={false} defaultOn={true} onChange={() => {}}>
      {({ on }) => {
        onRender();

        return <span>{String(on)}</span>;
      }}
    </OnOff>,
    container
  );
  render(
    <OnOff on={true}>
      {({ on }) => {
        onRender();

        return <span>{String(on)}</span>;
      }}
    </OnOff>,
    container
  );

  expect(onRender).toHaveBeenCalledTimes(2);
});
