import React, {Component} from "react";
import PropTypes from "prop-types";

import Auth from "../Auth";
import Loading from "../Loading";

export default class Collection extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    renderLoading: PropTypes.node,
  };
  render() {
    const {children, renderLoading, ...props} = this.props;
    return (
      <Auth>
        {auth => {
          if (!auth.user) {
            return renderLoading || <Loading />;
          }
          return children(auth.user);
        }}
      </Auth>
    );
  }
}
