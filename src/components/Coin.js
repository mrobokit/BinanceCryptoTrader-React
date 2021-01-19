import React from "react";
import { useSelector } from "react-redux";
import "../css/Coin.css";
import Placeholder from "../components/semantic/Placeholder";

export const CoinPair = () => {
  //This doesn't need to be rerendered, the only reason i let it
  // Is to be 100% this is the trade name it is coming from
  const trade = useSelector((state) => state.tradeStream.data);

  if (trade && trade !== null) {
    // when i disconnect socket, i need to set trade to be NULL
    return <div>{trade?.s}</div>;
  } else {
    //Loading state
    return <Placeholder />;
  }
};

export const CoinPrice = () => {
  const trade = useSelector((state) => state.tradeStream.data);

  if (trade && trade !== null) {
    // when i disconnect socket, i need to set trade to be NULL
    return <div> {parseFloat(trade?.p)}</div>;
  } else {
    //Loading state
    return <Placeholder />;
  }
};

export const Change24H = () => {
  const ticker = useSelector((state) => state.tickerStream.data);
  const config = useSelector((state) => state.config);

  //Running & Disconnected & Loading State
  if (ticker && ticker !== null) {
    // when i disconnect socket, i need to set trade to be NULL
    return (
      <div>
        <h2 className={`ui sub header m-tb ${ticker?.p > 0 ? "green" : "red"}`}>
          <span>{parseFloat(ticker?.p).toFixed(2)} </span>&#32;
          <span>{config.fiat} </span>/{parseFloat(ticker?.P).toFixed(2)}%
        </h2>
      </div>
    );
  } else {
    //Loading state
    return <Placeholder />;
  }
};
