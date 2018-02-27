import React, {Component} from "react";
import Typography from "material-ui/Typography";
import {Page} from "firetower";

export default class UserProfile extends Component {
  render() {
    return (
      <Page>
        <Typography type="display1" gutterBottom>
          User profile
        </Typography>
        <Typography type="body1" gutterBottom>
          User profile information goes here.
        </Typography>
      </Page>
    );
  }
}
