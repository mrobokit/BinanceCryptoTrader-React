import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import configReducer from "./configReducer";

import {
  tradeSocketReducer,
  tickerSocketReducer,
  eventSocketReducer,
} from "./socketReducer";

export default combineReducers({
  wallet: accountReducer,
  config: configReducer,
  tradeStream: tradeSocketReducer,
  tickerStream: tickerSocketReducer,
  eventStream: eventSocketReducer,
});
