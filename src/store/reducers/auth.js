import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    loading: false,
    error: null,
  });
};

const authFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    default:
      return state;
  }
};

export default authReducer;
