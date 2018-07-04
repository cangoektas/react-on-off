import React, { Component } from "react";
import PropTypes from "prop-types";

import { Provider } from "./Context";
import generateId from "./utils/generate-id";
import noop from "./utils/noop";

export default class OnOffCollection extends Component {
  static propTypes = {
    defaultOn: PropTypes.string,
    on: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    defaultOn: null,
    onChange: noop
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.isControlled()
      ? this.props.on !== nextProps.on
      : this.state.on !== nextState.on;
  }

  isControlled() {
    return this.props.on !== undefined;
  }

  getOnState = () => {
    return this.isControlled() ? this.props.on : this.state.on;
  };

  setOnState = nextOnId => {
    const prevOnId = this.getOnState();
    const stateChanged = prevOnId !== nextOnId;
    const isControlled = this.isControlled();

    if (isControlled && stateChanged) {
      this.props.onChange(nextOnId);
    } else if (!isControlled && stateChanged) {
      this.setState({ on: nextOnId }, () => this.props.onChange(nextOnId));
    }
  };

  setOn = nextOnId => this.setOnState(nextOnId);

  setOff = nextOnId => {
    if (nextOnId === this.state.on) {
      this.setOnState(null);
    }
  };

  toggle = nextOnId => {
    const prevOnId = this.getOnState();
    this.setOnState(prevOnId !== nextOnId ? nextOnId : null);
  };

  registerItem = itemId => itemId || String(this.idGenerator());

  unregisterItem = itemId => {
    if (itemId === this.getOnState()) {
      this.setOnState(null);
    }
  };

  idGenerator = generateId;

  state = {
    on: this.props.defaultOn,
    setOn: this.setOn,
    setOff: this.setOff,
    toggle: this.toggle,
    registerItem: this.registerItem,
    unregisterItem: this.unregisterItem
  };

  render() {
    return (
      <Provider value={{ ...this.state, on: this.getOnState() }}>
        {this.props.children}
      </Provider>
    );
  }
}
