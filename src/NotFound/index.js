import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import Page from "../Page";
import Link from "../Link";

export default class NotFound extends Component {
  render() {
    const { defaultPage } = this.props;
    return (
      <Page>
        <Typography type="display1" gutterBottom>
          Page not found
        </Typography>
        <Typography type="body1" gutterBottom>
          <Link to={defaultPage}>Return</Link>
        </Typography>
      </Page>
    );
  }
}
