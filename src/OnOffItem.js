import React, { Component } from "react";
import PropTypes from "prop-types";

import { Consumer } from "./Context";

class OnOffItemImpl extends Component {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.func.isRequired,
    context: PropTypes.shape({
      on: PropTypes.string,
      setOn: PropTypes.func.isRequired,
      setOff: PropTypes.func.isRequired,
      toggle: PropTypes.func.isRequired,
      registerItem: PropTypes.func.isRequired,
      unregisterItem: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    id: this.props.context.registerItem(this.props.id)
  };

  componentWillUnmount() {
    this.props.context.unregisterItem(this.props.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const id = this.state.id;
    const prevOn = this.props.context.on;
    const nextOn = nextProps.context.on;
    const itemIsOn = prevOn === id;

    return (itemIsOn && nextOn !== id) || (!itemIsOn && nextOn === id);
  }

  setOn = () => this.props.context.setOn(this.state.id);
  setOff = () => this.props.context.setOff(this.state.id);
  toggle = () => this.props.context.toggle(this.state.id);

  render() {
    const id = this.state.id;
    const on = this.props.context.on === id;

    return this.props.children({
      id,
      on,
      off: !on,
      setOn: this.setOn,
      setOff: this.setOff,
      toggle: this.toggle
    });
  }
}

const OnOffItem = props => (
  <Consumer>
    {contextValue => <OnOffItemImpl {...props} context={contextValue} />}
  </Consumer>
);

OnOffItem.propTypes = {
  id: PropTypes.string,
  children: PropTypes.func.isRequired
};

export default OnOffItem;
