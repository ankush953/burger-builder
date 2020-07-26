import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
