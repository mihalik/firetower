import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Drawer } from "rmwc/Drawer";
import { List, ListItem, ListItemText, ListItemGraphic } from "rmwc/List";

import Auth from "../Auth";

const styles = {
  list: {
    width: 250,
  },
};

export default class FiretowerDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    routes: PropTypes.object.isRequired,
  };

  render() {
    const { open, onToggle, routes } = this.props;
    return (
      <Auth>
        {auth => (
          <Drawer anchor="left" open={open} onClick={onToggle} onKeyDown={onToggle}>
            <div style={styles.list}>
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
                  if (requiresAdmin && (!auth.details || !auth.details.isAdmin)) {
                    return null;
                  }
                  if (requiresAuth && !auth.user) {
                    return null;
                  }
                  const itemProps = externalLink
                    ? { button: true, component: "a", href: externalLink }
                    : { button: true, component: Link, to: path };
                  return (
                    <ListItem key={key} {...itemProps}>
                      <ListItemGraphic>
                        <Icon />
                      </ListItemGraphic>
                      <ListItemText primary={display} />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Drawer>
        )}
      </Auth>
    );
  }
}
