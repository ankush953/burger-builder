import React, { Component } from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    

  return class extends Component {
    state = {
      error: null,
    };

    dismissErrorHandler = () => {
      this.setState({ error: null });
    };
    render() {
      axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });

      axios.interceptors.response.use(
        (response) => response,
        (error) => this.setState({ error: error })
      );

      return (
        <Aux>
          <Modal show={this.state.error} ModalClosed={this.dismissErrorHandler}>
            {this.state.error ? this.state.error.message: null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
