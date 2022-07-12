import React, { Component, Fragment } from "react";

class LoadingButton extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.state = { 
      isLoading: false
    };
  }

  handleClick(event) {
    this.setState({ isLoading: true });
    this.props.submitHandler(event);
  }

  render() {
    const { iconText, loadingText, defaultText } = this.props;

    return (
      <button
        type="submit"
        style={{ width: "100%" }}
        className="btn btn-success"
        disabled={ this.state.isLoading }
        onClick={ !this.state.isLoading ? this.handleClick : null }
      >
        <span dangerouslySetInnerHTML={{__html:iconText}} /> { this.state.isLoading ? loadingText : defaultText }
      </button>
    );
  }
}

export default LoadingButton;