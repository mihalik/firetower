import React, { Component } from "react";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import Card, { CardContent } from "material-ui/Card";
import Radio, { RadioGroup } from "material-ui/Radio";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import {
  FormGroup,
  FormLabel,
  FormHelperText,
  FormControl,
  FormControlLabel
} from "material-ui/Form";
import queryString from "query-string";

import { NAV } from "../Routes";
import config from "../config";
import FirebaseAuth from "../shared/components/FirebaseAuth";
import NewSubscription from "../shared/components/NewSubscription";
import Link from "../shared/components/Link";
import Loading from "../shared/components/Loading";

const styles = theme => ({
  logo: { width: 300, padding: theme.spacing.unit * 4 },
  card: {
    maxWidth: 366,
    margin: "0 auto"
  },
  gender: {
    marginTop: "1.5rem"
  },
  create: {
    margin: "1.5rem 0"
  }
});

class SignupDisplay extends Component {
  static propTypes = {
    error: PropTypes.string,
    formData: PropTypes.object.isRequired
  };
  render() {
    const { classes, error, formData } = this.props;
    const {
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur
    } = formData;

    const hipaaLabel = (
      <span>
        I have read and agree to the{" "}
        <Link
          as="a"
          href="https://wellbody.bio/hipaa-privacy-authorization"
          target="_blank"
        >
          HIPAA Privacy Authorization
        </Link>
      </span>
    );
    return (
      <div>
        <Typography variant="display1" align="center">
          Create account
        </Typography>
        <Typography variant="caption" gutterBottom align="center">
          Already have an account? <Link to={NAV.login}>Login</Link>
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
              <FormGroup required style={{ marginTop: "1rem" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms"
                      value="hipaa"
                      checked={values.terms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                  label={hipaaLabel}
                />
                <FormHelperText error={true}>
                  {touched.terms && errors.terms}
                  {error && error.message}
                </FormHelperText>
              </FormGroup>
              <Button
                type="submit"
                variant="raised"
                color="secondary"
                className={classes.create}
              >
                Create Account
              </Button>
              <Typography variant="caption">
                By signing up you agree to the Wellbody{" "}
                <Link as="a" href="https://wellbody.bio/terms" target="_blank">
                  terms of service.
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SignupDisplay);
