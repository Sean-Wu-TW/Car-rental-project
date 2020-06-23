import React, { Component } from "react";
import RentalCarInfo from "./RentalCarInfo";
import RentalButtons from "./RentalButtons";

export default class RentalInfo extends Component {
    render() {
        return (
            <div>
                <h3>Current selected car: </h3>
                <RentalCarInfo params={this.props.params} />
                <RentalButtons />
            </div>
        );
    }
}
