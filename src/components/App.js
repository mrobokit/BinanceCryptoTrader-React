import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import Navbar from "../components/Navbar";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="ui container container-style hundredvh">
        <Navbar />
        <div className="ui segment " style={{ height: "calc(100% - 65px)" }}>
          <Route path="/" exact component={HomePage} />
          <Route path="/account" exact component={AccountPage} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
