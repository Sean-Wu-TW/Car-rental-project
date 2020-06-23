import React, { Component } from "react";
import styled from "styled-components";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons";

import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import CustomInput from "./CustomInput";
import * as actions from "../actions";

const Styles = styled.div`
  ._signin {
    width: 100%;
    max-width: 330px;
    margin: auto;
    height: 100%;
    padding: 1em;
    box-shadow: 2px 3px 3px lightwhite;
  }
`;

const required = (value) => (value ? undefined : "Required");
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const password = (value) =>
  value && !/^[A-Za-z]\w{7,14}$/i.test(value) ? "Invalid password" : undefined;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // handleSubmit(this.onSubmit)
  async onSubmit(formData) {
    console.log("onSubmit() got called");
    console.log("formData", formData);

    await this.props.signIn(formData);

    if (!this.props.errorMessage) {
      this.props.history.push("/");
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Styles>
        <div className="_signin">
          <form className="login-form" onSubmit={handleSubmit(this.onSubmit)}>
            <h1 className="text-center">
              <span className="font-weight-bold">Codeman</span>
            </h1>
            <h3 className="text-center">Sign In</h3>
            <div class="form-group">
              <fieldset>
                <Field
                  name="email"
                  type="text"
                  id="email"
                  label="Email"
                  placeholder="example@example.com"
                  component={CustomInput}
                />
              </fieldset>
            </div>

            <div class="form-group">
              <fieldset>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="yoursuperpassword"
                  component={CustomInput}
                />
              </fieldset>
            </div>
            {this.props.errorMessage ?
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div> : null}

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="text-center pt-3">
              Or continue with your social account
            </p>
            <FacebookLoginButton className="mt-3 mb-3" />
            <GoogleLoginButton className="mt-3 mb-3" />
            <LinkedInLoginButton className="mt-3 mb-3" />

            <div className="text-center">
              <a href="/signup">Sign up</a>
              <span className="p-2">|</span>
              <a href="/staff">Login as Staff</a>
            </div>
          </form>
        </div>
      </Styles>
    );
  }
}


function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(SignIn);
