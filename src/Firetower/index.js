import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { FirestoreProvider } from "react-firestore";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

import theme from "./baseTheme";
import PageProvider from "../Page/provider";
import Auth from "../Auth";
import AuthProvider from "../Auth/provider";
import NotFound from "../NotFound";

const RouteWrap = ({ component: Component, auth, login, routes, ...routeProps }) => {
  if (routeProps.externalPath || !Component) {
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
          display = auth.hasResolved ? <Redirect to={routes.login.path} /> : loader;
        }
        // If this required admin and we don't have user details or user is
        // not admin, don't display anything.
        // NOTE: We should be better about what gets displayed in the future
        // and actually try and display a spinner and whatever.
        if (props.requiresAdmin && (!auth.user.details || !auth.user.details.isAdmin)) {
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
    renderPageTitle: PropTypes.func.isRequired,
    pageNotFound: PropTypes.element,
    firebase: PropTypes.object,
  };
  static contextTypes = {
    router: PropTypes.object,
  };
  defaultProps = {
    pageNotFound: NotFound,
    firebase: window.firebase,
  };
  handleLogin = () => {
    const { routes, defaultPage } = this.props;
    // After login, go to default page or the first page in the routes object
    const finalDefaultPage = defaultPage || Object.keys(routes)[0];
    this.context.router.history.push(routes[finalDefaultPage].path);
  };
  handleLogout = () => {
    const { routes } = this.props;
    // After logout, go to the 'login' page
    this.context.router.history.push(`${routes.login.path}?reason=logout`);
  };
  renderRouteChildren = auth => {
    const { routes, defaultPage, renderPageTitle, pageNotFound } = this.props;
    const elements = Object.keys(routes).map(key => (
      <RouteWrap
        auth={auth}
        renderPageTitle={renderPageTitle}
        routes={routes}
        key={key}
        {...routes[key]}
      />
    ));
    elements.push(<Route path="/404" key="404route" component={pageNotFound} />);
    elements.push(<Redirect to="/404" key="404redirect" />);
    return elements;
  };
  render() {
    const { routes, defaultPage, renderPageTitle, pageNotFound, firebase } = this.props;
    return (
      <AuthProvider onLogout={this.handleLogout} firebase={firebase}>
        <FirestoreProvider firebase={firebase}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Auth>{auth => <Switch>{this.renderRouteChildren(auth)}</Switch>}</Auth>
          </MuiThemeProvider>
        </FirestoreProvider>
      </AuthProvider>
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
