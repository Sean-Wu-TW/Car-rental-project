import React, { Component } from "react";
import {
  Button,
  Container,
  FormControl,
  Image,
  InputGroup,
  Jumbotron,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import MainPageBackground from "../images/mainB.jpg";

//Styling
import "./Home.css";



export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      endTime: "",
      endTimeIsPristine: true,
      pickUpLocation: "",
      pickUpLocationIsPristine: true,
      startTime: "",
      startTimeIsPristine: true,
      VehicleType: "",
      VehicleTypeIsPristine:true
    };
  }

  onEndTimeChange(event) {
    this.setState({
      endTime: event.currentTarget.value,
      endTimeIsPristine: false,
    });
  }

  onPickUpLocationChange(event) {
    this.setState({
      pickUpLocation: event.currentTarget.value,
      pickUpLocationIsPristine: false,
    });
  }

  onVehicleTypeChange(event) {
    this.setState({
      VehicleType: event.currentTarget.value,
      VehicleTypeIsPristine: false,
    });
  }

  onStartTimeChange(event) {
    this.setState({
      startTime: event.currentTarget.value,
      startTimeIsPristine: false,
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { endTime, pickUpLocation, startTime, VehicleType } = this.state;

    return (
      <div>       
        <Jumbotron fluid>
          {/*
          <Image
            fluid
            className="background-image"
            src={MainPageBackground}
          ></Image>
          */}
          <Container>
            <h1>Way better than a rental car</h1>
            <p>Book unforgettable cars from trusted hosts around the world</p>
            <InputGroup className="mb-3">
              {/* <Form.Control
                                type="text"
                                value={this.state.projectName}
                                placeholder="Project Name"
                                onBlur={this.onProjectNameBlur.bind(this)}
                                onChange={this.onProjectNameChange.bind(this)}
                                isValid={this.validateProjectName() === 'success'}
                                isInvalid={this.validateProjectName() === 'error'}
                            /> */}
              <FormControl
                value={pickUpLocation}
                placeholder="Pick Up Location"
                aria-label="Pick Up Location"
                aria-describedby="basic-addon2"
                onChange={this.onPickUpLocationChange.bind(this)}
              />
              <FormControl
                value={VehicleType}
                placeholder="Vehicle Type"
                aria-label="Vehicle Type"
                aria-describedby="basic-addon2"
                onChange={this.onVehicleTypeChange.bind(this)}
              />
              <InputGroup.Append>
                <LinkContainer
                  to={`/rental-list?pickup=${pickUpLocation}&VehicleType=${VehicleType}`}
                >
                  <Button onClick={this.onSearchClick}>Search</Button>
                </LinkContainer>
              </InputGroup.Append>
            </InputGroup>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

