import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/order.json")
      .then((Response) => {
        const fetchedOrders = [];
        for (let key in Response.data) {
          fetchedOrders.push({ ...Response.data[key], id: key });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch((error) => console.log(error));
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = this.state.orders.map((order) => (
        <Order
          key={order.id}
          price={order.price}
          ingredients={order.ingredients}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
