import React, { Component } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Vehicle = (props) => (
  <tr>
    <td>{props.vehicle.basicInfo.vehicleType}</td>
    <td>{props.vehicle.price}</td>
    <td>{props.vehicle.location}</td>
    <td>{props.vehicle.basicInfo.model}</td>
    <td>{props.vehicle.basicInfo.make}</td>
    <td>{props.vehicle.basicInfo.year}</td>
    <td>{props.vehicle.basicInfo.VIN}</td>
    <td>{props.vehicle.basicInfo.mileage}</td>
    <td>
      {props.vehicle.basicInfo.condition
        ? props.vehicle.basicInfo.condition
        : "Nothing yet..."}
    </td>
    <td>
      {props.vehicle.basicInfo.serviceRecords
        ? props.vehicle.basicInfo.serviceRecords
        : "Nothing yet..."}
    </td>
    <td>
      {props.vehicle.rentalStatus.isRented
        ? props.vehicle.rentalStatus.isRented.toString()
        : "false"}
    </td>
    <td>
      <Link
        to={
          "/admin/vehicles/edit/" +
          //`${process.env.REACT_APP_API_ENDPOINT}/vehicles/edit/`
          props.vehicle._id
        }
      >
        edit
      </Link>{" "}
      |{" "}
      <a
        href="/admin"
        onClick={() => {
          props.deleteVehicle(props.vehicle._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class carCard extends Component {
  constructor(props) {
    super(props);
    this.deleteVehicle = this.deleteVehicle.bind(this);
    this.state = { cars: [] };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/vehicles/`)
      .then((response) => {
        this.setState({ cars: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteVehicle(id) {
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}/vehicles/` + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      cars: this.state.cars.filter((el) => el._id !== id),
    });
  }
  carList() {
    return this.state.cars.map((currentcar) => {
      return (
        <Vehicle
          vehicle={currentcar}
          deleteVehicle={this.deleteVehicle}
          key={currentcar._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Current Vehicles</h3>
        <div className="container">
          {/* <Table responsive> */}
          <thead className="thead-light">
            <tr>
              <th>Type</th>
              <th>Price</th>
              <th>Location</th>
              <th>Model</th>
              <th>Make</th>
              <th>Year</th>
              <th>VIN</th>
              <th>Mileage</th>
              <th>Condition</th>
              <th>Service Record</th>
              <th>If Rented</th>
            </tr>
          </thead>
          {/* </Table> */}
          <tbody>{this.carList()}</tbody>
        </div>
      </div>
    );
  }
}
