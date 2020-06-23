import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import rentalsReducer from "./rentals";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  rentals: rentalsReducer,
});
