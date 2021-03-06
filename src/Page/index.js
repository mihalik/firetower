import React from "react";
import PropTypes from "prop-types";
import { Subscriber } from "react-broadcast";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { PROVIDER_NAME } from "./provider";
import UserMenu from "../UserMenu";
import FiretowerUIDrawer from "../FiretowerUIDrawer";

const styles = theme => ({
  logo: {
    height: 28,
  },
  root: {
    width: "100%",
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  content: {
    padding: "2rem",
  },
});

class FiretowerPageInner extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    hidePageChrome: PropTypes.bool,
    routes: PropTypes.object.isRequired,
    renderPageTitle: PropTypes.func.isRequired,
  };
  state = { drawerOpen: false };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { drawerOpen } = this.state;
    const {
      classes,
      children,
      routes,
      renderPageTitle,
      hidePageChrome,
      match,
      history,
    } = this.props;
    return (
      <div className={classes.root}>
        <FiretowerUIDrawer routes={routes} open={drawerOpen} onToggle={this.handleDrawerToggle} />
        {!hidePageChrome && (
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.flex}>{renderPageTitle()}</div>
              <UserMenu routes={routes} />
            </Toolbar>
          </AppBar>
        )}
        <div className={classes.content}>
          {typeof children === "function" ? children({ match, history, routes }) : children}
        </div>
      </div>
    );
  }
}

class FiretowerPage extends React.Component {
  render() {
    return (
      <Subscriber channel={PROVIDER_NAME}>
        {value => <FiretowerPageInner {...value} {...this.props} />}
      </Subscriber>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FiretowerPage);
