import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import configReducer from "./configReducer";
import orderReducer from "./orderReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
  wallet: accountReducer,
  order: orderReducer,
  config: configReducer,
  socket: socketReducer,
});
