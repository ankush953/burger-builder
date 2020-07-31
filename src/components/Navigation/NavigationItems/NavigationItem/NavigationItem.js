import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => (
  <div className={classes.NavigationItem}>
    <NavLink to={{
      pathname: props.link
    }}
    exact={props.exact}
    activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </div>
);

export default navigationItem;
