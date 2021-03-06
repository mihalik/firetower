import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card, { CardContent, CardActions, CardMedia } from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import Input, { InputAdornment } from "@material-ui/core/Input";

const styles = theme => ({
  card: {
    marginTop: 100,
    minWidth: 300,
  },
  media: {
    backgroundColor: theme.palette.primary.dark,
    height: 20,
  },
  adornment: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing.unit,
  },
  adornmentIcon: { paddingTop: 6 },
});

class PasswordResetDisplay extends Component {
  static propTypes = {
    error: PropTypes.string,
    message: PropTypes.string,
    email: PropTypes.string.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onEmailInput: PropTypes.func.isRequired,
  };
  render() {
    const { classes, error, message, email, onFormSubmit, onEmailInput } = this.props;
    return (
      <form onSubmit={onFormSubmit}>
        <Card className={classes.card}>
          <CardMedia className={classes.media} />
          <CardContent>
            {!!error && <Typography>{error}</Typography>}
            {!!message && <Typography>{message}</Typography>}
            {!error &&
              !message && (
                <Typography variant="caption">Enter your email to reset your password.</Typography>
              )}
            <div>
              <Grid item>
                <Input
                  id="email"
                  placeholder="email"
                  value={email}
                  onInput={onEmailInput}
                  startAdornment={
                    <InputAdornment position="start" className={classes.adornment}>
                      <EmailIcon className={classes.adornmentIcon} />
                    </InputAdornment>
                  }
                />
              </Grid>
            </div>
          </CardContent>
          <CardActions>
            <Button type="submit">Reset password</Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PasswordResetDisplay);
