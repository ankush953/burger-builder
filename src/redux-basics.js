const redux = require("redux");

// initial state
const initialState = {
  counter: 0,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "ADD_VALUE") {
    return {
      counter: state.counter + action.value,
    };
  }
  return state;
};

// Store
const store = redux.createStore(rootReducer);

// subscribe
store.subscribe(() => console.log(store.getState()));

// Dispatching action
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "ADD_VALUE", value: 10 });
