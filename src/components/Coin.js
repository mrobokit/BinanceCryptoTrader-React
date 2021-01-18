import React from "react";
import { useSelector } from "react-redux";
import "./Coin.css";

export const CoinPair = () => {
  //This doesn't need to be rerendered, the only reason i let it
  // Is to be 100% this is the trade name it is coming from
  const trade = useSelector((state) => state.tradeStream.data);
  return <div>{trade?.s}</div>;
};

export const CoinPrice = () => {
  const trade = useSelector((state) => state.tradeStream.data);
  return <div> {parseFloat(trade?.p)}</div>;
};

export const Change24H = () => {
  const ticker = useSelector((state) => state.tickerStream.data);
  const config = useSelector((state) => state.config);

  return (
    <div>
      <h2 className={`ui sub header m-tb ${ticker?.p > 0 ? "green" : "red"}`}>
        {parseFloat(ticker?.P).toFixed(2)}%
      </h2>

      <h2 className={`ui sub header m-tb ${ticker?.p > 0 ? "green" : "red"}`}>
        {parseFloat(ticker?.p).toFixed(2)} {config.fiat}
      </h2>
    </div>
  );
};
