import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat({
          ordersData: action.ordersData,
          id: action.ordersId,
        }),
        error: null,
        loading: false,
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESSFUL:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ordersReducer;
