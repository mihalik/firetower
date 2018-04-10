import React, {Component} from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {withStyles} from "material-ui/styles";
import queryString from "query-string";

import FirebaseAuth from "../FirebaseAuth";
import TempMessage from "../TempMessage";
import LoginDisplay from "./display";

const styles = theme => ({});

class LoginWrap extends Component {
  render() {
    return (
      <FirebaseAuth>
        {auth => <Login auth={auth} {...this.props} />}
      </FirebaseAuth>
    );
  }
}

class Login extends Component {
  static propTypes = {
    loggedInRedirect: PropTypes.string.isRequired,
  };
  state = {email: "", password: ""};
  handleFormSubmit = event => {
    event.preventDefault();
    const {email, password} = this.state;
    const {auth} = this.props;
    auth.login(email, password);
  };
  handleEmailInput = event => {
    this.setState({email: event.target.value});
  };
  handlePasswordInput = event => {
    this.setState({password: event.target.value});
  };
  render() {
    const {auth, loggedInRedirect} = this.props;
    const {email, password} = this.state;
    const qs = queryString.parse(window.location.search);
    const isLogout = !!(qs.reason && qs.reason === "logout");
    if (auth.user) {
      return <Redirect to={loggedInRedirect} />;
    }

    return (
      <div>
        {isLogout && <TempMessage message="Logged out" />}
        <LoginDisplay
          errorMessage={auth.error ? auth.error.message : undefined}
          email={email}
          password={password}
          onFormSubmit={this.handleFormSubmit}
          onEmailInput={this.handleEmailInput}
          onPasswordInput={this.handlePasswordInput}
        />
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(LoginWrap);
