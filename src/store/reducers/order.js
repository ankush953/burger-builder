import * as actionTypes from "../actions/actionTypes";

const initialState = {
  order: [],
  loading: false,
  error: null,
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
    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
