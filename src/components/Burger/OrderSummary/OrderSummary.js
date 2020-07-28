import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import PropType from "prop-types";

class OrderSummary extends Component {
  // can be functional component. changed to class just for testing purpose

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType={"Danger"} clicked={this.props.ModalClosed}>
          CANCEL
        </Button>
        <Button btnType={"Success"} clicked={this.props.continuePurchase}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

OrderSummary.propType = {
  ingredients: PropType.object,
  totalPrice: PropType.number,
  ModalClosed: PropType.func,
  continuePurchase: PropType.func,
};

export default OrderSummary;
