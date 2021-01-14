import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//Redux + Redux Async(Thunk)
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import reducers from "./reducers";
import socketMiddleware from "./middleware/middleware";

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk, socketMiddleware))
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
