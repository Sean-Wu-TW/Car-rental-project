import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Footer from "./Footer";
import Header from "./Header";
import Jumbotron from "./Jumbotron";

// Pages
import Home from "./Home";
import RentalList from "./RentalList";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Staff from "./Staff";
import UserProfile from "./UserProfile/index";
import CarDetail from "./CarDetail";
import Admin from "./Admin/index";

// Styling
import "./App.css";

export default (props) => {
  return (
    <div className="app-body">
      <Header />
      <div className="page-body">
        {/* <Jumbotron /> */}
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/car-detail/:id" component={CarDetail} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/rental-list" component={RentalList} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/staff" component={Staff} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
