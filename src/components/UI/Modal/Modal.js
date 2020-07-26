import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";
import PropType from "prop-types";

const modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.cancelPurchase}></Backdrop>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

modal.propType = {
  show: PropType.bool,
  clicked: PropType.cancelPurchase,
};

export default modal;
