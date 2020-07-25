import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if(props.show){
    attachedClasses[1] = classes.Open;
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.toggle}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
