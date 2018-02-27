import React, {Component} from "react";
import {Broadcast} from "react-broadcast";
export const PROVIDER_NAME = "FiretowerPage";

export default class FiretowerPageProvider extends Component {
  render() {
    return (
      <Broadcast channel={PROVIDER_NAME} value={this.props}>
        {this.props.children}
      </Broadcast>
    );
  }
}
