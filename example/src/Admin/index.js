import React, {Component} from "react";
import Typography from "material-ui/Typography";
import {Page} from "firetower";

export default class Admin extends Component {
  render() {
    return (
      <Page>
        <Typography type="display1" gutterBottom>
          Admin
        </Typography>
        <Typography type="body1" gutterBottom>
          Some admin stuff here
        </Typography>
      </Page>
    );
  }
}
