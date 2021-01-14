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

  useEffect(() => {
    console.log("Table mounted");

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
      // If you clear these out, it goes on, even though i am on different page. Might want, might not.
      ws.close();
    };
  }, []);

  return (
    <div>
      {/* {console.log(props.ethereum_trade)}

      {console.log(props.bitcoin_trade)} */}

      <table className="ui celled table custom-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th>Live Trades</th>
            <th>Last 24H Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Pair">
              <CoinPair symbol={coinOne.s} />
            </td>

            <td data-label="Live Trades">
              <CoinPrice price={coinOne.p} />
            </td>

            <td data-label="Last 24H Change">
              <Change24H price={tickerOne.p} percentage={tickerOne.P} />
            </td>
          </tr>

          <tr>
            <td data-label="Pair">
              <CoinPair symbol={coinTwo.s} />
            </td>

            <td data-label="Live Trades">
              <CoinPrice price={coinTwo.p} />
            </td>

            <td data-label="Last 24H Change">
              <Change24H price={tickerTwo.p} percentage={tickerTwo.P} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
