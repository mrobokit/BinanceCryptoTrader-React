/* eslint-disable */
import React, { useState } from "react";
import {
  connectToTrade,
  connectToTicker,
  disconnectFromTrade,
  disconnectFromTicker,
  storeTickerStream,
  storeTradeStream,
  storeTradeStreamNoReload,
  storeTickerStreamNoReload,
  getHistoricalCandlestickDataWidthAxios,
} from "../actions";

import { useIdentityContext } from "react-netlify-identity";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import "./Settings.css";
import SendData from "../components/SendData";
import GetData from "../components/GetData";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config, shallowEqual);
  const { user, isLoggedIn, authedFetch } = useIdentityContext();

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
    dispatch(storeTradeStreamNoReload(false));
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
    dispatch(storeTickerStreamNoReload(false));
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
      {isLoggedIn ? (
        <div id="accessible_to_logged_in_only" className="ui segment small">
          <div className="ui segment  settings-api">
            <span className="ui header ">Store API Keys</span>

            <SendData theKey="BAK" id="1" name="Binance Api Key" />
            <SendData theKey="BAS" id="2" name="Binance Api Secret" />
            <SendData theKey="TAK" id="3" name="Telegram Api Key" />
          </div>
        </div>
      ) : (
        "Not logged in  user"
      )}
    </div>
  );
};

export default SettingsPage;
