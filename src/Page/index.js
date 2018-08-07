import React from "react";
import PropTypes from "prop-types";
import { Subscriber } from "react-broadcast";
import { TopAppBar, TopAppBarSection, TopAppBarRow, TopAppBarNavigationIcon } from "rmwc/TopAppBar";
import { IconButton } from "rmwc/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { PROVIDER_NAME } from "./provider";
import UserMenu from "../UserMenu";
import FiretowerUIDrawer from "../FiretowerUIDrawer";

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
    const { children, routes, renderPageTitle, hidePageChrome, match, history } = this.props;
    return (
      <div style={styles.root}>
        <FiretowerUIDrawer routes={routes} open={drawerOpen} onToggle={this.handleDrawerToggle} />
        {!hidePageChrome && (
          <TopAppBar position="static" style={styles.appBar}>
            <TopAppBarRow>
              <TopAppBarSection alignStart>
                <IconButton
                  style={styles.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
                <div style={styles.flex}>{renderPageTitle()}</div>
              </TopAppBarSection>
              <TopAppBarSection alignEnd>
                <UserMenu routes={routes} />
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
        )}
        <div style={styles.content}>
          {typeof children === "function" ? children({ match, history, routes }) : children}
        </div>
      </div>
    );
  }
}

export default class FiretowerPage extends React.Component {
  render() {
    return (
      <Subscriber channel={PROVIDER_NAME}>
        {value => <FiretowerPageInner {...value} {...this.props} />}
      </Subscriber>
    );
  }
}
