import React, {Component} from "react";
import PropTypes from "prop-types";
import {Formik} from "formik";
import {Redirect} from "react-router-dom";
import {withStyles} from "material-ui/styles";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import Card, {CardContent} from "material-ui/Card";
import Radio, {RadioGroup} from "material-ui/Radio";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "material-ui/Dialog";
import {
  FormGroup,
  FormLabel,
  FormHelperText,
  FormControl,
  FormControlLabel,
} from "material-ui/Form";
import queryString from "query-string";

import Link from "../Link";
import Loading from "../Loading";
import Page from "../Page";

const styles = theme => ({
  logo: {width: 300, padding: theme.spacing.unit * 4},
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
    const {classes, error, formData} = this.props;
    const {
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur,
    } = formData;

    return (
      <Page>
        {pageProps => (
          <div>
            <Typography variant="display1" align="center">
              Create account
            </Typography>
            <Typography variant="caption" gutterBottom align="center">
              Already have an account?{" "}
              <Link to={pageProps.routes.login}>Login</Link>
            </Typography>
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
                    value={values.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    required
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    name="phone"
                    label="Phone Number"
                    margin="normal"
                    fullWidth
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl
                    component="fieldset"
                    required
                    className={classes.gender}
                    error={touched.gender && !!errors.gender}
                  >
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      row
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormHelperText>
                        {touched.gender && errors.gender}
                      </FormHelperText>
                    </RadioGroup>
                  </FormControl>
                  <BirthdayPicker
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    day={values.day}
                    month={values.month}
                    year={values.year}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    variant="raised"
                    color="secondary"
                    className={classes.create}
                  >
                    Create Account
                  </Button>
                  {!!renderTerms && renderTerms}
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </Page>
    );
  }
}

export default withStyles(styles, {withTheme: true})(SignupDisplay);
