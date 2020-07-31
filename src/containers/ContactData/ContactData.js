import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-orders";
import classes from "./ContactData.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";

class ContactData extends Component {
  state = {
      loading: false,
  };

  orderPlacedHandler = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });
    let data = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="your Name" />
        <input type="email" name="email" placeholder="your Email" />
        <input type="text" name="street" placeholder="your Street" />
        <input type="text" name="postalCode" placeholder="your Postal-code" />
        <Button btnType="Success" clicked={this.orderPlacedHandler}>
          ORDER
        </Button>
      </form>
    );
    if(this.state.loading){
        form = <Spinner />
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default withRouter(ContactData);