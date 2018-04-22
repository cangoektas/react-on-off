import React from "react";
import { render } from "react-dom";
import TestUtils from "react-dom/test-utils";

import { OnOff, OnOffCollection, OnOffItem } from "..";

let container;
beforeEach(() => {
  container = document.createElement("div");
});

test("renders without crashing", () => {
  expect(() =>
    render(
      <OnOffCollection>
        <span>Hello, world!</span>
      </OnOffCollection>,
      container
    )
  ).not.toThrow();
});

test("item states default to off", () => {
  const root = render(
    <OnOffCollection>
      <OnOffItem>{({ on }) => <span>{String(on)}</span>}</OnOffItem>
      <OnOffItem>{({ on }) => <span>{String(on)}</span>}</OnOffItem>
    </OnOffCollection>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const [span1, span2] = spans;

  expect(span1.textContent).toEqual("false");
  expect(span2.textContent).toEqual("false");
});

test("item id's default to unique id's", () => {
  const root = render(
    <OnOffCollection>
      <OnOffItem>{({ id }) => <span>{id}</span>}</OnOffItem>
      <OnOffItem>{({ id }) => <span>{id}</span>}</OnOffItem>
    </OnOffCollection>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const [span1, span2] = spans;

  expect(span1.textContent).not.toEqual(span2.textContent);
});

test("allows to set initial state", () => {
  const root = render(
    <OnOffCollection defaultOn="1">
      <OnOffItem id="1">{({ on }) => <span>{String(on)}</span>}</OnOffItem>
      <OnOffItem id="2">{({ on }) => <span>{String(on)}</span>}</OnOffItem>
    </OnOffCollection>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const [span1, span2] = spans;

  expect(span1.textContent).toEqual("true");
  expect(span2.textContent).toEqual("false");
});

test("allows state to be controlled", () => {
  const root = render(
    <OnOffCollection defaultOn="1" on="2">
      <OnOffItem id="1">{({ on }) => <span>{String(on)}</span>}</OnOffItem>
      <OnOffItem id="2">{({ on }) => <span>{String(on)}</span>}</OnOffItem>
    </OnOffCollection>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const [span1, span2] = spans;

  expect(span1.textContent).toEqual("false");
  expect(span2.textContent).toEqual("true");
  render(
    <OnOffCollection defaultOn="1" on="1">
      <OnOffItem id="1">{({ on }) => <span>{String(on)}</span>}</OnOffItem>
      <OnOffItem id="2">{({ on }) => <span>{String(on)}</span>}</OnOffItem>
    </OnOffCollection>,
    container
  );
  expect(span1.textContent).toEqual("true");
  expect(span2.textContent).toEqual("false");
  render(
    <OnOffCollection defaultOn="1" on={null}>
      <OnOffItem id="1">{({ on }) => <span>{String(on)}</span>}</OnOffItem>
      <OnOffItem id="2">{({ on }) => <span>{String(on)}</span>}</OnOffItem>
    </OnOffCollection>,
    container
  );
  expect(span1.textContent).toEqual("false");
  expect(span2.textContent).toEqual("false");
});

test("setOn sets item states to on", () => {
  const root = render(
    <OnOffCollection>
      <OnOffItem id="1">
        {({ on, setOn }) => (
          <>
            <span>{String(on)}</span>
            <button onClick={setOn}>Update</button>
          </>
        )}
      </OnOffItem>
      <OnOffItem>
        {({ on, setOn }) => (
          <>
            <span>{String(on)}</span>
            <button onClick={setOn}>setOn</button>
          </>
        )}
      </OnOffItem>
    </OnOffCollection>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(root, "button");
  const [span1, span2] = spans;
  const [button1, button2] = buttons;

  TestUtils.Simulate.click(button1);
  expect(span1.textContent).toEqual("true");
  expect(span2.textContent).toEqual("false");
  TestUtils.Simulate.click(button2);
  expect(span1.textContent).toEqual("false");
  expect(span2.textContent).toEqual("true");
});

test("setOff sets item states to off", () => {
  const root = render(
    <OnOffCollection defaultOn="1">
      <OnOffItem id="1">
        {({ on, setOff }) => (
          <>
            <span>{String(on)}</span>
            <button onClick={setOff}>setOff</button>
          </>
        )}
      </OnOffItem>
      <OnOffItem>
        {({ on, setOn, setOff }) => (
          <>
            <span>{String(on)}</span>
            <button onClick={setOn}>setOn</button>
            <button onClick={setOff}>setOff</button>
          </>
        )}
      </OnOffItem>
    </OnOffCollection>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(root, "button");
  const [span1, span2] = spans;
  const [setOffButton1, setOnButton, setOffButton2] = buttons;

  TestUtils.Simulate.click(setOffButton1);
  expect(span1.textContent).toEqual("false");
  TestUtils.Simulate.click(setOnButton);
  expect(span2.textContent).toEqual("true");
  TestUtils.Simulate.click(setOffButton2);
  expect(span2.textContent).toEqual("false");
});

test("toggle toggles the item states", () => {
  const root = render(
    <OnOffCollection defaultOn="1">
      <OnOffItem id="1">
        {({ on, toggle }) => (
          <>
            <span>{String(on)}</span>
            <button onClick={toggle}>toggle</button>
          </>
        )}
      </OnOffItem>
      <OnOffItem>
        {({ on, toggle }) => (
          <>
            <span>{String(on)}</span>
            <button onClick={toggle}>toggle</button>
          </>
        )}
      </OnOffItem>
    </OnOffCollection>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(root, "button");
  const [span1, span2] = spans;
  const [button1, button2] = buttons;

  TestUtils.Simulate.click(button2);
  expect(span1.textContent).toEqual("false");
  expect(span2.textContent).toEqual("true");
  TestUtils.Simulate.click(button2);
  expect(span1.textContent).toEqual("false");
  expect(span2.textContent).toEqual("false");
  TestUtils.Simulate.click(button1);
  expect(span1.textContent).toEqual("true");
  expect(span2.textContent).toEqual("false");
});

test("onChange is called only when state changes", () => {
  const onChange = jest.fn();
  const root = render(
    <OnOffCollection defaultOn="1" onChange={onChange}>
      {["1", "2"].map(stateId => (
        <OnOffItem id={stateId} key={stateId}>
          {({ setOn, setOff, toggle }) => (
            <>
              <button onClick={setOn}>setOn</button>
              <button onClick={setOff}>setOff</button>
              <button onClick={toggle}>toggle</button>
            </>
          )}
        </OnOffItem>
      ))}
    </OnOffCollection>,
    container
  );
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(root, "button");
  const [
    setOnButton1,
    setOffButton1,
    toggleButton1,
    setOnButton2,
    setOffButton2,
    toggleButton2
  ] = buttons;

  TestUtils.Simulate.click(setOnButton1);
  expect(onChange).toHaveBeenCalledTimes(0);
  TestUtils.Simulate.click(setOnButton2);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith("2");
  TestUtils.Simulate.click(setOffButton2);
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith(null);
  TestUtils.Simulate.click(setOffButton2);
  expect(onChange).toHaveBeenCalledTimes(2);
  TestUtils.Simulate.click(toggleButton1);
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(onChange).toHaveBeenLastCalledWith("1");
  TestUtils.Simulate.click(toggleButton2);
  expect(onChange).toHaveBeenCalledTimes(4);
  expect(onChange).toHaveBeenLastCalledWith("2");
});

test("resets the state when items unmount", () => {
  const onChange = jest.fn();
  const root = render(
    <OnOffCollection defaultOn="1" onChange={onChange}>
      {["1", "2"].map(stateId => (
        <OnOff key={stateId} defaultOn>
          {({ on: isItemVisible, toggle: toggleItem }) => (
            <>
              {isItemVisible ? (
                <OnOffItem id={stateId}>
                  {({ on }) => <span>{String(on)}</span>}
                </OnOffItem>
              ) : null}
              <button onClick={toggleItem}>toggleItem</button>
            </>
          )}
        </OnOff>
      ))}
    </OnOffCollection>,
    container
  );

  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(root, "button");
  const [span1, span2] = spans;
  const [toggleItemButton1, toggleItemButton2] = buttons;

  expect(span1.textContent).toEqual("true");
  expect(span2.textContent).toEqual("false");
  TestUtils.Simulate.click(toggleItemButton1);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(null);
  TestUtils.Simulate.click(toggleItemButton1);
  const newSpans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const [newSpan1, newSpan2] = newSpans;
  expect(newSpan1.textContent).toEqual("false");
  expect(newSpan2.textContent).toEqual("false");
});
