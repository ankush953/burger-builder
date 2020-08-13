import React, { Component } from "react";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogoutHandler();
  }

  render() {
    return (
      <div>
        <Redirect to="/auth" />
      </div>
    );
  }
}

const mathDispatchToProps = (dispatch) => {
  return { onLogoutHandler: () => dispatch(actions.authLogout()) };
};

export default connect(null, mathDispatchToProps)(Logout);
