import React, { Component } from "react";
import PropTypes from "prop-types";

import noop from "./utils/noop";

export default class OnOff extends Component {
  static propTypes = {
    defaultOn: PropTypes.bool,
    on: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    defaultOn: false,
    onChange: noop
  };

  state = { on: Boolean(this.props.defaultOn) };

  shouldComponentUpdate(nextProps, nextState) {
    return this.isControlled()
      ? this.props.on !== nextProps.on
      : this.state.on !== nextState.on;
  }

  isControlled() {
    return this.props.on !== undefined;
  }

  getOnState = () => {
    return this.isControlled() ? Boolean(this.props.on) : this.state.on;
  };

  setOnState = nextOn => {
    const prevOn = this.getOnState();
    const stateChanged = prevOn !== nextOn;
    const isControlled = this.isControlled();

    if (isControlled && stateChanged) {
      this.props.onChange(nextOn);
    } else if (!isControlled && stateChanged) {
      this.setState({ on: nextOn }, () => this.props.onChange(nextOn));
    }
  };

  setOn = () => this.setOnState(true);
  setOff = () => this.setOnState(false);
  toggle = () => this.setOnState(!this.getOnState());

  render() {
    const on = this.getOnState();

    return this.props.children({
      on: on,
      off: !on,
      setOn: this.setOn,
      setOff: this.setOff,
      toggle: this.toggle
    });
  }
}
