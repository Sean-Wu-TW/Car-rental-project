import React, { Component } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Store = (props) => (
  <tr>
    <td>{props.store.storeName}</td>
    <td>{props.store.storeAddress.street}</td>
    <td>{props.store.storeAddress.city}</td>
    <td>{props.store.storeAddress.state}</td>
    <td>{props.store.storeAddress.zip}</td>
    <td>{props.store.vehicleCapacity}</td>
    <td>
      <Link
        to={`${process.env.REACT_APP_API_ENDPOINT}/stores/update/${props.store._id}`}
      >
        edit
      </Link>{" "}
      |{" "}
      <a
        href="/admin"
        onClick={() => {
          props.deleteStore(props.store._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class storeCard extends Component {
  constructor(props) {
    super(props);
    this.deleteStore = this.deleteStore.bind(this);
    this.state = { stores: [] };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/stores/`)
      .then((response) => {
        this.setState({ stores: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteStore(id) {
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}/stores/` + id)
      .then((response) => {
        console.log(response.data);
      });
    this.setState({
      stores: this.state.stores.filter((el) => el._id !== id),
    });
  }

  storeList() {
    return this.state.stores.map((currentstore) => {
      return (
        <Store
          store={currentstore}
          deleteStore={this.deleteStore}
          key={currentstore._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Current Stores</h3>
        <div className="container">
          {/* <Table responsive> */}
          <thead className="thead-light">
            <tr>
              <th>Store Name</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Vehicle Capacity</th>
            </tr>
          </thead>
          {/* </Table> */}
          <tbody>{this.storeList()}</tbody>
        </div>
      </div>
    );
  }
}
