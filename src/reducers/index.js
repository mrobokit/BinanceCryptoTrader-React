import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import configReducer from "./configReducer";
import orderReducer from "./orderReducer";
import reportReducer from "./reportReducer";

export default combineReducers({
  wallet: accountReducer,
  order: orderReducer,
  config: configReducer,
  report: reportReducer,
});
