import React, { Component } from "react";
import "./Admin.css";

export default class UserForm extends Component {

    render() {
        return (
            <div>
                <form id="adminForm">
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="First Name" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Address" />
                    </div>

                    <div className="form-group">
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Email" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Password" />
                            </div>
                        </div>
                    </div>



                    <div className="form-group">
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="If Membership valid" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Membership Start Date" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Membership End Date" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Driver License Number" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Driver License State" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Credit Card Number" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Credit Card Holder Name" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Fee" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Add User</button>
                    </div>
                </form>

            </div>


        );
    }
}

