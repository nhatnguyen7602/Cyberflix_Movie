import { combineReducers } from "redux";
import { spinnerReducer } from "./reducerSpinner";
import { userReducer } from "./reducerUser";
import { movieReducer } from "./reducerMovie";
import { checkoutReducer } from "./reducerCheckout";
export const rootReducer = combineReducers({
  userReducer: userReducer,
  spinnerReducer: spinnerReducer,
  movieReducer: movieReducer,
  checkoutReducer: checkoutReducer,
});
