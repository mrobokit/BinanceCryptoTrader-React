import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux + Redux Async(Thunk)
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import reducers from "./reducers";
import tradeSocketMiddleware from "./middleware/tradeSocketMiddleware";
import tickerStreamMiddleware from "./middleware/tickerStreamMiddleware";
import eventStreamMiddleware from "./middleware/eventStreamMiddleware";
import klineStreamMiddleware from "./middleware/klineStreamMiddleware";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunk,
      tradeSocketMiddleware,
      tickerStreamMiddleware,
      eventStreamMiddleware,
      klineStreamMiddleware
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// ✅ console.log(createEndpoint);
// ✅ console.log(socketMiddleware);
// ✅ console.log(store);
