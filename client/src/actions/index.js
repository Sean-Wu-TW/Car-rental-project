import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_LOG_OUT,
  AUTH_SIGN_IN,
  BOOK_RENTAL,
  CANCEL_RENTAL,
  RENTALS_ERROR,
  RENTALS_SEARCH,
  ADMIN_LOGIN,
  ADMIN_LOGIN_ERROR,
} from "./types";

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:5000/users/signup', data);


      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });
      //set JWT into cache`
      localStorage.setItem("JWT_TOKEN", res.data.token);
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already exits",
      });
      console.log("err", err);
    }
  };
};

export const adminLogin = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/admin/login',
        data
      );
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      //set JWT into cache
      localStorage.setItem("JWT_TOKEN", res.data.token);
      console.log("res", res);
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Admin email or passwor is not correct"
      });
      console.log("err", err);
    }
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      console.log("[ActionCreator] login function called");
      const res = await axios.post('http://localhost:5000/users/login', data);

      console.log("res", res);
      console.log("[ActionCreator] dispatch function called");
      //dispatch use user action with JWT
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });
      //set JWT into cache
      localStorage.setItem("JWT_TOKEN", res.data.token);
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Your email or passwor does not correct"
      });
      console.log("err", err);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
    dispatch({
      type: AUTH_LOG_OUT,
      payload: "",
    });
  };
};

export function getAvailableRentals(params) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/vehicles`;

  return async (dispatch) => {
    try {
      console.log("[ActionCreator] get vehicles called");
      const res = await axios.get(url, { params });

      console.log("res", res);

      dispatch({
        type: RENTALS_SEARCH,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RENTALS_ERROR,
        payload: { message: "Some error occured" },
      });
      console.error("err", err);
    }
  };
}

export function bookRental(
  authToken,
  vehicleId,
  pickupLocation,
  pickupYear,
  pickupMonth,
  pickupDate,
  pickupHour,
  rentalLengthInHours
) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/users/vehicles/reserve`;
  const data = {
    jwt_token: authToken,
    vehicleId,
    pickupLocation,
    pickupYear,
    pickupMonth,
    pickupDate,
    pickupHour,
    rentalLengthInHours,
  };

  return async (dispatch) => {
    try {
      console.log("[ActionCreator] bookRental called");
      const res = await axios.post(url, data);

      dispatch({
        type: BOOK_RENTAL,
        payload: {
          vehicleId,
          message: "Successfully reserved vehicle",
        },
      });
    } catch (err) {
      dispatch({
        type: RENTALS_ERROR,
        payload: {
          vehicleId,
          message: "Failed to reserve vehicle",
        },
      });
    }
  };
}

export function cancelRental(authToken, reservationId) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/users/vehicles/cancle`;
  const data = {
    jwt_token: authToken,
    reservation_id: reservationId,
  };

  return async (dispatch) => {
    try {
      console.log("[ActionCreator] cancelRental called");
      const res = await axios.post(url, data);

      dispatch({
        type: CANCEL_RENTAL,
        payload: {
          reservationId,
          message: "Successfully cancelled reservation",
        },
      });
    } catch (err) {
      dispatch({
        type: RENTALS_ERROR,
        payload: {
          reservationId,
          message: "Failed to cancel reservation",
        },
      });
    }
  };
}

export function getadminaccount(params) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/admin`;

  return async (dispatch) => {
    try {
      console.log("[ActionCreator] get admin called");
      const res = await axios.get(url, { params });

      console.log("res", res);

      dispatch({
        type: ADMIN_LOGIN,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADMIN_LOGIN_ERROR,
        payload: "Some error occured",
      });
      console.error("err", err);
    }
  };
}

export const getUserProfile = () => {
  return async (dispatch) => {
    try {
      console.log("getUserProfile() called");
      var token = localStorage.getItem('JWT_TOKEN');
      const res = await axios.post('http://localhost:5000/users/myprofile', { "jwt_token": token });

    } catch (err) {
      console.log("err", err);
    }
  };
}
