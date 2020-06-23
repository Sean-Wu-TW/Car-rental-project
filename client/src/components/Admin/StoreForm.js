import React, { Component } from "react";
import "./Admin.css";
import axios from "axios";

export default class StoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "San Jose",
      street: "street",
      city: "city",
      state: "CA",
      zip: 12345,
      vehicleCapacity: 10,
      currentVehicles: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target ? target.value : this.state.target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const payload = this.state;
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/stores/add`, payload, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        console.log(payload);
      });
  }

  render() {
    return (
      <div>
        <form id="adminForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Store Name</label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="San Jose Store"
              name="storeName"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <div className="form-row" id="TMMC">
              <div className="col">
                <label>Store Address Street</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1 N st"
                  name="street"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="San Jose"
                  name="city"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="CA"
                  name="state"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="95054"
                  name="zip"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Vehicle Capacity</label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="10"
              name="vehicleCapacity"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Add Store
            </button>
          </div>
        </form>
      </div>
    );
  }
}
