import React, { Component } from "react";
import { FirestoreDocument } from "react-firestore";

import FirebaseAuth from "./FirebaseAuth";

export default class IsAdmin extends Component {
  render() {
    const { children } = this.props;
    // TODO: Probably should update how we handle setting someone as an admin
    return (
      <div>
        <FirebaseAuth>
          {auth => (
            <FirestoreDocument
              path={`admins/${auth.user.uid}`}
              render={({ data }) => (data ? children : null)}
            />
          )}
        </FirebaseAuth>
      </div>
    );
  }
}
