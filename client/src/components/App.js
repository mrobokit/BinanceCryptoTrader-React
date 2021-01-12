import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import BinanceChart from "./BinanceChart";

const App = () => {
  return (
    <div className="ui container container-style">
      <Table />
      <BinanceChart />
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
