import React, { Component } from "react";

export default class RentalButtons extends Component {

    constructor() {
        super();
        this.state = {
            condition: null
        };
        this.onChange = this.onChange.bind(this);
        this.buttons1Callback = this.buttons1Callback.bind(this);
    }
    onChange(event) {
        this.setState({ condition: event.target.value });
    }
    buttons1Callback() {
        var condition = this.state.condition;
        console.log(condition);
        alert("You have successfully return this vehicle.")
    }

    render() {
        const submitButtonStyle = {
            position: "absolute",
            left: "44%",
        }
        return (

            <div>
                <div className="form-group">
                    <select className="custom-select" onChange={this.onChange} value={this.state.condition} required>
                        <option value="0">Please select the car condition from the menu</option>
                        <option value="1">Good</option>
                        <option value="2">Needs Cleaning</option>
                        <option value="3">Needs Maintainence</option>
                    </select>
                    <div className="invalid-feedback">Example invalid custom select feedback</div>

                    <label for="exampleFormControlTextarea1">Please leave comments for our service : </label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>

                    <input className="btn btn-primary" type="submit" value="Submit" onClick={this.buttons1Callback} style={submitButtonStyle}></input>
                </div>
            </div>
        );
    }
}
