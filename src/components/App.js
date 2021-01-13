import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";

const App = () => {
  return (
    <div className="ui container container-style">
      <BrowserRouter>
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path="/account" exact component={AccountPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
