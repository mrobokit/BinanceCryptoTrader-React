import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import configReducer from "./configReducer";
import orderReducer from "./orderReducer";
import {
  tradeSocketReducer,
  tickerSocketReducer,
  eventSocketReducer,
} from "./socketReducer";

export default combineReducers({
  wallet: accountReducer,
  order: orderReducer,
  config: configReducer,
  tradeStream: tradeSocketReducer,
  tickerStream: tickerSocketReducer,
  eventStream: eventSocketReducer,
});
