import React, { Component } from "react";
import "./Admin.css";
import CarForm from "./CarForm";
import CarCard from "./CarCard";
import UserList from "./UserList";
import UserForm from "./UserForm";
import StoreCard from "./StoreCard";
import StoreForm from "./StoreForm";
import { Tab } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'


export default class Admin extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="carManagement" id="uncontrolled-tab-example">
                <Tab eventKey="carManagement" title="Car Management">
                    <div className="container">
                        <div className="card card-settings">
                            <CarCard></CarCard>
                        </div>
                        <div className="card card-settings">
                            <CarForm></CarForm>
                        </div>

                    </div>
                </Tab>
                <Tab eventKey="userManagement" title="User Management">
                    <div className="container">
                        <div className="card card-settings">
                            <UserList></UserList>
                        </div>
                        <div className="card card-settings">
                            <UserForm></UserForm>
                        </div>
                    </div>
                </Tab>

                <Tab eventKey="storeManagement" title="Store Management">
                    <div className="container">
                        <div className="card card-settings">
                            <StoreCard></StoreCard>
                        </div>
                        <div className="card card-settings">
                            <StoreForm></StoreForm>
                        </div>

                    </div>
                </Tab>
            </Tabs>



        );
    }
}