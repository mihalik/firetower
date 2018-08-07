import React from "react";
import { Link } from "react-router-dom";
import { Theme } from "rmwc/Theme";

export default class FiretowerLink extends React.Component {
  render() {
    const { ...props } = this.props;
    const Component = this.props.as || Link;
    return (
      <Theme use="primary">
        <Component {...props} />
      </Theme>
    );
  }
}
