import React, { useEffect } from "react";
import { CoinPrice, CoinPair, Change24H } from "./Coin";
import "./SymbolStream.css";
import { useSelector, useDispatch } from "react-redux";

const SymbolStream = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dobby is a free elf!");
  }, []);

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
          <td data-label="Pair">{/* <CoinPair /> */}</td>
          {/*
          <td data-label="Live Trades">
            <CoinPrice price={filteredTrade().p} />
          </td>

          <td data-label="Last 24H Change">
            <Change24H
              price={filteredTicker().p}
              percentage={filteredTicker().P}
            />
          </td> */}
        </tr>
      </tbody>
    </table>
  );
};

export default SymbolStream;
