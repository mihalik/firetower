import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Auth from "../Auth";
import Loading from "../Loading";
import SignupDisplay from "./display";

const styles = theme => ({});

class SignupWrap extends Component {
  render() {
    return <Auth>{auth => <Signup {...auth} {...this.props} />}</Auth>;
  }
}

class Signup extends Component {
  static propTypes = {
    renderTerms: PropTypes.node.isRequired,
    nextPage: PropTypes.string.isRequired,
  };
  state = {};
  handleSubmit = values => {
    // Make sure everything is valid
    const errors = this.validate(values);
    if (Object.keys(errors).length) {
      return errors;
    }

    const { create, location } = this.props;
    const signup = new Date();
    const { email, password, password2, terms, ...profile } = values;
    profile.terms = signup.toISOString();
    profile.createdTime = signup.toISOString();
    profile.email = email;

    create(email, password, password, profile);
  };
  validate = values => {
    const errors = {};
    const requiredFields = ["password2", "fname", "lname"];
    requiredFields.forEach(key => {
      if (!values[key]) {
        errors[key] = "Required";
      }
    });

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password.length < 8) {
      errors.password = "Password must be 8 characters";
    }
    if (values.password !== values.password2) {
      errors.password2 = "Passwords must match";
    }
    if (!values.terms) {
      errors.terms = "You must agree to the terms and conditions";
    }
    return errors;
  };
  render() {
    const { classes, error, hasResolved, user, renderTerms, nextPage } = this.props;
    // Handle looking for user
    if (!hasResolved) {
      return <Loading />;
    }
    // Handle user already exists (either already logged in or just created)
    if (user) {
      return <Redirect to={nextPage} />;
    }

    const initialValues = {
      lname: "",
      fname: "",
      email: "",
      password: "",
      password2: "",
      terms: false,
    };
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validate={this.validate}
        validateOnChange={false}
      >
        {formData => (
          <SignupDisplay nextPage={nextPage} renderTerms={renderTerms} formData={formData} />
        )}
      </Formik>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SignupWrap);
