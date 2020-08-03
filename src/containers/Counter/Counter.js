import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class Counter extends Component {
  render() {
    return (
      <div>
        Counter : {this.props.ctr}
        <button onClick={this.props.onIncrementHandler}>Increment</button>
        <button onClick={this.props.onAddValueHandler}>Add 10</button>
        <button onClick={() => this.props.onStoreResultHandler(this.props.ctr)}>
          Store value
        </button>
        <ul>
          {this.props.res.map((result) => (
            <li
              key={result.id}
              onClick={() => this.props.onDeleteResultHandler(result.id)}
            >
              {result.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    ctr: state.ctr.counter,
    res: state.res.results,
  };
};

console.log(actionTypes);

const matchDispatchToProps = (dispatch) => {
  return {
    onIncrementHandler: () => dispatch({ type: actionTypes.INCREMENT }),
    onAddValueHandler: () => dispatch({ type: actionTypes.ADD_VALUE, value: 10 }),
    onStoreResultHandler: (value) =>
      dispatch({ type: actionTypes.STORE_RESULT, value: value }),
    onDeleteResultHandler: (id) => dispatch({ type: actionTypes.DELETE_RESULT, id: id }),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(Counter);
