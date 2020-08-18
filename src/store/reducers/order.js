import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
  return updateObject(state, {
    orders: state.orders.concat({
      ordersData: action.ordersData,
      id: action.ordersId,
    }),
    error: null,
    loading: false,
    purchased: true,
  });
};

const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const fetchOrdersFailed = (state, action) => {
  return updateObject(state, {
    orders: [],
    error: action.error,
    loading: false,
  });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { orders: [], loading: true });
};

const fetchOrdersSuccessful = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESSFUL:
      return fetchOrdersSuccessful(state, action);
    default:
      return state;
  }
};

export default ordersReducer;
