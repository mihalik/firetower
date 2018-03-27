import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";

const styles = theme => {
  return {
    link: {
      color: theme.palette.primary.main
    }
  };
};

class FiretowerLink extends React.Component {
  render() {
    const { classes, ...props } = this.props;
    const Component = this.props.as || Link;
    return <Component className={classes.link} {...props} />;
  }
}

export default withStyles(styles, { withTheme: true })(FiretowerLink);
