import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-orders";
import classes from "./ContactData.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        validation: {
          required: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your E-Mail",
        },
        validation: {
          required: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        validation: {
          required: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      ZIP: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        validation: {
          required: true,
          minLength: 3,
          maxLength: 6,
        },
        value: "",
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        validation: {
          required: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" },
          ],
        },
        valid: true,
        touched: false,
        value: 'fastest',
      },
    },
    loading: false,
    validForm: false,
  };

  orderPlacedHandler = (event) => {
    event.preventDefault();
    const userData = {};
    for (let key in this.state.orderForm) {
      userData[key] = this.state.orderForm[key].value;
    }
    this.setState({ loading: true });
    let data = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: userData,
    };
    axios
      .post("/order.json", data)
      .then(() => {
        this.setState({ loading: false });
        alert("Order placed successfully.");
        this.props.history.push("/");
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  checkValidity = (value, formElement) => {
    let isValid = true;
    if (formElement.validation) {
      if (formElement.validation.required) {
        isValid &= value.trim() !== "";
      }
      if (formElement.validation.minLength) {
        isValid &= value.trim().length >= formElement.validation.minLength;
      }
      if (formElement.validation.maxLength) {
        isValid &= value.trim().length <= formElement.validation.maxLength;
      }
    }
    return isValid;
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    const elementIsValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement
    );
    updatedFormElement.valid = elementIsValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let updatedValidForm = true;
    for (let key in updatedOrderForm) {
      if (updatedOrderForm[key].validation) {
        updatedValidForm &= updatedOrderForm[key].valid;
      }
    }
    this.setState({
      orderForm: updatedOrderForm,
      validForm: updatedValidForm,
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderPlacedHandler}
          disabled={!this.state.validForm}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const matchStateToProps = (state) => {
  return { ingredients: state.ingredients, totalPrice: state.totalPrice };
};

export default connect(matchStateToProps)(ContactData);
