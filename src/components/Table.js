import React from "react";
import { CoinPrice, CoinPair, Change24H } from "./Coin";
import "./Table.css";

const Table = ({ coinOne, coinTwo, tickerOne, tickerTwo }) => {
  return (
    <div>
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
