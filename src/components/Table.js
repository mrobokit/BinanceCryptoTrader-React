// Very Important - If you see in order book more orders for selling than buying, price goes down??
import React from "react";
import { CoinPrice, CoinPair, Change24H } from "./Coin";

import "./Table.css";

const Table = ({ coinOne, coinTwo, tickerOne, tickerTwo }) => {
  return (
    <table className="ui celled table custom-table">
      <thead>
        <tr>
          <th>Pair</th>
          <th>Last 24H Data</th>
          <th>Live Trades</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Pair">
            <CoinPair symbol={coinOne.s} />
          </td>

          <td data-label="Last 24H Change">
            <Change24H price={tickerOne.p} percentage={tickerOne.P} />
          </td>

          <td data-label="Live Trades">
            <CoinPrice price={coinOne.p} />
          </td>
        </tr>

        {/* ETHEREUM */}
        <tr>
          <td data-label="Pair">
            <CoinPair symbol={coinTwo.s} />
          </td>

          <td data-label="Last 24H Change">
            <Change24H price={tickerTwo.p} percentage={tickerTwo.P} />
          </td>

          <td data-label="Live Trades">
            <CoinPrice price={coinTwo.p} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
