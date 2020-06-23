import React, { Component } from "react";
import styled from "styled-components";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons";
import CustomInput from "./CustomInput";
import * as actions from "../actions";

const Styles = styled.div`
  ._signup {
    width: 100%;
    max-width: 730px;
    margin: auto;
    height: 100%;
    padding: 1em;
  }
`;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(formData) {
    await this.props.signUp(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/");
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Styles>
        <div className="_signup">
          <h1 className="text-center">
            <span className="font-weight-bold">Codeman</span>
          </h1>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="form-row">
              <div class="form-group col-md-6">
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

              <div class="form-group col-md-6">
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

              <div class="form-group col-md-6">
                <fieldset>
                  <Field
                    name="firstname"
                    type="text"
                    id="firstname"
                    label="First Name"
                    placeholder="John"
                    component={CustomInput}
                  />
                </fieldset>
              </div>
              <div class="form-group col-md-6">
                <fieldset>
                  <Field
                    name="lastname"
                    type="text"
                    id="lastname"
                    label="Last Name"
                    placeholder="John"
                    component={CustomInput}
                  />
                </fieldset>
              </div>
            </div>

            <div class="form-group">
              <fieldset>
                <Field
                  name="resaddre"
                  type="text"
                  id="resaddre"
                  label="Residence Address"
                  placeholder="110 Collorado Dr"
                  component={CustomInput}
                />
              </fieldset>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <fieldset>
                  <Field
                    name="city"
                    type="text"
                    id="city"
                    label="City"
                    component={CustomInput}
                  />
                </fieldset>
              </div>

              <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <fieldset>
                  <Field
                    name="license_state"
                    class="form-control"
                    id="license_state"
                    component="select"
                  >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </Field>
                </fieldset>
              </div>

              <div class="form-group col-md-2">
                <fieldset>
                  <Field
                    name="zip"
                    type="text"
                    id="zip"
                    label="Zip"
                    component={CustomInput}
                  />
                </fieldset>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-4">
                <fieldset>
                  <Field
                    name="license_number"
                    type="text"
                    id="license_number"
                    label="Drive License Number "
                    placeholder="yourdls0102z"
                    component={CustomInput}
                  />
                </fieldset>
              </div>

              <div class="form-group col-md-4">
                <fieldset>
                  <Field
                    name="card_number"
                    type="text"
                    id="card_number"
                    label="Credit Card Number "
                    placeholder="44112033012"
                    component={CustomInput}
                  />
                </fieldset>
              </div>
              <div class="form-group col-md-4">
                <fieldset>
                  <Field
                    name="card_holder"
                    type="text"
                    id="card_holder"
                    label="Holder name"
                    placeholder="FirstName LastName"
                    component={CustomInput}
                  />
                </fieldset>
              </div>
            </div>

            {this.props.errorMessage ? (
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <div className="text-center">
              <a href="/signin">Login in</a>
              <span className="p-2">|</span>
              <a href="./forgetpassword.js">Do have account with us?</a>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <FacebookLoginButton />
              </div>
              <div class="form-group col-md-4">
                <GoogleLoginButton />
              </div>
              <div class="form-group col-md-4">
                <LinkedInLoginButton />
              </div>
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
  reduxForm({ form: "signup" })
)(SignUp);
