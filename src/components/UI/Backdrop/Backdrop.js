import React from "react";
import classes from "./Backdrop.module.css";
import PropType from "prop-types";

const backdrop = (props) => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;
};

backdrop.propType = {
  clicked: PropType.func,
};

export default backdrop;
