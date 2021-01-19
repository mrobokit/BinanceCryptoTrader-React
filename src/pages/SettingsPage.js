import React from "react";
import {
  connectToTrade,
  connectToTicker,
  disconnectFromTrade,
  disconnectFromTicker,
  storeTickerStream,
  storeTradeStream,
} from "../actions";
import { useSelector, useDispatch } from "react-redux";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

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

  return (
    <div>
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

export default SettingsPage;
