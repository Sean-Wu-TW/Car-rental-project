import React, { Component } from "react";
import "./Admin.css";
import CarCard from "./CarCard";
import Table from 'react-bootstrap/Table';

export default class CarList extends Component {
    render() {
        return (
            <div className="container">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
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
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <CarCard></CarCard>

                </Table>
            </div>
        );
    }
}