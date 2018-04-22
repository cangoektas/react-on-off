import React, { Component } from "react";
import { render } from "react-dom";
import TestUtils from "react-dom/test-utils";

import { OnOffItem } from "..";

class TestWrapper extends Component {
  render() {
    return this.props.children;
  }
}
let container;
beforeEach(() => {
  container = document.createElement("div");
});

test("renders without crashing", () => {
  expect(() =>
    render(<OnOffItem>{() => <span>Hello, world!</span>}</OnOffItem>, container)
  ).not.toThrow();
});

test("state defaults to off", () => {
  const root = render(
    <TestWrapper>
      <OnOffItem>
        {({ on, off }) => (
          <>
            <span>{String(on)}</span>
            <span>{String(off)}</span>
          </>
        )}
      </OnOffItem>
    </TestWrapper>,
    container
  );
  const spans = TestUtils.scryRenderedDOMComponentsWithTag(root, "span");
  const [spanOn, spanOff] = spans;

  expect(spanOn.textContent).toEqual("false");
  expect(spanOff.textContent).toEqual("true");
});

test("allows to set id", () => {
  const root = render(
    <TestWrapper>
      <OnOffItem id="foo">{({ id }) => <span>{String(id)}</span>}</OnOffItem>
    </TestWrapper>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");

  expect(span.textContent).toEqual("foo");
});

test("state does not change without OnOffCollection", () => {
  const root = render(
    <TestWrapper>
      <OnOffItem>
        {({ on, setOn, setOff, toggle }) => (
          <>
            <span>{String(on)}</span>
            <button onClick={setOn}>setOn</button>
            <button onClick={setOff}>setOn</button>
            <button onClick={toggle}>toggle</button>
          </>
        )}
      </OnOffItem>
    </TestWrapper>,
    container
  );
  const span = TestUtils.findRenderedDOMComponentWithTag(root, "span");
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(root, "button");
  const [setOnButton, setOffButton, toggleButton] = buttons;

  TestUtils.Simulate.click(setOnButton);
  expect(span.textContent).toEqual("false");
  TestUtils.Simulate.click(setOffButton);
  expect(span.textContent).toEqual("false");
  TestUtils.Simulate.click(toggleButton);
  expect(span.textContent).toEqual("false");
});
