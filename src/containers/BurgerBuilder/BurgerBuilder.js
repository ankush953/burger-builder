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

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    readyToPurchase: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    // axios
    //   .get("https://burger-builder-5ef56.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.props.ingredients = response.data;
    //     this.calculatePriceHandler();
    //   })
    //   .catch((error) => this.setState({ error: error }));
  }

  calculatePriceHandler = () => {
    const price = Object.keys(this.props.ingredients).reduce(
      (price, ingredient) => {
        return (
          price +
          INGREDIENT_PRICES[ingredient] * this.props.ingredients[ingredient]
        );
      },
      4
    );
    this.setState({ totalPrice: price });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, ele) => sum + ele, 0);
    this.setState({ purchasable: sum > 0 });
  };

  purchaseStateHandler = () => {
    this.setState({ readyToPurchase: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ readyToPurchase: false });
  };

  continuePurchaseHandler = () => {
    const queryParams = [];
    for (let key in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(this.props.ingredients[key])
      );
    }
    queryParams.push("price=" + encodeURIComponent(this.props.totalPrice));
    this.props.history.push({
      pathname: "/checkout",
      search: queryParams.join("&"),
    });
  };

  render() {
    let disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>{this.state.error.message}</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            price={this.props.totalPrice}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
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
  return { ingredients: state.ingredients, totalPrice: state.totalPrice };
};

export default connect(
  matchStateToProps
)(withErrorHandler(BurgerBuilder, axios));
