import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  toggleSideDrawer = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  
  render() {
    return (
      <Aux>
        <Toolbar clicked={this.toggleSideDrawer} />
        <SideDrawer
          toggle={this.toggleSideDrawer}
          show={this.state.showSideDrawer}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
