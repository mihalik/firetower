import React, { Component } from "react";
import PropTypes from "prop-types";
import { FirestoreDocument } from "react-firestore";

import Loading from "./Loading";
import Error from "./Error";

export default class Document extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    renderLoading: PropTypes.node
  };
  render() {
    const { render, renderLoading, ...props } = this.props;
    return (
      <FirestoreDocument
        {...props}
        render={({ isLoading, data }) => {
          return isLoading ? renderLoading || <Loading /> : render(data);
        }}
      />
    );
  }
}
