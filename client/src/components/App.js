import React, { useEffect, useState } from "react";
import Coin from "./Coin";
import BinanceChart from ".//BinanceChart";

const App = () => {
  const [coinOne, setCoinOne] = useState("");
  const [coinTwo, setCoinTwo] = useState("");
  const [coinThree, setCoinThree] = useState("");
  const [coinFour, setCoinFour] = useState("");
  const [coinFive, setCoinFive] = useState("");

  const SYMBOLS = ["BTCUSDT", "ETHUSDT"];

  const sockets = () => {
    const CHANNELS = ["btcusdt@trade", "ethusdt@trade"];

    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/" + CHANNELS.join("/")
    );

    ws.onopen = () => {
      console.log("Binance connected.");
    };

    ws.onclose = function () {
      console.log("Binance disconnected.");
    };

    ws.onmessage = (evt) => {
      const response = JSON.parse(evt.data);

      if (response.s === "BTCUSDT") setCoinOne(response);
      if (response.s === "ETHUSDT") setCoinTwo(response);
    };
  };

  useEffect(() => {
    sockets();
  }, []);

  return (
    <div className="ui container">
      <Coin s={coinOne.s} p={coinOne.p} />
      <Coin s={coinTwo.s} p={coinTwo.p} />
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
