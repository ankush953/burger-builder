import * as actionTypes from "../actions";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case actionTypes.ADD_VALUE:
      return {
        ...state,
        counter: state.counter + action.value,
      };
  }
  return state;
};

export default reducer;
