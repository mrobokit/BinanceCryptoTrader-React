import React from "react";
import { useSelector } from "react-redux";
import "../css/Coin.css";
import Placeholder from "../components/semantic/Placeholder";

export const CoinPair = () => {
  //This doesn't need to be rerendered, the only reason i let it
  // Is to be 100% this is the trade name it is coming from
  const config = useSelector((state) => state.config);
  const trade = useSelector(
    (state) => state.tradeStream[config.pair.toLowerCase()]
  );

  if (trade && trade !== null) {
    // when i disconnect socket, i need to set trade to be NULL
    return <div>{trade?.s}</div>;
  } else {
    //Loading state
    return <Placeholder />;
  }
};

//Reponsible of app-wide current price state
export const CoinPrice = () => {
  const config = useSelector((state) => state.config);
  const trade = useSelector(
    (state) => state.tradeStream[config.pair.toLowerCase()]
  );

  if (trade && trade !== null) {
    const price = parseFloat(trade?.p);
    const pair = trade?.s.replace(config.fiat, "");
    document.title = pair + "-" + price;
    return <div> {price}</div>;
  } else {
    //Loading state
    return <Placeholder />;
  }
};

export const Change24H = () => {
  const config = useSelector((state) => state.config);
  const ticker = useSelector(
    (state) => state.tickerStream[config.pair.toLowerCase()]
  );

  //Running & Disconnected & Loading State
  if (ticker && ticker !== null) {
    const priceDiff = parseFloat(ticker?.p).toFixed(2);
    const percentageDiff = parseFloat(ticker?.P).toFixed(2);
    // when i disconnect socket, i need to set trade to be NULL
    return (
      <div>
        <h2 className={`ui sub header m-tb ${ticker?.p > 0 ? "green" : "red"}`}>
          <span> {priceDiff} </span>&#32;
          <span>{config.fiat} </span>/ {percentageDiff}%
        </h2>
      </div>
    );
  } else {
    //Loading state
    return <Placeholder />;
  }
};
