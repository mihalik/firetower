import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import queryString from "query-string";

import Auth from "../Auth";
import Snackbar from "../Snackbar";
import LoginDisplay from "./display";

const styles = theme => ({});

class LoginWrap extends Component {
  render() {
    return <Auth>{auth => <Login auth={auth} {...this.props} />}</Auth>;
  }
}

class Login extends Component {
  static propTypes = {
    loggedInRedirect: PropTypes.string.isRequired,
    displayBefore: PropTypes.node,
    displayAfter: PropTypes.node,
    auth: PropTypes.object.isRequired,
  };
  state = { email: "", password: "" };
  constructor(props) {
    super(props);
    const qs = queryString.parse(window.location.search);
    const isResetPassword = qs.reset !== undefined;
    console.log({ qs, isResetPassword });
    this.state.isResetPassword = isResetPassword;
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password, isResetPassword } = this.state;
    const { auth } = this.props;
    if (isResetPassword) {
      auth.actions.forgot(email);
    } else {
      auth.actions.login(email, password);
    }
  };
  handleEmailInput = event => {
    this.setState({ email: event.target.value });
  };
  handlePasswordInput = event => {
    this.setState({ password: event.target.value });
  };
  handleToggleForgotClick = () => {
    const { isResetPassword } = this.state;
    this.setState({ isResetPassword: !isResetPassword });
  };
  render() {
    const { auth, loggedInRedirect, displayBefore, displayAfter } = this.props;
    const { email, password, isResetPassword } = this.state;
    const qs = queryString.parse(window.location.search);
    const isLogout = !!(qs.reason && qs.reason === "logout");
    if (auth.user) {
      return <Redirect to={loggedInRedirect} />;
    }

    return (
      <div>
        {isLogout && <Snackbar message="Logged out" />}
        {displayBefore}
        <LoginDisplay
          errorMessage={auth.error ? auth.error.message : undefined}
          email={email}
          password={password}
          isResetPassword={isResetPassword}
          onFormSubmit={this.handleFormSubmit}
          onEmailInput={this.handleEmailInput}
          onPasswordInput={this.handlePasswordInput}
          onToggleForgotClick={this.handleToggleForgotClick}
        />
        {displayAfter}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginWrap);
