import React from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";

const SNACKBAR_DELAY = 3000;

export default class FiretowerSnackbar extends React.Component {
  static propTypes = {
    message: PropTypes.node.isRequired,
  };
  state = {isOpen: true};

  componentDidMount() {
    this.blah = setTimeout(() => {
      this.setState({isOpen: false});
    }, SNACKBAR_DELAY);
  }

  componentWillUnmount() {
    clearTimeout(this.blah);
  }

  handleClose = () => {
    this.setState({isOpen: false});
  };

  render() {
    const {message} = this.props;
    const {isOpen} = this.state;
    return (
      <Snackbar
        message={message}
        open={isOpen}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      />
    );
  }
}
