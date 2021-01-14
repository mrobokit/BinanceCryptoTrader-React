import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  wallet: accountReducer,
  order: orderReducer,
});
