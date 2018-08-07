import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardActions } from "rmwc/Card";
import { Typography } from "rmwc/Typography";
import { TextField } from "rmwc/TextField";
import { Grid } from "rmwc/Grid";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { Button } from "rmwc/Button";

// The original design for this login page is kinda based on this:
// https://dribbble.com/shots/2089361-Login-page

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 4,
    width: 300,
    margin: "0 auto",
  },
  cardTop: {
    backgroundColor: theme.palette.primary.dark,
    height: 20,
  },
  adornment: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing.unit,
  },
  adornmentIcon: { paddingTop: 6 },
});

export default class LoginDisplay extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onEmailInput: PropTypes.func.isRequired,
    onPasswordInput: PropTypes.func.isRequired,
  };

  render() {
    const {
      errorMessage,
      email,
      password,
      onFormSubmit,
      onEmailInput,
      onPasswordInput,
      isResetPassword,
      onToggleForgotClick,
    } = this.props;

    return (
      <form onSubmit={onFormSubmit}>
        <Card style={styles({}).card}>
          <div style={styles({}).cardTop} />
          {errorMessage && <Typography>{errorMessage}</Typography>}
          <CardContent>
            <div>
              <Grid item>
                <TextField
                  id="email"
                  placeholder="email"
                  value={email}
                  onInput={onEmailInput}
                  box
                  withLeadingIcon={<EmailIcon style={styles({}).adornmentIcon} />}
                />
              </Grid>
              {!isResetPassword && (
                <Grid item>
                  <TextField
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onInput={onPasswordInput}
                    box
                    withLeadingIcon={<LockIcon style={styles({}).adornmentIcon} />}
                  />
                </Grid>
              )}
            </div>
            <span onClick={onToggleForgotClick}>Forgot password?</span>
          </CardContent>
          <CardActions>
            <Button variant="raised" color="secondary" type="submit">
              {isResetPassword ? "Reset Password" : "Login"}
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}
