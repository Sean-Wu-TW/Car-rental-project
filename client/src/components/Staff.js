import React, { Component } from 'react';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CustomInput from './CustomInput';
import * as  actions from '../actions';
import { bindActionCreators } from "redux";
import { getadminaccount } from "../actions";

const Styles = styled.div`

    .staff_login {
        width: 100%;
        max-width:330px;
        margin:auto;
        height:580px;
        padding:1em;  
        margin-top: 30px;
    }`


class Staff extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(formData) {
        console.log('onSubmit() got called')
        console.log('formData', formData)
        await this.props.adminLogin(formData)
    }



    render() {
        const { handleSubmit } = this.props;

        return (
            <Styles>
                <div className="staff_login" >
                    <form className="staff-login-form" onSubmit={handleSubmit(this.onSubmit)}>
                        <h3 className="text-center m-3">Codeman staff login</h3>
                        <div className="form-group">
                            <fieldset>
                                <Field
                                    name="email"
                                    type="text"
                                    id="email"
                                    label="Admin Email"
                                    placeholder="example@example.com"
                                    component={CustomInput}
                                />
                            </fieldset>
                        </div>
                        <div className="form-group">
                            <fieldset>
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    label="Admin Password"
                                    placeholder="youradminpassword"
                                    component={CustomInput}
                                />
                            </fieldset>
                        </div>
                        {this.props.errorMessage ?
                            <div className="alert alert-danger">
                                {this.props.errorMessage}
                            </div> : null}
                        <button type="submit" className="btn btn-primary btn-lg ">Login</button>
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
    reduxForm({ form: 'staff' })
)(Staff)

