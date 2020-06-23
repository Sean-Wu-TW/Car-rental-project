import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

import "./UserProfile.css";
import UserBio from "./UserBio";
import RentalInfo from "./RentalInfo";
import CarImage from "../../images/car.jpg";
import { Redirect } from 'react-router-dom';
import axios from "axios";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      userBio: {
        img:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        name: "name",
        email: "email@.com",
        driverLicense: "W123456",
        phoneNumber: "123-456-7890",
        membershipExpDate: "xx-xx-xxxx",
      },
      rentalInfo: {
        img: CarImage,
        name: "Mercedes Benz",
        carInfo: "Germany",
        expireDate: "xx-xx-xxxx",
      },
    };
  }

  async componentDidMount() {
    console.log("componentDidMount() called ")
    var token = localStorage.getItem('JWT_TOKEN');
    const res = axios.post('http://localhost:5000/users/myprofile', { "jwt_token": token }).then(function (res) {
      console.log(res);
      console.log(res.data.user.email);

      this.setState({
        userBio: {
          img:
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
          name: "name",
          email: res.data.user.email,
          driverLicense: res.data.user.driver_license.license_number,
          phoneNumber: "123-456-7890",
          membershipExpDate: res.data.user.membership.ends,
        },
        rentalInfo: {
          img: "https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/WCAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1492780399640.png",
          name: res.data.user.reservations[0].details.vehicle.basicInfo.make,
          carInfo: res.data.user.reservations[0].details.vehicle.basicInfo.model,
          expireDate: res.data.user.reservations[0].details.ends,

        },
      });
    }.bind(this));;

  }



  render() {
    return (
      <div className="container">
        <div className="team-single">
          <div className="row">
            <UserBio params={this.state.userBio} />
            <div className="col-lg-8 col-md-7">
              <RentalInfo params={this.state.rentalInfo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(null, actions)(UserProfile);