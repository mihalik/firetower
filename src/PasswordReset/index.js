import React, {Component} from "react";
import {withStyles} from "material-ui/styles";

import Auth from "../Auth";
import PasswordResetDisplay from "./display";

const styles = theme => ({});

class PasswordReset extends Component {
  render() {
    return (
      <Auth>{auth => <PasswordResetInner {...auth} {...this.props} />}</Auth>
    );
  }
}

class PasswordResetInner extends Component {
  state = {email: ""};
  handleFormSubmit = event => {
    event.preventDefault();
    const {email} = this.state;
    const {forgot} = this.props;
    forgot(email);
  };
  handleEmailInput = event => {
    this.setState({email: event.target.value});
  };
  render() {
    const {classes, error, message} = this.props;
    const {email} = this.state;
    return (
      <PasswordResetDisplay
        error={error.message}
        message={message}
        email={email}
        onFormSubmit={this.handleFormSubmit}
        onEmailInput={this.handleEmailInput}
      />
    );
  }
}

export default withStyles(styles, {withTheme: true})(PasswordReset);
