import React, { useEffect } from "react";
import {
  connectToTrade,
  connectToTicker,
  storeTickerStream,
  storeTradeStream,
  storeStreamsNoReload,
} from "../actions";
import "../css/SymbolStream.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { CoinPair, CoinPrice, Change24H } from "./MultipleCoin";

const SymbolStream = () => {
  const dispatch = useDispatch();

  const config = useSelector((state) => state.config, shallowEqual);

  const tradeStreams = config.symbolList
    .map((s) => `${(s.name + config.fiat + "@trade").toLowerCase()}`)
    .join("/");
  const tickerStreams = config.symbolList
    .map((s) => `${(s.name + config.fiat + "@ticker").toLowerCase()}`)
    .join("/");

  //Trade
  const connectToTradeStream = () => {
    dispatch(
      connectToTrade(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@trade/${tradeStreams}`,
        storeTradeStream
      )
    );
  };
  const connectToTickerStream = () => {
    dispatch(
      connectToTicker(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@ticker/${tickerStreams}`,
        storeTickerStream
      )
    );
  };

  const list = config.symbolList?.map((s) => {
    return (
      <tr key={s.name}>
        <td data-label="Pair">
          <CoinPair data={s.name.toLowerCase()} />
        </td>

        <td data-label="Live Trades">
          <CoinPrice data={s.name.toLowerCase()} />
        </td>

        <td data-label="Last 24H Change">
          <Change24H data={s.name.toLowerCase()} />
        </td>
      </tr>
    );
  });

  useEffect(
    () => {
      // Prevents closing the stream
      if (config.streamsNoReload === false) {
        dispatch(storeStreamsNoReload(true));
        connectToTradeStream();
        connectToTickerStream();
      }

      // Auto Stream leave on route change
      // return () => {
      //   disconnectFromTickerStream();
      //   disconnectFromTradeStream();
      // };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config]
  );

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
              <CoinPair data={config.symbol.toLowerCase()} />
            </td>

            <td data-label="Live Trades">
              <CoinPrice data={config.symbol.toLowerCase()} />
            </td>

            <td data-label="Last 24H Change">
              <Change24H data={config.symbol.toLowerCase()} />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>{list}</tbody>
      </table>
    </div>
  );
};

export default SymbolStream;
