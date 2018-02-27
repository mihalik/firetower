import React, {Component} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {MuiThemeProvider} from "material-ui/styles";
import {FirestoreProvider} from "react-firestore";
import Reboot from "material-ui/Reboot";
import "typeface-roboto";

import theme from "./baseTheme";
import PageProvider from "../Page/provider";
import FirebaseAuth from "../FirebaseAuth";
import FirebaseAuthProvider from "../FirebaseAuth/provider";

const RouteWrap = ({component: Component, auth, login, ...routeProps}) => {
  if (routeProps.externalPath || routeProps.isUserMenu || !Component) {
    return null;
  }
  return (
    <Route
      {...routeProps}
      render={props => {
        let display = (
          <PageProvider key={routeProps.path} {...props} {...routeProps}>
            <Component {...props} {...routeProps} />
          </PageProvider>
        );
        const loader = <span />;
        const empty = <span />;
        // If this requires auth but we don't have a user (yet) display loader
        // or perform redirect.
        if (props.requiresAuth && !auth.user) {
          display = auth.hasResolved ? (
            <Redirect to={routes.login.path} />
          ) : (
            loader
          );
        }
        // If this required admin and we don't have user details or user is
        // not admin, don't display anything.
        // NOTE: We should be better about what gets displayed in the future
        // and actually try and display a spinner and whatever.
        if (props.requiresAdmin && (!auth.details || !auth.details.isAdmin)) {
          display = empty;
        }
        // Otherwise, show the component
        return display;
      }}
    />
  );
};

class RoutesInner extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    defaultPage: PropTypes.string,
    renderAppTitle: PropTypes.func.isRequired,
  };
  static contextTypes = {
    router: PropTypes.object,
  };
  handleLogin = () => {
    const {routes, defaultPage} = this.props;
    // After login, go to default page or the first page in the routes object
    const finalDefaultPage = defaultPage || Object.keys(routes)[0];
    this.context.router.history.push(routes[finalDefaultPage].path);
  };
  handleLogout = () => {
    const {routes} = this.props;
    // After logout, go to the 'login' page
    this.context.router.history.push(`${routes.login.path}?reason=logout`);
  };
  render() {
    const {routes, defaultPage, renderAppTitle} = this.props;
    console.log("firetower", this.props);
    return (
      <FirebaseAuthProvider
        onLogin={this.handleLogin}
        onLogout={this.handleLogout}
      >
        <FirestoreProvider firebase={window.firebase}>
          <MuiThemeProvider theme={theme}>
            <Reboot />
            <FirebaseAuth>
              {auth =>
                Object.keys(routes).map(key => (
                  <RouteWrap
                    auth={auth}
                    renderAppTitle={renderAppTitle}
                    routes={routes}
                    {...routes[key]}
                  />
                ))
              }
            </FirebaseAuth>
          </MuiThemeProvider>
        </FirestoreProvider>
      </FirebaseAuthProvider>
    );
  }
}

export default class Firetower extends Component {
  render() {
    return (
      <Router>
        <RoutesInner {...this.props} />
      </Router>
    );
  }
}
