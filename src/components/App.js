import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AccountPage from "../pages/AccountPage";
import Navbar from "../components/Navbar";
import "./App.css";
import SymbolPage from "../pages/SymbolPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="ui container container-style hundredvh">
        <Navbar />
        <div className="ui segment " style={{ height: "calc(100% - 65px)" }}>
          <Route path="/" exact component={Dashboard} />
          <Route path="/account" exact component={AccountPage} />
          <Route path="/trade/:pair" component={SymbolPage} />
          {/* // dynamic route here, if i type in bar LINKUSDT, it shall create that page for me */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
