import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/order.json")
      .then((Response) => {
        console.log(Response);
        this.setState({ orders: Response.data, loading: false });
      })
      .catch((error) => console.log(error));
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = <h1>Content Fetched.</h1>;
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
