import React from "react";
import classes from "./BuildControl.module.css";
import PropTypes from "prop-types";

const BuildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.less}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.more}>
      More
    </button>
  </div>
);

BuildControl.propTypes = {
  label: PropTypes.string,
  less: PropTypes.func,
  disabled: PropTypes.bool,
  more: PropTypes.func,
};

export default BuildControl;
