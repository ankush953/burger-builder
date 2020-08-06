import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        validation: {
          required: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        value: "",
        valid: false,
        touched: false,
      },
    },
    validForm: false,
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
    const updatedControls = { ...this.state.controls };
    const updatedValue = event.target.value;
    const updatedFormElement = updatedControls[inputIdentifier];
    updatedFormElement.value = updatedValue;
    const elementIsValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement
    );
    updatedFormElement.valid = elementIsValid;
    updatedFormElement.touched = true;
    updatedControls[inputIdentifier] = updatedFormElement;
    let updatedValidForm = true;
    for (let key in updatedControls) {
      if (updatedControls[key].validation) {
        updatedValidForm &= updatedControls[key].valid;
      }
    }
    this.setState({
      controls: updatedControls,
      validForm: updatedValidForm,
    });
  };

  authenticationHandler = (event) => {
    event.preventDefault();
    this.props.onAuthHandler(this.state.controls.email.value, this.state.controls.password.value);
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = <Spinner />;
    if (!this.props.loading) {
      form = (
        <form>
          {formElementArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.touched}
              changed={(event) =>
                this.inputChangeHandler(event, formElement.id)
              }
            />
          ))}
          <Button
            btnType="Success"
            disabled={!this.state.validForm}
            clicked={this.authenticationHandler}
          >
            SUBMIT
          </Button>
        </form>
      );
    }
    return <div className={classes.Auth}>{form}</div>;
  }
}

const matchStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onAuthHandler: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(Auth);
