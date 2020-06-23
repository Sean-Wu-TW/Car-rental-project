import React, { Component } from "react";
import "./Admin.css";
import axios from "axios";

export default class CarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleType: "sedan",
      model: "Mirage",
      make: "Mitsubishi",
      year: 2020,
      color: "white",
      mileage: 0,
      VIN: "0EV331",
      condition: "New",
      plate: "824R",
      img:
        "https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/ECAR.doi.200.high.imageSmallThreeQuarterNodePath.png/1492780366644.png",
      location: "san jose",
      price: 30,
      isRented: false,
      serviceRecords: null,
      startDate: "2020-01-01", //if set to null -> status 400(server rejects)
      endDate: "2020-01-01",
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
      .post(`${process.env.REACT_APP_API_ENDPOINT}/vehicles/add`, payload, {
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
            <div className="form-row" id="TMMC">
              <div className="col">
                <label>Vehicle Type</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="sedan..."
                  name="vehicleType"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>Model</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mirage..."
                  name="model"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>Make</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mitsubishi..."
                  name="make"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>Color</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="White..."
                  name="color"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row" id="MVP">
              <div className="col">
                <label>Mileage</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="0..."
                  name="mileage"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>VIN</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="0EV331..."
                  name="VIN"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>Plate</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="824R..."
                  name="plate"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row" id="IL">
              <div className="col">
                <label>Image</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/ECAR.doi.200.high.imageSmallThreeQuarterNodePath.png/1492780366644.png"
                  name="img"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="san jose..."
                  name="location"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label>Year</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="2020..."
                  name="year"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          {/* <div className="form-group">
                        <input type="text" className="form-control" id="Last Service Time" placeholder="yyyy-mm-dd" />
                    </div> */}

          <div className="form-group">
            <label>Set Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="30..."
              name="price"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Condition(New, Good, Bad)</label>
            <input
              type="text"
              className="form-control"
              id="condition"
              placeholder="New..."
              name="condition"
              onChange={this.handleInputChange}
            />
          </div>
          {/* <div className="from-row">
                        <label>Is this car registed?</label>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" />
                            <label className="custom-control-label" for="customRadioInline1">Registed</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" />
                            <label className="custom-control-label" for="customRadioInline2">Not registered</label>
                        </div>
                    </div> */}

          {/* <div className="form-group">
                        <select className="custom-select" onChange={this.onChange} value={this.state.condition} required>
                            <option value="0">Please select the car condition from the menu</option>
                            <option value="1">Good</option>
                            <option value="2">Needs Cleaning</option>
                            <option value="3">Needs Maintainence</option>
                        </select>
                    </div> */}

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Add Car
            </button>
          </div>
        </form>
      </div>
    );
  }
}
