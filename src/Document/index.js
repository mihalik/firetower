import React, { Component } from "react";
import PropTypes from "prop-types";
import { FirestoreDocument } from "react-firestore";

import Loading from "../Loading";

export default class Document extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    renderLoading: PropTypes.node,
  };
  render() {
    const { children, renderLoading, ...props } = this.props;
    return (
      <FirestoreDocument
        {...props}
        render={({ isLoading, data }) => {
          return isLoading ? renderLoading || <Loading /> : children(data);
        }}
      />
    );
  }
}
