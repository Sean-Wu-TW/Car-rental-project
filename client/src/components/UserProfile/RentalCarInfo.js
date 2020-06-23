import React, { Component } from "react";

export default class RentalCarInfo extends Component {

    linkCallBack(){
        alert("You have successfully cancelled your reservation.")
    }
    
    render() {
        const linkButtonStyle = {
            position:"absolute", 
            top:"0", 
            right:"0",
          };
        return (
            <div className="card mb-3" style={{ maxWidth: "540px;" }}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={this.props.params.img} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.params.name}</h5>
                            <p className="card-text">{this.props.params.carInfo}</p>
                            <p className="card-text">Expire Date of current reservation: {this.props.params.expireDate}</p>
                            <button type="button" className="btn btn-link" onClick={this.linkCallBack} style={linkButtonStyle}>Cancel Reservation</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

