import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

//Styling
import "./Footer.css";

/*
export default class Footer extends Component {
  render() {
    return (
      <Container fluid className="footer">
        <Row>
          <Col xs={12}>Codeman</Col>
        </Row>
        <br />
        <Row>
          <Col xs={12} sm={3}>
            About Us
          </Col>
          <Col xs={12} sm={3}>
            Terms
          </Col>
          <Col xs={12} sm={3}>
            Privacy
          </Col>
          <Col xs={12} sm={3}>
            Site Map
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>© 2020 Codeman</Col>
        </Row>
      </Container>
    );
  }
}
*/

const Footer = () => {
    return (
      <div className="main-footer">
        <div className="container_f">
          {/* Column 1 */}
          <div className="column">
            <h5>CODEMAN INC</h5>
            <ul className="list">
              <li>408-787-3808</li>
              <li>777 First Ave, San Jose, CA</li>
            </ul>
          </div>
          {/* Column 2 */}
          <div className="column">
          <h5>Top Location</h5>
          <ul className="list">
              <li>San Jose</li>
              <li>San Francisco</li>
            </ul>
          </div>
          {/* Column 3 */}
          <div className="column">
          <h5>Link</h5>
          <ul className="list">
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      <hr />
      <div className="row">
          &nbsp;&nbsp;&nbsp;&nbsp;&copy;{new Date().getFullYear()} CODEMAN INC | All right reserved | Terms Of Service | Privacy
      </div>
    </div>

    );
}

export default Footer;