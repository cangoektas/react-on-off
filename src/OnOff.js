import React from "react";
import PropTypes from "prop-types";

export default class OnOff extends React.Component {
  static propTypes = {
    defaultOn: PropTypes.bool,
    on: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    defaultOn: false,
    on: null,
    onChange: () => {}
  };

  state = { on: this.props.defaultOn };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.on == null || nextProps.on === prevState.on) {
      return null;
    }

    return { on: nextProps.on };
  }

  setOnState = on => {
    const prevOn = this.state.on;

    this.setState({ on }, () => on !== prevOn && this.props.onChange(on));
  };

  setOn = () => this.setOnState(true);
  setOff = () => this.setOnState(false);
  toggle = () => this.setOnState(!this.state.on);

  render() {
    return this.props.children({
      on: this.state.on,
      off: !this.state.on,
      setOn: this.setOn,
      setOff: this.setOff,
      toggle: this.toggle
    });
  }
}
