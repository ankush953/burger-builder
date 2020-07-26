import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";
import PropType from "prop-types";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        Total Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType={"Danger"} clicked={props.cancelPurchase}>
        CANCEL
      </Button>
      <Button btnType={"Success"} clicked={props.continuePurchase}>
        CONTINUE
      </Button>
    </Aux>
  );
};

orderSummary.propType = {
  ingredients: PropType.object,
  totalPrice: PropType.number,
  cancelPurchase: PropType.func,
  continuePurchase: PropType.func,
};

export default orderSummary;
