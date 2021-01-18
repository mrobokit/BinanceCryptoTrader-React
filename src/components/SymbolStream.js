import React, { useEffect } from "react";
import {
  connectToSocket,
  disconnectFromSocket,
  storeTickerStream,
  storeTradeStream,
} from "../actions";
import "./SymbolStream.css";
import { useSelector, useDispatch } from "react-redux";
import { CoinPair, CoinPrice, Change24H } from "../components/Coin";

const SymbolStream = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  const connectToTicker = () => {
    dispatch(
      connectToSocket(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@ticker`,
        storeTickerStream
      )
    );
  };
  const disconnectFromTicker = () => {
    dispatch(
      disconnectFromSocket(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@ticker`
      )
    );
  };
  const connectToTrade = () => {
    dispatch(
      connectToSocket(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };

  useEffect(() => {
    console.log("Dobby is a free elf!");
    connectToTicker();
  }, []);

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
            <td data-label="Pair">{/* <CoinPair /> */}</td>

            <td data-label="Live Trades">{/* <CoinPrice /> */}</td>

            <td data-label="Last 24H Change">
              <Change24H />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => connectToTicker()}>
        Connect To Ticker Stream
      </button>
      <br />
      <button onClick={() => disconnectFromTicker()}>
        Disconnect From Ticker Stream
      </button>
    </div>
  );
};

export default SymbolStream;
