import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { bookRental } from "../../actions";

// Styling
import "./CarDetail.css";

function mapStateToProps(state) {
  return {
    authToken: state.auth.token,
    rentals: state.rentals.rentals,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      bookRental: bookRental,
    },
    dispatch
  );
}

class CarDetail extends Component {
  constructor() {
    super();

    // const defaultDetail = {
    //   basicInfo: {
    //     vehicleType: "SUV",
    //     model: "Accord",
    //     make: "Honda",
    //     year: 2018,
    //     color: "Grey",
    //     mileage: 12565,
    //     VIN: "DDO9D8D6YI38ED0",
    //     condition: "Bad",
    //     serviceRecords: [],
    //     img: "https://www.autoblog.com/img/research/styles/photos/suv.jpg",
    //     plate: "AAFFF",
    //   },
    //   rentalStatus: {
    //     isRented: false,
    //     startDate: "2014-01-01T23:28:56.782Z",
    //     endDate: "2014-01-01T23:28:56.782Z",
    //   },
    //   _id: "5eab409ce211ed2c5c60f699",
    //   price: 33,
    //   createdAt: "2020-04-30T21:18:20.771Z",
    //   updatedAt: "2020-04-30T21:18:20.771Z",
    //   __v: 0,
    // };

    this.state = {
      pickupLocation: "",
      pickupYear: "Year",
      pickupMonth: "Month",
      pickupDate: "Date",
      pickupHour: "Hour",
      rentalLength: "",
      vehicle: null,
    };
  }

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/vehicles/${this.props.match.params.id}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          vehicle: res,
        });
      });
  }

  onPickupLocationChange(event) {
    this.setState({
      pickupLocation: event.currentTarget.value,
    });
  }

  onRentalLengthChange(event) {
    this.setState({
      rentalLength: event.currentTarget.value,
    });
  }

  onSelectDropdown(stateKey, eventKey) {
    this.setState({ [stateKey]: eventKey });
  }

  onBookNowClick() {
    const {
      pickupLocation,
      pickupYear,
      pickupMonth,
      pickupDate,
      pickupHour,
      rentalLength,
      vehicle,
    } = this.state;

    this.props.bookRental(
      this.props.authToken,
      vehicle._id,
      pickupLocation,
      pickupYear,
      pickupMonth,
      pickupDate,
      pickupHour,
      rentalLength
    );
  }

  render() {
    const {
      pickupLocation,
      pickupYear,
      pickupMonth,
      pickupDate,
      pickupHour,
      rentalLength,
      vehicle,
    } = this.state;

    if (!vehicle) {
      return (
        <Container fluid className="mb-4">
          <h2>Car Details</h2>
          <div>
            <Spinner
              animation="border"
              role="status"
              className="mr-4"
            ></Spinner>
            <span>Loading vehicle information...</span>
          </div>
        </Container>
      );
    }

    return (
      <Container fluid className="mb-4">
        <h2>Car Details</h2>
        <Row>
          <Col lg={12}>
            <Card className="mt-4">
              <Card.Img
                variant="top"
                className="img-fluid rental-car-image"
                src={vehicle.basicInfo.img}
              />
              <Card.Body>
                <Card.Title>{`${vehicle.basicInfo.year} ${vehicle.basicInfo.make} ${vehicle.basicInfo.model}`}</Card.Title>

                <Row>
                  <Col>
                    <Card.Text>
                      <p>Color: {vehicle.basicInfo.color}</p>
                      <p>Mileage: {vehicle.basicInfo.mileage}</p>
                      <p>VIN: {vehicle.basicInfo.VIN}</p>
                      <p>Condition: {vehicle.basicInfo.condition}</p>
                      <p>Plate: {vehicle.basicInfo.plate}</p>
                    </Card.Text>
                  </Col>
                  <Col>
                    <h4>${vehicle.price}/hr</h4>
                    <Form>
                      <Form.Control
                        value={pickupLocation}
                        placeholder="Pickup Location"
                        aria-label="Pickup Location"
                        aria-describedby="basic-addon2"
                        onChange={this.onPickupLocationChange.bind(this)}
                      />
                      <br />
                      Pickup Time
                      <ButtonGroup>
                        <DropdownButton
                          variant="outline-secondary"
                          title={pickupYear}
                          id={"input-group-dropdown-year"}
                          onSelect={this.onSelectDropdown.bind(
                            this,
                            "pickupYear"
                          )}
                        >
                          <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                          <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
                          <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                          variant="outline-secondary"
                          title={pickupMonth}
                          id={"input-group-dropdown-month"}
                          onSelect={this.onSelectDropdown.bind(
                            this,
                            "pickupMonth"
                          )}
                        >
                          {[...Array(12).keys()].map((x) => (
                            <Dropdown.Item eventKey={x + 1}>
                              {x + 1}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                        <DropdownButton
                          variant="outline-secondary"
                          title={pickupDate}
                          id={"input-group-dropdown-date"}
                          onSelect={this.onSelectDropdown.bind(
                            this,
                            "pickupDate"
                          )}
                        >
                          {[...Array(30).keys()].map((x) => (
                            <Dropdown.Item eventKey={x + 1}>
                              {x + 1}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                        <DropdownButton
                          variant="outline-secondary"
                          title={pickupHour}
                          id={"input-group-dropdown-hour"}
                          onSelect={this.onSelectDropdown.bind(
                            this,
                            "pickupHour"
                          )}
                        >
                          {[...Array(24).keys()].map((x) => (
                            <Dropdown.Item eventKey={x}>{x}</Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </ButtonGroup>
                      <br />
                      <Form.Control
                        value={rentalLength}
                        placeholder="Rental Length (hrs)"
                        aria-label="Rental Length"
                        aria-describedby="basic-addon2"
                        onChange={this.onRentalLengthChange.bind(this)}
                      />
                    </Form>

                    <br />

                    <Button
                      onClick={this.onBookNowClick.bind(this)}
                      disabled={vehicle.rentalStatus.isRented}
                    >
                      Book Now
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <div className="card card-outline-secondary my-4">
              <div className="card-header">Product Reviews</div>
              <div className="card-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/17
                </small>
                <hr></hr>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/17
                </small>
                <hr></hr>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/17
                </small>
                <hr></hr>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail);
