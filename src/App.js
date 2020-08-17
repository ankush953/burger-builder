import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, Redirect } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onAutoLoginHandler();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
          <Redirect to="/" />
        </Layout>
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onAutoLoginHandler: () => dispatch(actions.autoLogin()),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(App);
