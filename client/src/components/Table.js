// Very Important - If you see in order book more orders for selling than buying, price goes down??

import React, { useEffect, useState, useRef } from "react";
import { CoinPrice, CoinPair, Change24H } from "./Coin";
import "./Table.css";
import { Actions } from "./Actions";

const Table = () => {
  const [coinOne, setCoinOne] = useState("");
  const [coinTwo, setCoinTwo] = useState("");
  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");

  // const [coinOneTrend, setCoinOneTrend] = useState([]);
  // const [coinTwoTrend, setCoinTwoTrend] = useState([]);

  const symbolOne = "btcusdt";
  const symbolTwo = "ethusdt";
  const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
  const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

  // const usePrevious = (value) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // };

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

      //console.log(response); //"btcusdt@trade"

      if (response.stream === TRADE[0]) {
        setCoinOne(response.data);
        // Every 5 seconds write from price to trend!!!
        //setCoinOneTrend((oldArray) => [...oldArray, newPrice])

        //;
      }

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
    <table className="ui celled table custom-table">
      <thead>
        <tr>
          <th>Pair</th>
          <th>Live Trades</th>
          <th>Last 24H Data</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Pair">
            <CoinPair pair={coinOne.s} />
          </td>

          <td data-label="Live Trades">
            {/* I can also pass full object if i decide to */}
            <CoinPrice price={coinOne.p} />
          </td>

          <td data-label="Last 24H Change">
            <Change24H
              price={tickerOne.p}
              percentage={tickerOne.P}
              baseV={tickerOne.v}
              quoteV={tickerOne.q}
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td data-label="Pair">
            <CoinPair pair={coinTwo.s} />
          </td>
          <td data-label="Live Trades">
            <CoinPrice price={coinTwo.p} />
          </td>
          <td data-label="Last 24H Data">
            <Change24H
              price={tickerTwo.p}
              percentage={tickerTwo.P}
              baseV={tickerTwo.v}
              quoteV={tickerTwo.q}
            />
          </td>
          <td>
            <Actions coinTwo={coinTwo} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
