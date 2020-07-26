import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import PropTypes, { bool } from "prop-types";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        type={ctrl.type}
        more={() => props.addIngredient(ctrl.type)}
        less={() => props.removeIngredient(ctrl.type)}
        disabled={props.disabledInfo[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.readyToPurchase}
    >
      ORDER NOW
    </button>
  </div>
);

BuildControls.PropType = {
  price: PropTypes.number,
  more: PropTypes.func,
  less: PropTypes.func,
  disabledInfo: PropTypes.arrayOf(bool),
  purchasable: PropTypes.bool,
  readyToPurchase: PropTypes.func,
};

export default BuildControls;
