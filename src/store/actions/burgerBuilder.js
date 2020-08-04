import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredientName
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredientName,
  };
};
