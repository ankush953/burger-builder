import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { updateObject, checkValidity } from "../../shared/utility";

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
          // minLength: 6,
        },
        value: "",
        valid: false,
        touched: false,
      },
    },
    validForm: false,
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onsetAuthRedirectPathHandler("/");
    }
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.controls[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const updatedControls = updateObject(this.state.controls, {
      [inputIdentifier]: updatedFormElement,
    });
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
    this.props.onAuthHandler(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
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
        </form>
      );
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {this.props.isAuth ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        {errorMessage}
        {form}
        <Button
          btnType="Success"
          disabled={!this.state.validForm}
          clicked={this.authenticationHandler}
        >
          SUBMIT
        </Button>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    building: state.burgerBuilder.building,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onAuthHandler: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onsetAuthRedirectPathHandler: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(Auth);
