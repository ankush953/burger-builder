import * as actionTypes from "../actions";

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: action.value }),
      };
    case actionTypes.DELETE_RESULT:
      const updatedArray = state.results.filter((value) => value.id !== action.id);
      return {
        ...state,
        results: updatedArray,
      };
  }
  return state;
};

export default reducer;
