import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">My Orders</NavigationItem>
    <NavigationItem link="/auth">Login/Signup</NavigationItem>
  </ul>
);

export default navigationItems;
