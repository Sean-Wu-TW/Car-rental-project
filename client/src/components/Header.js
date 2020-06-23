import React, { Component } from "react";
import PersonIcon from '@material-ui/icons/Person';
import { Button, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import { connect } from "react-redux";
import * as actions from "../actions";

const StylesNav = styled.div`
  .navbar {
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
    background-color: white;
    margin-bottom: 30px;
  }

  .navbar-nav .userButton {
    color: red;
  }
  .person_icon: {
    width: 60;
    height: 60;
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    console.log("logOut() called");

    //this is the bug this will call the ./actions/index.js file logOut() function
    this.props.logOut();
  }
  render() {
    return (
      <StylesNav>
        <Navbar collapseOnSelect fixed="top" expand="lg">
          <Navbar.Brand href="/"> Codeman</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="ml-auto">
              {!this.props.isAuth
                ? [
                  <Nav.Link href="/signin" className="userButton">Sign in
                    
                  </Nav.Link>,
                  <Button variant="outline-secondary" href="/signup">
                    Sign up
                    </Button>,
                ]
                : null}

              {this.props.isAuth ? (
               [<Nav.Link href="/user-profile">Profile</Nav.Link>,
                <Nav.Link
                  className="nav-link"
                  to="/logout"
                  onClick={this.logOut}
                >Log out</Nav.Link>]
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </StylesNav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
