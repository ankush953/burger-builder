import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import PropTypes, { bool } from "prop-types";
import * as actionTypes from "../../../store/actions";
import { connect } from "react-redux";

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
        more={() => props.onAddIngredientHandler(ctrl.type)}
        less={() => props.onRemoveIngredientHandler(ctrl.type)}
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

const matchStateToProps = (state) => {
  return { ingredients: state.ingredients, totalPrice: state.totalPrice };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onAddIngredientHandler: (ingredientName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredientName,
      }),
    onRemoveIngredientHandler: (ingredientName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingredientName,
      }),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(BuildControls);
