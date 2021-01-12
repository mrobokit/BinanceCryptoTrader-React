import React, { useEffect, useState } from "react";
import { CoinPrice, CoinPair, Change24H } from "./Coin";
import "./Table.css";

const Table = () => {
  const [coinOne, setCoinOne] = useState("");
  const [coinTwo, setCoinTwo] = useState("");
  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");

  const symbolOne = "btcusdt";
  const symbolTwo = "ethusdt";
  const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
  const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

  const sockets = () => {
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
      //console.log(response); //"btcusdt@trade"

      if (response.stream === TRADE[0]) setCoinOne(response.data);
      if (response.stream === TRADE[1]) setCoinTwo(response.data);

      if (response.stream === TICKER[0]) setTickerOne(response.data);
      if (response.stream === TICKER[1]) setTickerTwo(response.data);
    };
  };

  useEffect(() => {
    sockets();
  }, []);

  return (
    <table class="ui celled table custom-table">
      <thead>
        <tr>
          <th>Pair</th>
          <th>Live Trades</th>
          <th>24h Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Pair">
            <CoinPair pair={coinOne.s} />
          </td>

          <td data-label="Live Trades">
            <CoinPrice price={coinOne.p} />
          </td>

          <td data-label="24h Change">
            <Change24H price={tickerOne.p} percentage={tickerOne.P} />
          </td>
        </tr>
        <tr>
          <td data-label="Pair">
            <CoinPair pair={coinTwo.s} />
          </td>
          <td data-label="Live Trades">
            <CoinPrice price={coinTwo.p} />
          </td>
          <td data-label="24h Change">
            <Change24H price={tickerTwo.p} percentage={tickerTwo.P} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
