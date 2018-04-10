import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Subscriber} from "react-broadcast";
import {withStyles} from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AccountCircleIcon from "material-ui-icons/AccountCircle";

import {PROVIDER_NAME} from "./provider";
import FirebaseAuth from "../FirebaseAuth";
import UserMenu from "../UserMenu";
import Drawer from "../Drawer";

const styles = {
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
};

class FiretowerPageInner extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    hidePageChrome: PropTypes.bool,
    routes: PropTypes.object.isRequired,
    renderPageTitle: PropTypes.func.isRequired,
  };
  state = {drawerOpen: false};

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  };

  render() {
    console.log("page", this.props);
    const {drawerOpen} = this.state;
    const {
      classes,
      children,
      routes,
      renderPageTitle,
      hidePageChrome,
    } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          routes={routes}
          open={drawerOpen}
          onToggle={this.handleDrawerToggle}
        />
        {!hidePageChrome && (
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="contrast"
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
          {typeof children === "function" ? children({routes}) : children}
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

export default withStyles(styles)(FiretowerPage);
