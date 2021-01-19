import React, { useEffect } from "react";
import {
  connectToTrade,
  connectToTicker,
  disconnectFromTrade,
  disconnectFromTicker,
  storeTickerStream,
  storeTradeStream,
} from "../actions";
import "./SymbolStream.css";
import { useSelector, useDispatch } from "react-redux";
import { CoinPair, CoinPrice, Change24H } from "../components/Coin";

const SymbolStream = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  //Trade
  const connectToTradeStream = () => {
    dispatch(
      connectToTrade(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };
  const disconnectFromTradeStream = () => {
    dispatch(
      disconnectFromTrade(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };

  //Ticker
  const connectToTickerStream = () => {
    dispatch(
      connectToTicker(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@ticker`,
        storeTickerStream
      )
    );
  };
  const disconnectFromTickerStream = () => {
    dispatch(
      disconnectFromTicker(
        `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@ticker`
      )
    );
  };

  useEffect(() => {
    console.log("Dobby is a free elf!");
    // connectToTicker();
    // connectToTrade();

    return () => {
      disconnectFromTrade();
      disconnectFromTicker();
    };
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
            <td data-label="Pair">
              <CoinPair />
            </td>

            <td data-label="Live Trades">
              <CoinPrice />
            </td>

            <td data-label="Last 24H Change">
              <Change24H />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => connectToTickerStream()}>
        Connect To Ticker Stream
      </button>
      <br />
      <button onClick={() => disconnectFromTickerStream()}>
        Disconnect From Ticker Stream
      </button>
      <br />
      <br />
      <button onClick={() => connectToTradeStream()}>
        Connect To Trade Stream
      </button>
      <br />
      <button onClick={() => disconnectFromTradeStream()}>
        Disconnect From Trade Stream
      </button>
    </div>
  );
};

export default SymbolStream;
