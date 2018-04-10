import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {withStyles} from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import List, {ListItem, ListItemText, ListItemIcon} from "material-ui/List";

import FirebaseAuth from "../FirebaseAuth";

const styles = {
  list: {
    width: 250,
  },
};

class FiretowerDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    routes: PropTypes.object.isRequired,
  };

  render() {
    const {classes, open, onToggle, routes} = this.props;
    console.log("drawer", this.props);
    return (
      <FirebaseAuth>
        {auth => (
          <Drawer
            anchor="left"
            open={open}
            onClick={onToggle}
            onKeyDown={onToggle}
          >
            <div className={classes.list}>
              <List>
                {Object.keys(routes).map(key => {
                  const {
                    path,
                    display,
                    hideFromMenu,
                    isUserMenu,
                    requiresAdmin,
                    requiresAuth,
                    externalLink,
                    icon: Icon,
                  } = routes[key];
                  if (hideFromMenu || isUserMenu) {
                    return null;
                  }
                  if (
                    requiresAdmin &&
                    (!auth.details || !auth.details.isAdmin)
                  ) {
                    return null;
                  }
                  if (requiresAuth && !auth.user) {
                    return null;
                  }
                  const itemProps = externalLink
                    ? {button: true, component: "a", href: externalLink}
                    : {button: true, component: Link, to: path};
                  return (
                    <ListItem {...itemProps}>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={display} />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Drawer>
        )}
      </FirebaseAuth>
    );
  }
}

export default withStyles(styles)(FiretowerDrawer);
