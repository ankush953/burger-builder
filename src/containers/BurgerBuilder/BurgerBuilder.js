import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    readyToPurchase: false,
    loading: false,
  };

  componentDidMount() {
    this.props.onInitIngredientHandler();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, ele) => sum + ele, 0);
    return sum > 0;
  };

  purchaseStateHandler = () => {
    this.setState({ readyToPurchase: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ readyToPurchase: false });
  };

  continuePurchaseHandler = () => {
    this.props.onInitPurchaseHandler();
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  render() {
    let disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            price={this.props.totalPrice}
            addIngredient={this.props.onAddIngredientHandler}
            removeIngredient={this.props.onRemoveIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            readyToPurchase={this.purchaseStateHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          ModalClosed={this.cancelPurchaseHandler}
          continuePurchase={this.continuePurchaseHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.readyToPurchase}
          ModalClosed={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onAddIngredientHandler: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onRemoveIngredientHandler: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredientHandler: () =>
      dispatch(actions.initIngredients()),
      onInitPurchaseHandler: () => dispatch(actions.initPurchase()),
  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
