import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      console.log(props.elementConfig);
      inputElement = (
        <select className={classes.InputElement} value={props.value}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
