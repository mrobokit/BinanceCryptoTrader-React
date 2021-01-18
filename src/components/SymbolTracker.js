import React from "react";
import { CoinPrice, CoinPair, Change24H } from "./Coin";
import "./SymbolTracker.css";

const SymbolTracker = ({ trade, ticker }) => {
  return (
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
            <CoinPair symbol={trade.s} />
          </td>

          <td data-label="Live Trades">
            <CoinPrice price={trade.p} />
          </td>

          <td data-label="Last 24H Change">
            <Change24H price={ticker.p} percentage={ticker.P} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SymbolTracker;
