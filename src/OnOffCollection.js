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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.on === undefined || nextProps.on === prevState.context.on) {
      return null;
    }

    return {
      ...prevState,
      context: { ...prevState.context, on: nextProps.on }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.context.on !== nextState.context.on;
  }

  setOnState = id => {
    const prevOn = this.state.context.on;

    this.setState(
      prevState => ({
        ...prevState,
        context: { ...prevState.context, on: id }
      }),
      () => id !== prevOn && this.props.onChange(id)
    );
  };

  setOn = id => this.setOnState(id);
  setOff = () => this.setOnState(null);
  toggle = id => {
    const prevOn = this.state.context.on;
    const nextOn = id !== prevOn ? id : null;
    this.setOnState(nextOn);
  };

  registerItem = id => id || String(this.state.idGenerator());

  unregisterItem = id => {
    if (id === this.state.context.on) {
      this.setOnState(null);
    }
  };

  state = {
    idGenerator: generateId,
    context: {
      on: this.props.defaultOn,
      setOn: this.setOn,
      setOff: this.setOff,
      toggle: this.toggle,
      registerItem: this.registerItem,
      unregisterItem: this.unregisterItem
    }
  };

  render() {
    return (
      <Provider value={this.state.context}>{this.props.children}</Provider>
    );
  }
}
