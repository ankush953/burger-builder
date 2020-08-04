import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          exact
          component={ContactData}
        />
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return { ingredients: state.ingredients, totalPrice: state.totalPrice };
};

export default connect(matchStateToProps)(Checkout);
