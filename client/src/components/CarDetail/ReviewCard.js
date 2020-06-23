import React from "react";
import "./CarDetail.css";

const ReviewCard = (props) => {
    return (
        <div>
            <p>{props.review}</p>
            <small className="text-muted">Posted by {props.user}</small>
            <hr></hr>
        </div>
    );
}

export default ReviewCard;
