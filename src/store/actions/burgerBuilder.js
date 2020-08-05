import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredientName,
  };
};

const fetchIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_INGREDIENT,
    ingredients: ingredients,
  };
};

const fetchIngredientsFailed = (error) => {
  return {
    type: actionTypes.INIT_INGREDIENT_FAILED,
    error: error,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://burger-builder-5ef56.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(fetchIngredients(response.data));
      })
      .catch((error) => dispatch(fetchIngredientsFailed(error)));
  };
};
