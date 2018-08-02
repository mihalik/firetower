import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// For now, the loader has a built-in delay of 1s to prevent the flash of
// loading spinner that is super-distracting.  This might need to be
// configurable in the future.
const LOADER_DELAY = 1000;

export default class Loading extends React.Component {
  state = { isShowing: false };
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ isShowing: true });
    }, LOADER_DELAY);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { isShowing } = this.props;
    if (!isShowing) {
      return null;
    }
    return <CircularProgress />;
  }
}
