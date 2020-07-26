import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";
import PropType from "prop-types";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.cancelPurchase}></Backdrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

Modal.propType = {
  show: PropType.bool,
  clicked: PropType.cancelPurchase,
};

export default Modal;
