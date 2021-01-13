import React, { useState, useEffect } from "react";
import OpenOrders from "../components/OpenOrders";
import Table from "../components/Table";

//import BinanceChart from "./BinanceChart";

const HomePage = () => {
  const [coinOne, setCoinOne] = useState("");
  const [coinTwo, setCoinTwo] = useState("");
  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");

  const symbolOne = "btcusdt";
  const symbolTwo = "ethusdt";

  useEffect(() => {
    const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
    const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

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
          {coinOne && coinTwo && tickerOne && tickerTwo ? (
            <Table
              coinOne={coinOne}
              coinTwo={coinTwo}
              tickerOne={tickerOne}
              tickerTwo={tickerTwo}
            />
          ) : (
            <div className="ui segment" style={{ height: "320px" }}>
              <div className="ui active loader"></div>
              <p></p>
            </div>
          )}
        </div>
        <div className="seven wide column">
          <p> Previous Actions</p>
          You bought BTC for ... at... <br />
          You sold ETH for... at...
        </div>

        <div className="nine wide column">
          {coinOne && coinTwo && tickerOne && tickerTwo ? (
            <OpenOrders symbol={coinTwo.s} />
          ) : (
            <div className="ui segment" style={{ height: "120px" }}>
              <div className="ui active loader"></div>
              <p></p>
            </div>
          )}
          {/* Above line is very important AS IS, otherwise it passes undefined to component and it won't query the API */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
