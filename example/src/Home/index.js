import React, {Component} from "react";
import Typography from "material-ui/Typography";
import {Page} from "firetower";

export default class Home extends Component {
  render() {
    return (
      <Page>
        <Typography type="display1" gutterBottom>
          Firetower example application.
        </Typography>
        <Typography type="body1" gutterBottom>
          This is an example application build using Firetower.
        </Typography>
      </Page>
    );
  }
}
