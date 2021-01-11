import React, { useEffect, useState } from "react";

const App = () => {
  const [symbolOne, setSymbolOne] = useState([]);
  const [symbolTwo, setSymbolTwo] = useState([]);

  const wes = (url, pushState) => {
    const ws = new WebSocket(url);
    //const readyState = ws.readyState;

    ws.onopen = (event) => {
      console.log("Stream connected.");
    };

    ws.onmessage = (event) => {
      //console.log("WebSocket message received:", event);
      pushState(JSON.parse(event.data));
    };
  };

  useEffect(() => {
    wes("wss://stream.binance.com:9443/ws/btcusdt@trade", setSymbolOne);
    wes("wss://stream.binance.com:9443/ws/ethusdt@trade", setSymbolTwo);
  }, []);

  return (
    <div className="ui container">
      <div>
        <i className="bitcoin icon" />= {symbolOne.p} ({symbolOne.s})
      </div>
      <div>
        <i className="ethereum icon" />= {symbolTwo.p} ({symbolTwo.s})
      </div>
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
