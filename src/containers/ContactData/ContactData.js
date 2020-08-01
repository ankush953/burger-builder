import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-orders";
import classes from "./ContactData.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import input from "../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your E-Mail",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      ZIP: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your Country",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", display: "Fastest" },
            { value: "cheapest", display: "Cheapest" },
          ],
        },
      },
    },
    loading: false,
  };

  orderPlacedHandler = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });
    let data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "ankush",
        address: {
          pin: "ABCDEF",
          country: "India",
        },
        phone: "29834",
      },
    };
    axios
      .post("/order.json", data)
      .then((response) => {
        this.setState({ loading: false });
        console.log(response);
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        this.props.history.push("/");
      });
  };

  inputChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm,
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
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.orderPlacedHandler}>
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

export default withRouter(ContactData);
