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
  console.log('[BurgerBuilder actions] fetchIngredients');
  return {
    type: actionTypes.INIT_INGREDIENT,
    ingredients: ingredients,
  };
};

export const initIngredients = () => {
  console.log('[BurgerBuilder actions]');
  return (dispatch) => {
    axios
      .get("https://burger-builder-5ef56.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(fetchIngredients(response.data));
      })
      .catch((error) => console.log(error));
  };
};
