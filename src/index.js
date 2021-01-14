import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux + Redux Async(Thunk)
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

// Websockets
import { createWebSocketMiddleware } from "react-websockets-middleware";

// Websocket needed only ( createEndpoint i did)
const createEndpoint = () => {
  const symbolOne = "btcusdt";
  const symbolTwo = "ethusdt";
  const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
  const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

  return (
    "wss://stream.binance.com:9443/stream?streams=" +
    TRADE.join("/") +
    "/" +
    TICKER.join("/")
  );
};
const socketMiddleware = createWebSocketMiddleware({
  endpoint: createEndpoint(),
});

//Redux stoe
const store = createStore(reducers, applyMiddleware(socketMiddleware, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// ✅ console.log(createEndpoint);
// ✅ console.log(socketMiddleware);
// ✅ console.log(store);
