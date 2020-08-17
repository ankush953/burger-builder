import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import PropType from "prop-types";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses[1] = classes.Open;
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.toggle} />
      <div className={attachedClasses.join(" ")} onClick={props.toggle}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

sideDrawer.propType = {
  show: PropType.bool,
  toggle: PropType.func,
};

export default sideDrawer;
