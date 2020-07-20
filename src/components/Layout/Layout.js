import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classes.content}>{props.children}</main>
  </Aux>
);

export default Layout;
