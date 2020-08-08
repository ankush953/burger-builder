import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecurityToken: true,
    };
    const url = "";
    if(isSignup){
      url = "";
    }
    Axios.post(url, authData)
      .then((response) => dispatch(authSuccess(response.data.idToken, response.data.localId)))
      .catch((error) => dispatch(authFailed(error.response.data.error)));
  };
};
