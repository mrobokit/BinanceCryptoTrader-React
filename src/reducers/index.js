import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import configReducer from "./configReducer";
import orderReducer from "./orderReducer";

import {
  tradeSocketReducer,
  tickerSocketReducer,
  eventSocketReducer,
  klineSocketReducer,
} from "./socketReducer";

export default combineReducers({
  wallet: accountReducer,
  config: configReducer,
  order: orderReducer,
  tradeStream: tradeSocketReducer,
  tickerStream: tickerSocketReducer,
  eventStream: eventSocketReducer,
  klineStream: klineSocketReducer,
});
