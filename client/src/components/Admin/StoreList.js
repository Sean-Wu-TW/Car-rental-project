import React, { Component } from "react";
import "./Admin.css";
import StoreCard from "./StoreCard";
import Table from 'react-bootstrap/Table';

export default class StoreList extends Component {
    render() {
        return (
            <div className="container">
                {/* <Table responsive> */}
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

                    <StoreCard></StoreCard>

                {/* </Table> */}
            </div>
        );
    }
}