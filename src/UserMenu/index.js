import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {withStyles} from "material-ui/styles";
import Menu, {MenuItem} from "material-ui/Menu";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import AccountCircleIcon from "material-ui-icons/AccountCircle";

import FirebaseAuth from "../FirebaseAuth";

const styles = {
  base: {
    flex: 1,
  },
};

class UserMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  };
  state = {anchorEl: null};

  handleMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
  };

  handleLogout = auth => () => {
    auth.logout();
    this.setState({anchorEl: null});
  };

  renderUser(auth) {
    const {classes, routes} = this.props;
    const {anchorEl} = this.state;
    const open = !!anchorEl;
    return (
      <div className={classes.base}>
        {/* <div>{auth.user.email}</div> */}
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleMenuOpen}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={this.handleMenuClose}
        >
          {Object.keys(routes).map(key => {
            const {path, display, isUserMenu} = routes[key];
            if (!isUserMenu) {
              return null;
            }
            return (
              <MenuItem
                component={Link}
                to={path}
                onClick={this.handleMenuClose}
              >
                {display}
              </MenuItem>
            );
          })}
          <MenuItem onClick={this.handleLogout(auth)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  renderLogin() {
    console.log("login", this.props);
    const {routes} = this.props;
    return (
      <Button color="contrast" component={Link} to={routes.login.path}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <FirebaseAuth>
        {auth => (
          <div>
            {!auth.user && this.renderLogin()}
            {auth.user && this.renderUser(auth)}
          </div>
        )}
      </FirebaseAuth>
    );
  }
}

export default withStyles(styles)(UserMenu);