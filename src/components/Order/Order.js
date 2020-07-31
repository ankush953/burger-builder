import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = [];
  for (let ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      quantity: props.ingredients[ingredient],
    });
  }

  const ingredientOutput = ingredients.map((igKey) => (
    <span
      key={igKey.name}
      style={{
        textTransform: "capitalize",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px",
        display: "inline-block",
      }}
    >
      {igKey.name}: {igKey.quantity}
      <br />
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
