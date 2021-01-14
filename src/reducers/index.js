import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import orderReducer from "./orderReducer";
import websocketReducer from "./websocketReducer";

export default combineReducers({
  wallet: accountReducer,
  order: orderReducer,
  socket: websocketReducer,
});
