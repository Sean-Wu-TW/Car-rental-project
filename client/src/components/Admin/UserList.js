import React, { Component } from "react";
import "./Admin.css";
import UserCard from "./UserCard";
import Table from 'react-bootstrap/Table';


export default class UserList extends Component {


    render() {
        return (
            <div className="container">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Driver License number</th>
                            <th>Driver License State</th>
                            <th>Credit Card Number</th>
                            <th>Card Holder</th>
                            <th>Membership Valid</th>
                            <th>Membership Start Date</th>
                            <th>Membership End Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <UserCard></UserCard>

                </Table>
            </div>
        );
    }
}