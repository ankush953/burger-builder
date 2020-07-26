import React from "react";
import classes from "./DrawerToggle.module.css";
import PropType from "prop-types";

const drawerToggle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

drawerToggle.propType = {
  clicked: PropType.func,
};

export default drawerToggle;
