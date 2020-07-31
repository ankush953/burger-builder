import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let pair of query.entries()) {
      if (pair[0] !== "price") {
        ingredients[pair[0]] = +pair[1];
      } else {
        this.setState({ price: +pair[1] });
      }
    }
    this.setState({ ingredients: ingredients });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          exact
          render={() => (<ContactData {...this.state}/>)}
        />
      </div>
    );
  }
}

export default Checkout;
