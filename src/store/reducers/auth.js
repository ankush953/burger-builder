import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, { loading: false, error: null });
    case actionTypes.AUTH_FAILED:
      return updateObject(state, { loading: false, error: action.error });
    default:
      return state;
  }
};

export default authReducer;
