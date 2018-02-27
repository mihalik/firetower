import React, {Component} from "react";
import Typography from "material-ui/Typography";
import {Page} from "firetower";

export default class Notes extends Component {
  render() {
    return (
      <Page>
        <Typography type="display1" gutterBottom>
          Notes
        </Typography>
        <Typography type="body1" gutterBottom>
          Notes page goes here.
        </Typography>
      </Page>
    );
  }
}
