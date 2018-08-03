import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card, { CardContent } from "@material-ui/core/Card";

const styles = theme => ({
  logo: { width: 300, padding: theme.spacing.unit * 4 },
  card: {
    maxWidth: 366,
    margin: "0 auto",
  },
  gender: {
    marginTop: "1.5rem",
  },
  create: {
    margin: "1.5rem 0",
  },
});

class SignupDisplay extends Component {
  static propTypes = {
    error: PropTypes.string,
    formData: PropTypes.object.isRequired,
    renderTerms: PropTypes.func.isRequired,
  };
  render() {
    const { classes, error, formData, renderTerms } = this.props;
    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = formData;

    return (
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              name="email"
              label="Email"
              margin="normal"
              fullWidth
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              validate={value => {
                console.log(value);
                return null;
              }}
            />
            <TextField
              required
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              name="password"
              type="password"
              label="Password (at least 8 characters)"
              margin="normal"
              fullWidth
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              required
              error={touched.password2 && !!errors.password2}
              helperText={touched.password2 && errors.password2}
              name="password2"
              type="password"
              label="Password (repeat)"
              margin="normal"
              fullWidth
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              required
              error={touched.fname && !!errors.fname}
              helperText={touched.fname && errors.fname}
              name="fname"
              label="First Name"
              margin="normal"
              fullWidth
              value={values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              required
              error={touched.lname && !!errors.lname}
              helperText={touched.lname && errors.lname}
              name="lname"
              label="Last Name"
              margin="normal"
              fullWidth
              value={values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit" variant="raised" color="secondary" className={classes.create}>
              Create Account
            </Button>
            {!!renderTerms && renderTerms}
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SignupDisplay);
