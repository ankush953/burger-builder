import React from "react";
import classes from "./Button.module.css";
import PropType from "prop-types";

const button = (props) => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

button.propType = {
  clicked: PropType.func,
  btnType: PropType.string,
};

export default button;
