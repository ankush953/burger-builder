import * as actionTypes from "./actionTypes";

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    setTimeout((email, password) => dispatch(authSuccess()), 2000);
  };
};
