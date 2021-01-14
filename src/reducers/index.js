import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import websocketReducer from "./websocketReducer";

export default combineReducers({
  wallet: accountReducer,
  socket: websocketReducer,
});
