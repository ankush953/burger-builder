import React, { Component } from "react";
import Order from "../../components/Order/Order";

class Orders extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      meat: 1,
      cheese: 1,
    },
  };
  render() {
    return <Order ingredients={this.state.ingredients} price="45" />;
  }
}

export default Orders;
