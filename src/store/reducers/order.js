import * as actionTypes from "../actions/actionTypes";

const initialState = {
  order: [],
  loading: false,
  error: null,
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        order: state.order.concat({
          orderData: action.orderData,
          id: action.orderId,
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
    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
