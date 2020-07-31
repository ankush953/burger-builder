import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  let ingredients = "";
  for (let ingredient in props.ingredients) {
    ingredients += ingredient + "=" + props.ingredients[ingredient] + "\n";
  }
  return (
    <div className={classes.Order}>
      <p>{ingredients}</p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
