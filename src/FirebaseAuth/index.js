import React, {Component} from "react";
import {Subscriber} from "react-broadcast";

import {PROVIDER_NAME} from "./provider";

export default class FirebaseAuth extends Component {
  render() {
    return (
      <Subscriber channel={PROVIDER_NAME}>{this.props.children}</Subscriber>
    );
  }
}
