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

export const authLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTime = (expirationTime) => {
  return (dispatch) => {
    setTimeout(
      () => dispatch(authLogout(expirationTime)),
      expirationTime * 1000
    );
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuCCxM6bqBA3yB0x41_V0ditjI7zQCqD8";
    if (isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuCCxM6bqBA3yB0x41_V0ditjI7zQCqD8";
    }
    Axios.post(url, authData)
      .then((response) => {
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTime(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFailed(error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      return dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate.getTime() > new Date().getTime()) {
        dispatch(authSuccess(idToken, localStorage.getItem("userId")));
        dispatch(
          checkAuthTime(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};
