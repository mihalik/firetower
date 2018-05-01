import React, {Component} from "react";
import PropTypes from "prop-types";
import {FirestoreCollection} from "react-firestore";

import Loading from "../Loading";

export default class Collection extends Component {
  static propTypes = {
    children: PropTypes.func,
    renderLoading: PropTypes.node,
  };
  render() {
    const {children, renderLoading, ...props} = this.props;
    return (
      <FirestoreCollection
        {...props}
        render={({isLoading, data}) => {
          return isLoading ? renderLoading || <Loading /> : children(data);
        }}
      />
    );
  }
}
