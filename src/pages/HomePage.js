import React, { useState, useEffect } from "react";
import OpenOrders from "../components/OpenOrders";
import Table from "../components/Table";
import { Link } from "react-router-dom";
//import BinanceChart from "./BinanceChart";

const HomePage = () => {
  const [coinOne, setCoinOne] = useState("");
  const [coinTwo, setCoinTwo] = useState("");
  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");

  const symbolOne = "btcusdt";
  const symbolTwo = "ethusdt";
  const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
  const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=" +
        TRADE.join("/") +
        "/" +
        TICKER.join("/")
    );

    ws.onopen = () => {
      console.log("Binance connected.");
    };
    ws.onclose = function () {
      console.log("Binance disconnected.");
    };
    ws.onmessage = (evt) => {
      const response = JSON.parse(evt.data);

      if (response.stream === TRADE[0]) setCoinOne(response.data);
      if (response.stream === TRADE[1]) setCoinTwo(response.data);
      if (response.stream === TICKER[0]) setTickerOne(response.data);
      if (response.stream === TICKER[1]) setTickerTwo(response.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="ui container">
      <div className="ui grid">
        <div className="nine wide column">
          <Link to="/account">Wallet</Link>
          <Table
            coinOne={coinOne}
            coinTwo={coinTwo}
            tickerOne={tickerOne}
            tickerTwo={tickerTwo}
          />
        </div>
        <div className="seven wide column">
          <p> Previous Actions</p>
          You bought BTC for ... at... <br />
          You sold ETH for... at...
        </div>

        <div className="nine wide column">
          <OpenOrders symbol={symbolTwo} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
