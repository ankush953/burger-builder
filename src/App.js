import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const aysncCheckout = asyncComponent(() => import("./containers/Checkout/Checkout"));
const aysncAuth = asyncComponent(() => import("./containers/Auth/Auth"));
const aysncOrders = asyncComponent(() => import("./containers/Orders/Orders"));
const aysncLogout = asyncComponent(() => import("./containers/Auth/Logout/Logout"));

class App extends Component {
  componentDidMount() {
    this.props.onAutoLoginHandler();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={aysncAuth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={aysncCheckout} />
          <Route path="/orders" component={aysncOrders} />
          <Route path="/logout" component={aysncLogout} />
          <Route path="/auth" component={aysncAuth} />
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
