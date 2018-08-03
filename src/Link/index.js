import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
  return {
    link: {
      ...theme.typography.body1,
      color: theme.palette.primary.main,
    },
  };
};

class FiretowerLink extends React.Component {
  render() {
    const { classes, theme, ...props } = this.props;
    const Component = this.props.as || Link;
    return <Component className={classes.link} {...props} />;
  }
}

export default withStyles(styles, { withTheme: true })(FiretowerLink);
