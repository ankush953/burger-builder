import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrderHandler();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      console.log(this.props.orders);
      orders = this.props.orders.map((order) => (
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

const matchStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onFetchOrderHandler: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(withErrorHandler(Orders, axios));
