import React, { useEffect, useState } from "react";
import Table from "../components/Table";

import { BrowserRouter, Route, Link } from "react-router-dom";
import Balance from "../components/Balance";
//import BinanceChart from "./BinanceChart";

const HomePage = () => {
  return (
    <div className="ui container">
      <div class="ui grid">
        <div class="nine wide column">
          <Link to="/account">Go to Account</Link>
          <Table />
        </div>
        <div class="seven wide column">
          <p> Previous Actions</p>
          You bought BTC for ... at... <br />
          You sold ETH for... at...
        </div>

        <div class="nine wide column">
          <div className="ui header"> Active Orders</div>
        </div>
      </div>
    </div>
  );
};

const AccountPage = () => {
  return (
    <div>
      AccountPage <Link to="/">Go back</Link>
      <Balance />
    </div>
  );
};

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

//import binance from "../components/api/binance";

// API
//const [data, setData] = useState([]);
// async function search() {
//   const response = await binance.get("/time"); // means i get the data property from the response
//   console.log(response);
//   //setData(response);
// }
// search();
