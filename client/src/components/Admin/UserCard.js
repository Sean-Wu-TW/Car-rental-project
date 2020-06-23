import React, { Component } from "react";
import "./Admin.css";
import Button from 'react-bootstrap/Button';


export default class UserCard extends Component {

    constructor() {
        super();
        this.state = {
            email: "email",
            resaddre: "address",
            firstname: "firstname",
            lastname: "lastname",
            password: "password",
            city: "city",
            // license_state, license_number
            driver_license: [],
            // card_number, card_holder
            credit_card: [],
            membership: {
                valid: true,
                starts: "",
                ends: "",
            },
            fee: 0,
            reservations: []

        }
    }

    render() {
        return (
            <tbody>
                <tr>
                    <td>{this.state.firstname}</td>
                    <td>{this.state.lastname}</td>
                    <td>{this.state.email}</td>
                    <td>{this.state.password}</td>
                    <td>{this.state.address}</td>
                    <td>{this.state.City}</td>
                    <td>{this.state.driver_license[0]}</td>
                    <td>{this.state.driver_license[1]}</td>
                    <td>{this.state.credit_card[0]}</td>
                    <td>{this.state.credit_card[1]}</td>

                    <td>{this.state.membership.valid}</td>
                    <td>{this.state.membership.starts}</td>
                    <td>{this.state.membership.ends}</td>
                    <td>
                        <Button variant="link">Delete</Button>
                    </td>
                </tr>

            </tbody>
        );
    }
}