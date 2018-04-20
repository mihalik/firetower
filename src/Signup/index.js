import React, {Component} from "react";
import {Formik} from "formik";
import {Redirect} from "react-router-dom";
import {withStyles} from "material-ui/styles";

import Auth from "../Auth";
import SignupDisplay from "./display";

const styles = theme => ({});

class SignupWrap extends Component {
  render() {
    return <Auth>{auth => <Signup {...auth} {...this.props} />}</Auth>;
  }
}

class Signup extends Component {
  state = {};
  handleSubmit = values => {
    // Make sure everything is valid
    const errors = this.validate(values);
    console.log("Errors", errors);
    if (Object.keys(errors).length) {
      return errors;
    }

    const {create, location} = this.props;
    const signup = new Date();
    const {
      email,
      password,
      password2,
      day,
      month,
      year,
      terms,
      ...profile
    } = values;
    profile.terms = signup.toISOString();
    profile.createdTime = signup.toISOString();
    profile.email = email;
    profile.birthday = `${year}-${month}-${day}`;
    // Get plans and coupons from the URL
    const qs = queryString.parse(location.search);
    profile.initialPlan = qs.plan || "";
    profile.coupon = qs.coupon || "";

    create(email, password, password, profile);
  };
  validate = values => {
    const errors = {};
    const requiredFields = [
      "password2",
      "fname",
      "lname",
      "phone",
      "day",
      "month",
      "year",
      "gender",
    ];
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
    const {classes, error, hasResolved, user, plan} = this.props;
    console.log(this.props);
    if (!hasResolved) {
      return <Loading />;
    }

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
    const initialValues = {
      lname: "",
      fname: "",
      email: "",
      password: "",
      password2: "",
      phone: "",
      day: "1",
      month: "1",
      year: "1980",
      gender: null,
      terms: false,
    };
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validate={this.validate}
        validateOnChange={false}
      >
        {formData => <SignupDisplay {...formData} />}
      </Formik>
    );
  }
}

export default withStyles(styles, {withTheme: true})(SignupWrap);
