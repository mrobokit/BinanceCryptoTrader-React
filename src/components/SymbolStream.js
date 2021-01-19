import React, { useEffect } from "react";
import {
  connectToTrade,
  connectToTicker,
  storeTickerStream,
  storeTradeStream,
  storeTickerStatus,
  storeTradeStatus,
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
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };
  const connectToTickerStream = () => {
    dispatch(
      connectToTicker(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@ticker`,
        storeTickerStream
      )
    );
  };

  useEffect(() => {
    // Prevents closing the stream
    if (config.tradeStatus === false) {
      dispatch(storeTradeStatus(true));
      connectToTradeStream();
    }
    if (config.tickerStatus === false) {
      connectToTickerStream();
      dispatch(storeTickerStatus(true));
    }

    // Auto Stream leave on route change
    // return () => {
    //   disconnectFromTickerStream();
    //   disconnectFromTradeStream();
    // };
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
    </div>
  );
};

export default SymbolStream;
