import React from "react";
import Table from "../components/Table";

import { BrowserRouter, Route, Link } from "react-router-dom";
import Balance from "../components/Balance";
//import BinanceChart from "./BinanceChart";

import OpenOrders from "../components/OpenOrders";

const HomePage = () => {
  return (
    <div className="ui container">
      <div className="ui grid">
        <div className="nine wide column">
          <Link to="/account">Wallet</Link>
          <Table />
        </div>
        <div className="seven wide column">
          <p> Previous Actions</p>
          You bought BTC for ... at... <br />
          You sold ETH for... at...
        </div>

        <div className="nine wide column">
          <OpenOrders symbol={symb} />
        </div>
      </div>
    </div>
  );
};

const AccountPage = () => {
  return (
    <div>
      <div className="ui header">Wallet</div>

      <Link to="/">Go back</Link>
      <Balance />

      <OpenOrders />
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
