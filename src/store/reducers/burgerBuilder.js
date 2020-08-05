import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: null,
};

const addIngredient = (state, action) => {
  const updatedIngredients = {
    ...state.ingredients,
    [action.ingredient]: state.ingredients[action.ingredient] + 1,
  };
  const updatedProperties = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
  };
  return updateObject(state, updatedProperties);
};

const removedIngredient = (state, action) => {
  const updatedIngs = {
    ...state.ingredients,
    [action.ingredient]: state.ingredients[action.ingredient] - 1,
  };
  const updatedProps = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
  };
  return updateObject(state, updatedProps);
};

const initIngredients = (state, action) => {
  const updatedprops = {
    ingredients: {
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat,
    },
    error: null,
    totalPrice: 4,
  };
  return updateObject(state, updatedprops);
};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removedIngredient(state, action);
    case actionTypes.INIT_INGREDIENT:
      return initIngredients(state, action);
    case actionTypes.INIT_INGREDIENT_FAILED:
      return updateObject(state, { error: action.error });
    default:
      return state;
  }
};

export default ingredientReducer;
