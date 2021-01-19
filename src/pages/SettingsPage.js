import React from "react";
import {
  disconnectFromTrade,
  disconnectFromTicker,
  storeTradeStream,
  storeTickerStatus,
} from "../actions";
import { useSelector, useDispatch } from "react-redux";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  const pair = useSelector((state) => state.config.pair);

  const disconnectFromTradeStream = () => {
    dispatch(
      disconnectFromTrade(
        `wss://stream.binance.com:9443/ws/${pair?.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };
  const disconnectFromTickerStream = () => {
    dispatch(storeTickerStatus(false));
    dispatch(
      disconnectFromTicker(
        `wss://stream.binance.com:9443/ws/${pair?.toLowerCase()}@ticker`
      )
    );
  };

  return (
    <div>
      <button onClick={() => disconnectFromTickerStream()}>
        Disconnect From Ticker Stream
      </button>
      <br />
      <br />
      <br />
      <button onClick={() => disconnectFromTradeStream()}>
        Disconnect From Trade Stream
      </button>
    </div>
  );
};

export default SettingsPage;
