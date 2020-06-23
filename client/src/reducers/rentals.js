import { BOOK_RENTAL, RENTALS_ERROR, RENTALS_SEARCH } from "../actions/types";

const DEFAULT_STATE = {
  rentals: [],
};

export default (state = DEFAULT_STATE, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case BOOK_RENTAL:
      const vehicle = newState.rentals.find(
        (v) => v._id === action.payload.vehicleId
      );
      vehicle.rentalStatus.isRented = true;

      alert(action.payload.message);

      return newState;

    case RENTALS_SEARCH:
      console.log("[AuthReducer] RENTALS_SEARCH action");

      newState.rentals = action.payload;
      return newState;

    case RENTALS_ERROR:
      console.log("[RentalsReducer] RENTALS_ERROR action");

      alert(action.payload.message);

      return { ...state, errorMessage: action.payload.message };

    default:
      return state;
  }
};
