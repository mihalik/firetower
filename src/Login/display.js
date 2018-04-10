import React, {Component} from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {withStyles} from "material-ui/styles";
import Card, {CardContent, CardActions, CardMedia} from "material-ui/Card";
import Typography from "material-ui/Typography";
import Input, {InputAdornment} from "material-ui/Input";
import Grid from "material-ui/Grid";
import EmailIcon from "material-ui-icons/Email";
import LockIcon from "material-ui-icons/Lock";
import Button from "material-ui/Button";
import queryString from "query-string";

import FirebaseAuth from "../FirebaseAuth";
import TempMessage from "../TempMessage";

// The original design for this login page is kinda based on this:
// https://dribbble.com/shots/2089361-Login-page

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 4,
    width: 300,
    margin: "0 auto",
  },
  media: {
    backgroundColor: theme.palette.primary.dark,
    height: 20,
  },
  adornment: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing.unit,
  },
  adornmentIcon: {paddingTop: 6},
});

class LoginDisplay extends Component {
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
      classes,
    } = this.props;

    return (
      <form onSubmit={onFormSubmit}>
        <Card className={classes.card}>
          <CardMedia className={classes.media} />
          {errorMessage && <Typography>{errorMessage}</Typography>}
          <CardContent>
            <div>
              <Grid item>
                <Input
                  id="email"
                  placeholder="email"
                  value={email}
                  onInput={onEmailInput}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <EmailIcon className={classes.adornmentIcon} />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onInput={onPasswordInput}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.adornment}
                    >
                      <LockIcon className={classes.adornmentIcon} />
                    </InputAdornment>
                  }
                />
              </Grid>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="raised" color="secondary" type="submit">
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default withStyles(styles, {withTheme: true})(LoginDisplay);
