/* eslint-disable */
import React, { useState } from "react";
import {
  connectToTrade,
  connectToTicker,
  disconnectFromTrade,
  disconnectFromTicker,
  storeTickerStream,
  storeTradeStream,
  storeTickerStatus,
  storeTradeStatus,
  getHistoricalCandlestickDataWidthAxios,
} from "../actions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config, shallowEqual);
  // const [myData, setMyData] = useState([]);

  // const eventStream = useSelector(
  //   (state) => state.eventStream.executionReport,
  //   shallowEqual
  // );
  // const tradeStream = useSelector((state) => state.tradeStream);
  //const tickerStream = useSelector((state) => state.tickerStream);
  // const klineStream = useSelector((state) => state.klineStream);

  const parseBinanceDataForChart = async () => {
    const fetchArrayOfArrays = await getHistoricalCandlestickDataWidthAxios(
      "1m",
      "LINKUSDT"
    );

    const turnArrayOfArraysIntoAnArrayOfObjects = fetchArrayOfArrays.map(
      function (x) {
        return {
          date: x[0],
          open: x[1],
          high: x[2],
          low: x[3],
          close: x[4],
          volume: x[5],
        };
      }
    );

    return turnArrayOfArraysIntoAnArrayOfObjects;
  };

  const connectToTradeStream = () => {
    dispatch(storeTradeStatus(false));
    dispatch(
      connectToTrade(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };
  const disconnectFromTradeStream = () => {
    dispatch(
      disconnectFromTrade(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@trade`,
        storeTradeStream
      )
    );
  };

  const connectToTickerStream = () => {
    dispatch(storeTickerStatus(false));
    dispatch(
      connectToTicker(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@ticker`,
        storeTickerStream
      )
    );
  };
  const disconnectFromTickerStream = () => {
    dispatch(
      disconnectFromTicker(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@ticker`
      )
    );
  };

  return (
    <div>
      <div className="ui header">Debugers</div>
      {/* <button className="ui mini button" onClick={() => console.log(config)}>
        config - debug
      </button>
      <button
        className="ui mini button"
        onClick={() => {
          console.log(eventStream);
        }}
      >
        event- debug
      </button>
      <button
        className="ui mini button"
        onClick={() => {
          console.log(tradeStream);
        }}
      >
        trade- debug
      </button> */}

      {/* <button
        className="ui mini button"
        onClick={() => {
          console.log(tradeStream);
        }}
      >
        trade- debug
      </button> */}

      <button
        className="ui mini button"
        onClick={() => parseBinanceDataForChart()}
      >
        Debug Historical Candlestick API Data
      </button>
      {/* <button
        className="ui mini button"
        onClick={() => {
          console.log(tickerStream);
        }}
      >
        ticker - debug
      </button> */}
      {/* <button
        className="ui mini button"
        onClick={() => {
          console.log(klineStream);
        }}
      >
        kline - debug
      </button> */}

      {/* <br />
      <button
        className="ui mini button"
        onClick={() => disconnectFromTickerStream()}
      >
        Disconnect From Ticker Stream
      </button>
      <br />
      <br />
      <button className="ui mini button" onClick={() => connectToTradeStream()}>
        Connect To Trade Stream
      </button>
      <br />
      <button
        className="ui mini button"
        onClick={() => disconnectFromTradeStream()}
      >
        Disconnect From Trade Stream
      </button> */}
    </div>
  );
};

export default SettingsPage;
