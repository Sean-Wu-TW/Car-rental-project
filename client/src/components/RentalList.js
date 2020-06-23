import React, { Component } from "react";
import queryString from "query-string";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getAvailableRentals } from "../actions";
import CarImage from "../images/car.jpg";

//Styling
import "./RentalList.css";

import { cars } from "./cardata";
import { useHistory } from "react-router-dom";

const DefaultCarImage = "http://placehold.it/900x400";

function mapStateToProps(state) {
  console.log(state);
  return {
    rentals: state.rentals.rentals,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAvailableRentals: getAvailableRentals,
    },
    dispatch
  );
}
class RentalList extends Component {
  constructor(props) {
    super(props);

    const queryParams = queryString.parse(props.location.search);
    this.props.getAvailableRentals(queryParams);
  }

  routeChange = () => {
    let path = "/";
    this.props.history.push(path);
  };

  render() {
    const { rentals } = this.props;

    if (rentals.length == 0) {
      return (
        <Container fluid className="mb-4">
          <div>No rentals found</div>
        </Container>
      );
    }

    return (
      <Container fluid className="mb-4">
        <h2>Search Results</h2>
        <ListGroup>
          {rentals.map((rental) => {
            return (
              <ListGroup.Item>
                <Row>
                  <Col xs={12} sm={3}>
                    <Image
                      className="rental-car-image"
                      src={rental.basicInfo.img ?? DefaultCarImage}
                    ></Image>
                  </Col>
                  <Col xs={6} sm={6}>
                    <h4>{`${rental.basicInfo.year} ${rental.basicInfo.make} ${rental.basicInfo.model}`}</h4>
                    <p>Color: {rental.basicInfo.color}</p>
                    <p>Condition: {rental.basicInfo.condition}</p>
                    <p>
                      Status:{" "}
                      {rental.rentalStatus.isRented ? "Rented" : "Available"}
                    </p>
                  </Col>
                  <Col xs={6} sm={3}>
                    <p>{rental.pickup}</p>
                    <p>${rental.price}</p>
                    <LinkContainer to={`/car-detail/${rental._id}`}>
                      <Button
                        variant="success"
                        disabled={rental.rentalStatus.isRented}
                      >
                        Book Now
                      </Button>
                    </LinkContainer>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalList);
