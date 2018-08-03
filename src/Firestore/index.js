import React, { Component } from "react";
import { Firestore } from "react-firestore";

// Maps render() to children().  Probably once this issue is finished
// https://github.com/green-arrow/react-firestore/issues/14
// then we won't have to do this anymore

export default class FiretowerFirestore extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <Firestore
        {...props}
        render={({ firestore }) => {
          return children(firestore);
        }}
      />
    );
  }
}
