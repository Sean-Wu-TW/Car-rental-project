import React, { Component } from "react";

export default class UserBio extends Component {
    constructor() {
        super();
    }

    buttonCallback() {
        alert("You have successfully canceled your membership.")
    }
    render() {
        return (
            <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                <div className="team-single-img">
                    <img src={this.props.params.img} alt="" />
                </div>
                <div className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">                 
                    <h4 className="margin-10px-bottom font-size24 md-font-size22 sm-font-size20 font-weight-600">{this.props.params.name}</h4>
                    <p className="sm-width-95 sm-margin-auto"><strong>Driver License Number: </strong>{this.props.params.driverLicense}</p>
                    <p className="sm-width-95 sm-margin-auto"><strong>Email:</strong> {this.props.params.email}</p>
                    <p className="sm-width-95 sm-margin-auto"><strong>Phone Number:</strong> {this.props.params.phoneNumber}</p>
                    <p className="sm-width-95 sm-margin-auto"><strong>Membership Expiration Date:</strong><br></br>{this.props.params.membershipExpDate}</p>
                    <button type="button" className="btn btn-outline-primary" onClick = {this.buttonCallback}>Cancel Membership</button>

                </div>
            </div>
        );
    }
}
