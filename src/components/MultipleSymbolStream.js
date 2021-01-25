// These shall only refresh on localStorage change
// Should be limited to 1 or 2 seconds refresh, names should not update, only the coins price and details

import React, { useEffect } from "react";
import {
  connectToTrade,
  connectToTicker,
  storeTradeStream,
  storeTickerStream,
  storeTradeStreamNoReload,
  storeTickerStreamNoReload,
} from "../actions";
import "../css/SymbolStream.css";
import { useDispatch } from "react-redux";
import { CoinPair, CoinPrice, Change24H } from "./MultipleCoin";

const MultipleSymbolStream = () => {
  const localSymbolList = [
    { name: "ENJ" },
    { name: "XLM" },
    { name: "BCH" },
    { name: "LTC" },
    { name: "XRP" },
    { name: "DOT" },
    { name: "ADA" },
    { name: "LINK" },
    { name: "BTC" },
  ];
  const localFiat = "USDT";
  const tradeStreamNoReload = false;
  const tickerStreamNoReload = false;

  const dispatch = useDispatch();

  const tradeStreams = localSymbolList
    .map((s) => `${(s.name + localFiat + "@trade").toLowerCase()}`)
    .join("/");
  const tickerStreams = localSymbolList
    .map((s) => `${(s.name + localFiat + "@ticker").toLowerCase()}`)
    .join("/");

  //Trade
  const connectToTradeStream = () => {
    dispatch(
      connectToTrade(
        `wss://stream.binance.com:9443/ws/${tradeStreams}`,
        storeTradeStream
      )
    );
  };
  const connectToTickerStream = () => {
    dispatch(
      connectToTicker(
        `wss://stream.binance.com:9443/ws/${tickerStreams}`,
        storeTickerStream
      )
    );
  };

  const list = localSymbolList?.map((s) => {
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

  // useEffect(
  //   () => {
  //     // Prevents closing the stream
  //     if (tradeStreamNoReload === false) {
  //       dispatch(storeTradeStreamNoReload(true));
  //       connectToTradeStream();
  //     }
  //     if (tickerStreamNoReload === false) {
  //       dispatch(storeTickerStreamNoReload(true));
  //       connectToTickerStream();
  //     }

  //     // Auto Stream leave on route change
  //     // return () => {
  //     //   disconnectFromTickerStream();
  //     //   disconnectFromTradeStream();
  //     // };
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // );

  return (
    <div>
      <table>
        <tbody>{list}</tbody>
      </table>
    </div>
  );
};

export default MultipleSymbolStream;
